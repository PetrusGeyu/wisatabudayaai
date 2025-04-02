import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../Components/Hero";
import Explore from "../Components/Explore";
import Budaya from "../Components/Budaya";
import Contact from '../Components/Contact'
import About from "../Components/About";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 gap-2 flex-col">
      <Hero/>
      <Explore/>
      <Budaya/>
      <About/>
     <Contact/>
    </div>
  );
};

export default Home;
