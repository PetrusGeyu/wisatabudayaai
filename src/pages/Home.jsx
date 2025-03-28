import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Jika tidak ada token, redirect ke login
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold">Home</h1>
      <p>Selamat datang di halaman Home!</p>
    </div>
  );
};

export default Home;
