import React, { useState, useEffect } from "react";

const kotaList = [
  "Bandung", "Makassar", "Yogyakarta", "Bali", "Aceh", "Surabaya", "Banjarmasin", "Jakarta",
];

const ITEMS_PER_PAGE = 6;

const Wisata = () => {
  const [data, setData] = useState([]);
  const [selectedKota, setSelectedKota] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://web-production-6737.up.railway.app/rekomendasi", {
      headers: { "ngrok-skip-browser-warning": "true" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch data!");
        return res.json();
      })
      .then((json) => setData(json))
      .catch(() => setError("Terjadi kesalahan saat mengambil data."));
  }, []);

  const handleBookmark = async (item) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3000/api/wisata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nama: item["Nama Tempat Wisata"],
          kota: item.Kota,
          jenis: item["Jenis Wisata"],
          rating: item.Rating,
          deskripsi: item["Deskripsi Singkat"],
          user_id: localStorage.getItem("user_id"),
        }),
      });

      if (!res.ok) throw new Error();

      alert("Berhasil ditambahkan ke bookmark!");
      setData((prev) => prev.filter((d) => d["Nama Tempat Wisata"] !== item["Nama Tempat Wisata"]));
    } catch {
      // Fallback ke localStorage
      const local = JSON.parse(localStorage.getItem("wisata_bookmarks") || "[]");
    
      const localItem = {
        id: Date.now(), // Buat ID unik
        nama: item["Nama Tempat Wisata"],
        kota: item.Kota,
        jenis: item["Jenis Wisata"],
        rating: item.Rating,
        deskripsi: item["Deskripsi Singkat"],
        user_id: "local",
      };
    
      local.push(localItem);
      localStorage.setItem("wisata_bookmarks", JSON.stringify(local));
      alert("Disimpan secara lokal!");
    }
    
  };

  const filteredData = data.filter((item) =>
    selectedKota ? item.Kota.toLowerCase() === selectedKota.toLowerCase() : true
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentItems = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(currentPage + 2, totalPages);

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Rekomendasi Wisata</h1>

      <select
        className="p-2 mb-6 border rounded-md w-64"
        value={selectedKota}
        onChange={(e) => {
          setSelectedKota(e.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="">-- Pilih Kota --</option>
        {kotaList.map((kota, i) => (
          <option key={i} value={kota}>
            {kota}
          </option>
        ))}
      </select>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : currentItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
            {currentItems.map((item, index) => (
              <div key={index} className="border p-4 rounded-lg bg-white shadow">
                <h2 className="text-lg font-bold mb-2">{item["Nama Tempat Wisata"]}</h2>
                <p className="text-sm mb-1"><strong>Kota:</strong> {item.Kota}</p>
                <p className="text-sm mb-1"><strong>Jenis:</strong> {item["Jenis Wisata"]}</p>
                <p className="text-sm mb-1"><strong>Rating:</strong> {item.Rating} ⭐</p>
                <p className="text-sm mb-2"><strong>Deskripsi:</strong> {item["Deskripsi Singkat"]}</p>
                <button
                  onClick={() => handleBookmark(item)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Bookmark
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-6">
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                Prev
              </button>
            )}
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded ${
                  page === currentPage ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                Next
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="mt-4 text-gray-500">Tidak ada data ditemukan.</p>
      )}
    </div>
  );
};

export default Wisata;
