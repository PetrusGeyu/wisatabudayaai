import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Jika tidak ada token, redirect ke login
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Home</h1>
      <p>Selamat datang di halaman Home!</p>
    </div>
  );
};

export default Home;
