import React, { useRef, useState } from 'react'
import * as tf from '@tensorflow/tfjs'

const BatikDetector = () => {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [model, setModel] = useState(null)
  const imageRef = useRef(null)

  const loadModel = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5000/predict') // path dari public
      const loadedModel = await response.json()
      setModel(loadedModel)
      console.log('✅ Model berhasil dimuat.')
    } catch (error) {
      console.error('❌ Gagal memuat model:', error)
      alert('Gagal memuat model. Periksa konsol.')
    } finally {
      setLoading(false)
    }
  }

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

  const handlePredict = async () => {
    if (!model) {
      alert('Model belum dimuat. Klik tombol "Load Model" dulu.')
      return
    }
    if (!imageRef.current || !imageRef.current.complete) {
      alert('Silakan unggah gambar terlebih dahulu.')
      return
    }

    try {
      setLoading(true)
      const tensor = tf.browser
        .fromPixels(imageRef.current)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .div(255.0)
        .expandDims()

      const prediction = model.predict(tensor)
      const predictionData = await prediction.data()
      const maxIndex = predictionData.indexOf(Math.max(...predictionData))

      // Ubah label sesuai dengan model kamu
      const labels = ['Batik Kawung', 'Batik Parang', 'Batik Mega Mendung']
      const label = labels[maxIndex] || 'Tidak dikenali'
      setResult(`Jenis Batik: ${label} (Confidence: ${predictionData[maxIndex].toFixed(2)})`)
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
