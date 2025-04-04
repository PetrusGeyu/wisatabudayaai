import React, { useEffect, useState } from "react";
import API from "../services/api";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token tidak ditemukan");
        setLoading(false);
        return;
      }

      try {
        const res = await API.get("/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Gagal mengambil data user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p className="text-center mt-10">Memuat data profil...</p>;
  if (!user) return <p className="text-center mt-10">Data user tidak ditemukan.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 to-yellow-200 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff&size=128`}
            alt="Avatar"
            className="rounded-full w-32 h-32 shadow-md"
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Info Detail */}
        <div className="mt-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Nama</span>
            <span className="text-gray-800">{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Email</span>
            <span className="text-gray-800">{user.email}</span>
          </div>
          {/* Tambahkan info tambahan jika ada */}
        </div>

        <div className="mt-8 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition">
            Edit Profil
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
