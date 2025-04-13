import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    const userData = {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      username: localStorage.getItem("username"),
      country: localStorage.getItem("country"),
    };

    if (userData.name && userData.email) {
      setUser(userData);
      setForm(userData); // Untuk form edit
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Simpan ke localStorage
    localStorage.setItem("name", form.name || "");
    localStorage.setItem("email", form.email || "");
    localStorage.setItem("username", form.username || "");
    localStorage.setItem("country", form.country || "");

    setUser(form); // Update tampilan
    setEditMode(false);
    alert("Data berhasil disimpan!");
  };

  if (!user)
    return <p className="text-center mt-10 text-gray-500">Data user tidak ditemukan.</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">User Profile</h1>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="flex items-center gap-4">
            <img
              src={`https://ui-avatars.com/api/?name=${form.name}&background=4F46E5&color=fff&size=128`}
              alt="Avatar"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{form.name}</h2>
              <p className="text-sm text-gray-500">{form.email}</p>
            </div>
          </div>

          <div className="flex gap-2 self-end md:self-start">
            <Link to={"/bookmark"}>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600">
                Bookmark
              </button>
            </Link>
            {editMode ? (
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
              >
                Simpan
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="text-sm text-gray-700 mb-1 block">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              disabled={!editMode}
              className="w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm"
              value={form.name || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-1 block">Nama Pengguna</label>
            <input
              type="text"
              name="username"
              disabled={!editMode}
              className="w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm"
              value={form.username || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              disabled={!editMode}
              className="w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm"
              value={form.email || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-1 block">Wilayah</label>
            <input
              type="text"
              name="country"
              disabled={!editMode}
              className="w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm"
              value={form.country || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
