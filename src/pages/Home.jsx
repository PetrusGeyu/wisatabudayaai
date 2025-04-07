import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../Components/Hero";
import Explore from "../Components/Explore";
import Budaya from "../Components/Budaya";
import Contact from "../Components/Contact";
import About from "../Components/About";
import ChatbotDialogflow from "../Components/DialogFlowChat";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-2 p-6">
      <Hero />
      <Explore />
      <Budaya />
      <About />
      <Contact />
      
      {/* Chatbot akan muncul di pojok kanan bawah */}
      <ChatbotDialogflow />
    </div>
  );
};

export default Home;
