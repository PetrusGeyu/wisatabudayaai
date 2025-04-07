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

  if (loading) return <p className="text-center mt-10 text-gray-500">Memuat data profil...</p>;
  if (!user) return <p className="text-center mt-10 text-gray-500">Data user tidak ditemukan.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=4F46E5&color=fff&size=128`}
            alt="Avatar"
            className="w-24 h-24 rounded-full mb-3"
          />
          <h1 className="text-xl font-semibold text-gray-800">{user.name}</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
