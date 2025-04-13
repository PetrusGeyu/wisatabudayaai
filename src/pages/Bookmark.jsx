/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import API from "../services/api";

const Bookmark = () => {
  const [wisataSaya, setWisataSaya] = useState([]);
  const [budayaSaya, setBudayaSaya] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const [resWisata, resBudaya] = await Promise.all([
          API.get("/api/wisata"),
          API.get("/api/budaya"),
        ]);

        const filteredWisata = resWisata.data.filter(
          (item) => item.user_id == userId
        );
        const filteredBudaya = resBudaya.data.filter(
          (item) => item.user_id == userId
        );

        setWisataSaya(filteredWisata);
        setBudayaSaya(filteredBudaya);
      } else {
        const localWisata =
          JSON.parse(localStorage.getItem("wisata_bookmarks")) || [];
        const localBudaya =
          JSON.parse(localStorage.getItem("budaya_bookmarks")) || [];

        setWisataSaya(localWisata);
        setBudayaSaya(localBudaya);
      }
    } catch (err) {
      console.error("Gagal fetch bookmark:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWisata = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await API.delete(`/api/wisata/${id}`);
        setWisataSaya((prev) => prev.filter((item) => item.id !== id));
      } else {
        const existing =
          JSON.parse(localStorage.getItem("wisata_bookmarks")) || [];

        const updated = existing.filter((item) => item.id !== id);
        localStorage.setItem("wisata_bookmarks", JSON.stringify(updated));
        setWisataSaya(updated);
      }
    } catch (err) {
      console.error("Gagal menghapus wisata:", err);
      alert("Gagal menghapus wisata.");
    }
  };

  const handleDeleteBudaya = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await API.delete(`/api/budaya/${id}`);
        setBudayaSaya((prev) => prev.filter((item) => item.id !== id));
      } else {
        const updated = budayaSaya.filter((item, idx) => idx !== id);
        localStorage.setItem("budaya_bookmarks", JSON.stringify(updated));
        setBudayaSaya(updated);
      }
    } catch (err) {
      console.error("Gagal menghapus budaya:", err);
      alert("Gagal menghapus budaya.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Wisata yang Kamu Simpan</h1>
      {wisataSaya.length === 0 ? (
        <p className="text-gray-500">Belum ada wisata yang disimpan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {wisataSaya.map((wisata, index) => (
            <div
              key={wisata.id || index}
              onClick={() => handleDeleteWisata(wisata.id || index)}
              className="border p-4 rounded-xl shadow flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">{wisata.nama}</h2>
                <p className="text-sm text-gray-600 mb-2">{wisata.deskripsi}</p>
              </div>
              <button
                onClick={() => handleDeleteWisata(wisata.id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">Budaya yang Kamu Simpan</h1>
      {budayaSaya.length === 0 ? (
        <p className="text-gray-500">Belum ada budaya yang disimpan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {budayaSaya.map((budaya, index) => (
            <div
              key={budaya.id || index}
              className="border p-4 rounded-xl shadow flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">{budaya.budaya}</h2>
                <p className="text-sm text-gray-600 mb-2">{budaya.deskripsi}</p>
              </div>
              <button
                onClick={() => handleDeleteBudaya(budaya.id || index)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmark;
