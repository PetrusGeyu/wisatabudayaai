/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import BatikDetector from "../batik-model/templates/BatikDetector";

const ITEMS_PER_PAGE = 6;
const kotaList = [
  "Madura",
  "Jombang",
  "Semarang",
  "Subang",
  "Banyumas",
  "Ponorogo",
  "Surakarta",
  "Kuningan",
];

const PEXELS_API_KEY = "cvokujzUUm6XhWqMltwgFWsbNuNreXgtt2QJRNi26FOX7QqDUUcVj3DX";

const Budaya = () => {
  const [data, setData] = useState([]);
  const [selectedKota, setSelectedKota] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Menyimpan item yang dipilih untuk deteksi batik
  const [imageMap, setImageMap] = useState({});

  useEffect(() => {
    const fetchBudaya = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://rekomendasibudaya-production.up.railway.app/budaya",
          {
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        if (!res.ok) throw new Error("Gagal fetch data!");
        const jsonData = await res.json();
        setData(jsonData);

        // Menambahkan pengambilan gambar dari Pexels
        const images = {};
        for (const item of jsonData) {
          const name = item.Budaya;
          const image = await fetchImageFromPexels(name);
          images[name] = image;
        }
        setImageMap(images);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBudaya();
  }, []);

  const fetchImageFromPexels = async (query) => {
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(
          query
        )}&per_page=1`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );
      const data = await res.json();
      console.log("Pexels Response:", data); // Menambahkan log untuk memeriksa respons
      return data.photos[0]?.src?.medium || "https://via.placeholder.com/600x400"; // Gambar fallback jika tidak ditemukan
    } catch (err) {
      console.error("Gagal ambil gambar dari Pexels:", err);
      return "https://via.placeholder.com/600x400"; // Gambar fallback jika gagal mengambil gambar
    }
  };

  const handleBookmark = async (item) => {
    const token = localStorage.getItem("token");
    const bookmark = {
      budaya: item.Budaya,
      kota: item.Kota,
      jenis: item.Jenis,
      rating: item.Rating,
      deskripsi: item.Deskripsi,
      user_id: localStorage.getItem("user_id"),
    };

    try {
      if (token) {
        const res = await fetch("http://localhost:3000/api/budaya", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookmark),
        });
        if (!res.ok) throw new Error();
        alert("Berhasil ditambahkan ke bookmark!");
        setData((prev) => prev.filter((d) => d.Budaya !== item.Budaya));
      } else {
        const local = JSON.parse(
          localStorage.getItem("budaya_bookmarks") || "[]"
        );
        local.push(bookmark);
        localStorage.setItem("budaya_bookmarks", JSON.stringify(local));
        alert("Disimpan secara lokal!");
        setData((prev) => prev.filter((d) => d.Budaya !== item.Budaya));
      }
    } catch (err) {
      alert("Gagal menyimpan bookmark.");
    }
  };

  const filteredData = selectedKota
    ? data.filter((d) => d.Kota === selectedKota)
    : data;

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentItems = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getPageNumbers = () => {
    const pages = [];
    const max = 5;
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(currentPage + 2, totalPages);
    if (currentPage <= 3) end = Math.min(max, totalPages);
    else if (currentPage > totalPages - 3)
      start = Math.max(totalPages - max + 1, 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const capitalizeWords = (str) =>
    str?.replace(/\b\w/g, (c) => c.toUpperCase()) || "";

  return (
    <div className="p-6 text-center relative">
      <h1 className="text-2xl font-bold mb-4">Budaya</h1>

      <select
        className="px-4 py-2 mb-6 border rounded-md w-[300px] text-sm"
        value={selectedKota}
        onChange={(e) => {
          setSelectedKota(e.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="">-- Pilih Kota --</option>
        {kotaList.map((kota, idx) => (
          <option key={idx} value={kota}>
            {kota}
          </option>
        ))}
      </select>

      {error && <p className="text-red-600">{error}</p>}
      {loading && <p className="text-gray-500">Memuat data...</p>}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {currentItems.map((item, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-4 text-left">
            <h2 className="text-lg font-semibold mb-2">
              {capitalizeWords(item.Budaya)}
            </h2>
            {/* Menambahkan tag gambar */}
            {imageMap[item.Budaya] ? (
              <img
                src={imageMap[item.Budaya]} // Gambar yang diambil dari Pexels
                alt={item.Budaya} // Menambahkan alt untuk aksesibilitas
                className="w-full h-48 object-cover mb-3" // Mengatur ukuran dan memastikan gambar tidak terdistorsi
              />
            ) : (
              <div className="h-48 bg-gray-200 mb-3 rounded flex items-center justify-center text-gray-600">
                Gambar tidak tersedia
              </div>
            )}
            <p className="text-sm mb-1">
              <strong>Kota:</strong> {capitalizeWords(item.Kota)}
            </p>
            <p className="text-sm mb-1">
              <strong>Jenis:</strong> {capitalizeWords(item.Jenis)}
            </p>
            <p className="text-sm mb-1">
              <strong>Rating:</strong> {item.Rating} ⭐
            </p>
            <p className="text-sm mb-3">
              <strong>Deskripsi:</strong> {capitalizeWords(item.Deskripsi)}
            </p>
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              onClick={() => handleBookmark(item)}
            >
              Bookmark
            </button>
            {/* Tombol untuk membuka modal deteksi batik */}
          
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded text-sm text-blue-600 hover:bg-blue-50 disabled:opacity-50"
          >
            Prev
          </button>
          {getPageNumbers().map((page) => (
            <button
              key={page}
              className={`px-3 py-1 border rounded text-sm ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded text-sm text-blue-600 hover:bg-blue-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal Deteksi Batik */}

    </div>
  );
};

export default Budaya;
