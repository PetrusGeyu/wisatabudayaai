import React, { useEffect, useState } from "react";
import API from "../services/api";
import {Link } from "react-router-dom";
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

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Memuat data profil...</p>;
  if (!user)
    return <p className="text-center mt-10 text-gray-500">Data user tidak ditemukan.</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">User Profile</h1>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="flex items-center gap-4">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=4F46E5&color=fff&size=128`}
              alt="Avatar"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="flex gap-2 self-end md:self-start">
            
            <Link to={'/bookmark'}>
            <button   className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600">
              Bookmark
            </button></Link>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600">
              Edit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="text-sm text-gray-700 mb-1 block">Nama Lengkap</label>
            <input
              type="text"
              disabled
              placeholder="Your First Name"
              className="w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm"
              value={user.fullName || ""}
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-1 block">Nama Pengguna</label>
            <input
              type="text"
              disabled
              placeholder="Your Nick Name"
              className="w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm"
              value={user.username || ""}
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-1 block">Email</label>
            <input
              type="email"
              disabled
              placeholder="Your Email"
              className="w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm"
              value={user.email || ""}
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-1 block">Wilayah</label>
            <input
              type="text"
              disabled
              placeholder="Your Country"
              className="w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm"
              value={user.country || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
