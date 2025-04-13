/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import BatikDetector from "../batik-model/templates/BatikDetector";

const ITEMS_PER_PAGE = 6;
const kotaList = ["Madura", "Jombang", "Semarang", "Subang", "Banyumas", "Ponorogo", "Surakarta", "Kuningan"];

const Budaya = () => {
  const [data, setData] = useState([]);
  const [selectedKota, setSelectedKota] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBudaya = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://rekomendasibudaya-production.up.railway.app/budaya", {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });
        if (!res.ok) throw new Error("Gagal fetch data!");
        const jsonData = await res.json();
        setData(jsonData);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBudaya();
  }, []);

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
        const local = JSON.parse(localStorage.getItem("budaya_bookmarks") || "[]");
        local.push(bookmark);
        localStorage.setItem("budaya_bookmarks", JSON.stringify(local));
        alert("Disimpan secara lokal!");
        setData((prev) => prev.filter((d) => d.Budaya !== item.Budaya));
      }
    } catch (err) {
      alert("Gagal menyimpan bookmark.");
    }
  };

  const filteredData = selectedKota ? data.filter((d) => d.Kota === selectedKota) : data;
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentItems = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const getPageNumbers = () => {
    const pages = [];
    const max = 5;
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(currentPage + 2, totalPages);
    if (currentPage <= 3) end = Math.min(max, totalPages);
    else if (currentPage > totalPages - 3) start = Math.max(totalPages - max + 1, 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const capitalizeWords = (str) => str?.replace(/\b\w/g, (c) => c.toUpperCase()) || "";

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
            <h2 className="text-lg font-semibold mb-2">{capitalizeWords(item.Budaya)}</h2>
            <p className="text-sm mb-1"><strong>Kota:</strong> {capitalizeWords(item.Kota)}</p>
            <p className="text-sm mb-1"><strong>Jenis:</strong> {capitalizeWords(item.Jenis)}</p>
            <p className="text-sm mb-1"><strong>Rating:</strong> {item.Rating} ⭐</p>
            <p className="text-sm mb-3"><strong>Deskripsi:</strong> {capitalizeWords(item.Deskripsi)}</p>
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              onClick={() => handleBookmark(item)}
            >
              Bookmark
            </button>
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
                page === currentPage ? "bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-50"
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

      {/* Floating button */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-lg text-2xl"
        onClick={() => setShowModal(true)}
      >
        🧵
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Deteksi Batik</h2>
            <BatikDetector />
          </div>
        </div>
      )}
    </div>
  );
};

export default Budaya;
