/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import API from "../services/api"; // Pastikan path-nya sesuai

const BookmarkPage = () => {
  const [wisataSaya, setWisataSaya] = useState([]);
  const [budayaSaya, setBudayaSaya] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    fetchBookmarks();
  }, [userId]);

  const fetchBookmarks = async () => {
    try {
      const [resWisata, resBudaya] = await Promise.all([
        API.get("/wisata"),
        API.get("/budaya"),
      ]);

      const filteredWisata = resWisata.data.filter((item) => item.user_id == userId);
      const filteredBudaya = resBudaya.data.filter((item) => item.user_id == userId);

      setWisataSaya(filteredWisata);
      setBudayaSaya(filteredBudaya);
    } catch (err) {
      console.error("Gagal fetch bookmark:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWisata = async (id) => {
    try {
      await API.delete(`/wisata/${id}`);
      setWisataSaya((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Gagal menghapus wisata:", err);
      alert("Gagal menghapus wisata.");
    }
  };

  const handleDeleteBudaya = async (id) => {
    try {
      await API.delete(`/budaya/${id}`);
      setBudayaSaya((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Gagal menghapus budaya:", err);
      alert("Gagal menghapus budaya.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Wisata yang Kamu Simpan</h1>
      {wisataSaya.length === 0 ? (
        <p>Belum ada wisata yang disimpan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {wisataSaya.map((wisata) => (
            <div key={wisata.id} className="border p-4 rounded-xl shadow flex flex-col justify-between">
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

      <h1 className="text-xl font-bold mb-4">Budaya yang Kamu Simpan</h1>
      {budayaSaya.length === 0 ? (
        <p>Belum ada budaya yang disimpan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {budayaSaya.map((budaya) => (
            <div key={budaya.id} className="border p-4 rounded-xl shadow flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold">{budaya.budaya}</h2>
                <p className="text-sm text-gray-600 mb-2">{budaya.deskripsi}</p>
              </div>
              <button
                onClick={() => handleDeleteBudaya(budaya.id)}
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

export default BookmarkPage;
