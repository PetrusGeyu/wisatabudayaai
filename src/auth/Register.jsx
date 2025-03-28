import { useState,useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom"; 

const Register = () => {
  useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          // Jika tidak ada token, redirect ke login
          navigate("/");
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      alert("Registrasi berhasil!");
      navigate("/"); 
      // redirect ke halaman dashboard jika perlu
    } catch (err) {
      alert("Registrasi gagal: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        name="name"
        placeholder="Nama Lengkap"
        type="text"
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
