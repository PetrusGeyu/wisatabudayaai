import { useState } from "react";
import { useNavigate } from "react-router-dom"; // pastikan pakai react-router-dom v6+
import API from "../services/api";
import React, { useEffect } from 'react';
const Login = () => {
  useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        // Jika tidak ada token, redirect ke login
        navigate("/");
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("auth/login", form); // jika baseURL sudah diset di API.js
      localStorage.setItem("token", res.data.token);
      alert("Login berhasil!");
      navigate("/"); // redirect ke halaman dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        name="email"
        placeholder="Email"
        type="email"
        onChange={handleChange}
        value={form.email}
        required
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
        value={form.password}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Login;
