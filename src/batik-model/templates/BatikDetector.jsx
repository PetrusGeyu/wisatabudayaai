import React, { useRef, useState } from 'react'
import * as tf from '@tensorflow/tfjs'

const BatikDetector = () => {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [model, setModel] = useState(null)
  const imageRef = useRef(null)
  const imageFileRef = useRef(null)

  // Memuat model TensorFlow.js sekali
  const loadModel = async () => {
    try {
      setLoading(true)
      await tf.ready()  // Menunggu TensorFlow siap
      const loadedModel = await tf.loadLayersModel('http://192.168.18.22:5001/model.json')
      setModel(loadedModel)
      console.log('✅ Model berhasil dimuat.')
    } catch (error) {
      console.error('❌ Gagal memuat model:', error)
      alert('Gagal memuat model. Periksa konsol.')
    } finally {
      setLoading(false)
    }
  }

  // Mengubah gambar menjadi format tensor
  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        if (imageRef.current) {
          imageRef.current.src = reader.result
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Mengirim gambar ke server untuk prediksi
  const handlePredict = async () => {
    if (!model) {
      alert('Model belum dimuat. Klik tombol "Load Model" dulu.')
      return
    }
    if (!imageRef.current || !imageRef.current.complete) {
      alert('Silakan unggah gambar terlebih dahulu.')
      return
    }

    const formData = new FormData()
    const file = imageFileRef.current.files[0]
    formData.append('file', file)

    try {
      setLoading(true)

      const response = await fetch('http://192.168.18.22:5001/predict', {
        method: 'POST',
        body: formData,
      })

      const predictionData = await response.json()

      if (response.ok) {
        const maxIndex = predictionData.predictions.findIndex(
          (item) => item.probability === Math.max(...predictionData.predictions.map(p => p.probability))
        )

        const label = predictionData.predictions[maxIndex]?.label || 'Tidak dikenali'
        const confidence = predictionData.predictions[maxIndex]?.confidence || '0%'

        setResult(`Jenis Batik: ${label} (Confidence: ${confidence})`)
      } else {
        setResult('Terjadi kesalahan pada backend.')
      }
    } catch (error) {
      console.error('❌ Gagal memprediksi:', error)
      setResult('Terjadi kesalahan saat prediksi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-xl max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Deteksi Jenis Batik</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={imageFileRef}
        className="mb-4 block w-full"
      />

      <div className="flex justify-center mb-4">
        <img
          ref={imageRef}
          alt="Gambar batik"
          className="max-w-xs max-h-64 rounded-lg shadow-md"
        />
      </div>

      <div className="text-center flex flex-col gap-2">
        <button
          onClick={loadModel}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition"
          disabled={loading}
        >
          {loading ? 'Memuat Model...' : 'Load Model'}
        </button>

        <button
          onClick={handlePredict}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition"
          disabled={loading || !model}
        >
          {loading ? 'Memproses...' : 'Prediksi'}
        </button>

        {result && (
          <p className="mt-4 text-lg font-semibold text-green-700">{result}</p>
        )}
      </div>
    </div>
  )
}

export default BatikDetector
