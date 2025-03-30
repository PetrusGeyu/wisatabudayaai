import React, { useEffect, useState } from "react";
import API from "../services/api"; // sesuaikan path jika berbeda

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token"); // ambil token
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

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>Data user tidak ditemukan.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Profil Saya</h1>
      <div className="border p-4 rounded-xl shadow">
        <p><strong>Nama:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* Tambahkan informasi lainnya jika ada */}
      </div>
    </div>
  );
};

export default UserProfile;
