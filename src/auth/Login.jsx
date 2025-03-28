import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Contoh login dummy, ganti dengan API-mu
    if (email === "user@example.com" && password === "password") {
      localStorage.setItem("token", "fake-jwt-token");
      navigate("/");
    } else {
      alert("Login gagal");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="block mb-2 p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block mb-2 p-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2">Login</button>
      </form>
      <p>Belum punya akun? <Link to="/register" className="text-blue-500">Daftar di sini</Link></p>

    </div>
  );
};

export default Login;
