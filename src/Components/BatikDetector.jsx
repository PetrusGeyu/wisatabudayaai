import React, { useRef, useState } from 'react'
import * as tf from '@tensorflow/tfjs'

const labelMap = {
  Yogyakarta_Parang: "Parang (Yogyakarta)",
  JawaBarat_Megamendung: "Megamendung (Jawa Barat)",
  Yogyakarta_Kawung: "Kawung (Yogyakarta)",
  Aceh_Pintu_Aceh: "Pintu Aceh (Aceh)",
  Bali_Barong: "Barong (Bali)",
  Bali_Merong: "Merong (Bali)",
  DKI_Ondel_Ondel: "Ondel-Ondel (DKI Jakarta)",
  JawaTimur_Pring: "Pring (Jawa Timur)",
  Kalimantan_Dayak: "Dayak (Kalimantan)",
  Lampung_Gajah: "Gajah (Lampung)",
  Madura_Mataketeran: "Mataketeran (Madura)",
  Maluku_Pala: "Pala (Maluku)",
  NTB_Lumbung: "Lumbung (NTB)",
  Papua_Asmat: "Asmat (Papua)",
  Papua_Cendrawasih: "Cendrawasih (Papua)",
  Papua_Tifa: "Tifa (Papua)",
  Solo_Parang: "Parang (Solo)",
  SulawesiSelatan_Lontara: "Lontara (Sulawesi Selatan)",
  SumateraBarat_Rumah_Minang: "Rumah Minang (Sumatera Barat)",
  SumateraUtara_Boraspati: "Boraspati (Sumatera Utara)"
}

const labels = Object.keys(labelMap)

const BatikDetector = () => {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [model, setModel] = useState(null)
  const imageRef = useRef(null)
  const fileInputRef = useRef(null)

  const loadModel = async () => {
    try {
      setLoading(true)
      await tf.ready()
      const loadedModel = await tf.loadGraphModel('/model-batik/model.json')
      setModel(loadedModel)
      console.log('✅ Model berhasil dimuat')
    } catch (error) {
      console.error('❌ Gagal memuat model:', error)
      alert('Gagal memuat model.')
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (imageRef.current) {
        imageRef.current.src = reader.result
      }
    }
    reader.readAsDataURL(file)
  }

  const handlePredict = async () => {
    if (!model) return alert('Model belum dimuat.')
    if (!imageRef.current || !imageRef.current.complete) return alert('Gambar belum siap.')

    try {
      setLoading(true)

      const tensor = tf.browser
        .fromPixels(imageRef.current)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .div(tf.scalar(255))
        .expandDims()

      const prediction = await model.predict(tensor).data()
      const maxIndex = prediction.indexOf(Math.max(...prediction))
      const label = labels[maxIndex] || 'Tidak dikenali'
      const readable = labelMap[label] || label
      const confidence = (prediction[maxIndex] * 100).toFixed(2)

      setResult(`Jenis Batik: ${readable} (Confidence: ${confidence}%)`)
    } catch (err) {
      console.error('❌ Error saat prediksi:', err)
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
        ref={fileInputRef}
        className="mb-4 block w-full"
      />

      <div className="flex justify-center mb-4">
        <img
          ref={imageRef}
          alt="Preview batik"
          className="max-w-xs max-h-64 rounded-lg shadow"
        />
      </div>

      <div className="text-center flex flex-col gap-2">
        <button
          onClick={loadModel}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          {loading ? 'Memuat Model...' : 'Load Model'}
        </button>

        <button
          onClick={handlePredict}
          disabled={loading || !model}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? 'Memproses...' : 'Prediksi'}
        </button>

        {result && (
          <p className="mt-4 text-lg text-green-700 font-semibold">{result}</p>
        )}
      </div>
    </div>
  )
}

export default BatikDetector
