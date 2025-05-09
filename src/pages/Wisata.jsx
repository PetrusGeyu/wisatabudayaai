import React, { useState, useEffect } from "react";

const kotaList = [
  "Bandung",
  "Makassar",
  "Yogyakarta",
  "Bali",
  "Aceh",
  "Surabaya",
  "Banjarmasin",
  "Jakarta",
];

const ITEMS_PER_PAGE = 6;
const PEXELS_API_KEY =
  "cvokujzUUm6XhWqMltwgFWsbNuNreXgtt2QJRNi26FOX7QqDUUcVj3DX";

const Wisata = () => {
  const [data, setData] = useState([]);
  const [selectedKota, setSelectedKota] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [imageMap, setImageMap] = useState({});

  useEffect(() => {
    fetch("https://web-production-6737.up.railway.app/rekomendasi", {
      headers: { "ngrok-skip-browser-warning": "true" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch data!");
        return res.json();
      })
      .then(async (json) => {
        setData(json);
        const images = {};
        for (const item of json) {
          const name = item["Nama Tempat Wisata"];
          console.log(`Mencari gambar untuk: ${name}`);
          const image = await fetchImageFromPexels(name);
          console.log(`Gambar untuk ${name}:`, image);
          images[name] = image;
        }
        setImageMap(images);
      })
      .catch(() => setError("Terjadi kesalahan saat mengambil data."));
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
      console.log("Data gambar dari Pexels:", data);
      return data.photos[0]?.src?.medium || null;
    } catch (err) {
      console.error("Gagal ambil gambar dari Pexels:", err);
      return null;
    }
  };

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
    } catch {
      const local = JSON.parse(
        localStorage.getItem("wisata_bookmarks") || "[]"
      );

      const localItem = {
        id: Date.now(),
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

    // Hapus dari daftar data dan imageMap setelah berhasil bookmark (baik lokal maupun server)
    setData((prev) =>
      prev.filter((d) => d["Nama Tempat Wisata"] !== item["Nama Tempat Wisata"])
    );
    setImageMap((prev) => {
      const newMap = { ...prev };
      delete newMap[item["Nama Tempat Wisata"]];
      return newMap;
    });
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
              <div
                key={index}
                className="border p-4 rounded-lg bg-white shadow"
              >
                {/* Check if the image URL exists */}
                {imageMap[item["Nama Tempat Wisata"]] ? (
                  <img
                    src={imageMap[item["Nama Tempat Wisata"]]}
                    alt={item["Nama Tempat Wisata"]}
                    className="w-full h-40 object-cover mb-3 rounded"
                  />
                ) : (
                  <div className="h-40 bg-gray-200 mb-3 rounded">
                    Gambar tidak tersedia
                  </div>
                )}
                <h2 className="text-lg font-bold mb-2">
                  {item["Nama Tempat Wisata"]}
                </h2>
                <p className="text-sm mb-1">
                  <strong>Kota:</strong> {item.Kota}
                </p>
                <p className="text-sm mb-1">
                  <strong>Jenis:</strong> {item["Jenis Wisata"]}
                </p>
                <p className="text-sm mb-1">
                  <strong>Rating:</strong> {item.Rating} ⭐
                </p>
                <p className="text-sm mb-2">
                  <strong>Deskripsi:</strong> {item["Deskripsi Singkat"]}
                </p>
                <button
                  onClick={() => handleBookmark(item)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Bookmark
                </button>
              </div>
            ))}
          </div>

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
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
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
