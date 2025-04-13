import React, { useEffect, useState } from "react";
import Hero from "../Components/Hero";
import Explore from "../Components/Explore";
import Budaya from "../Components/Budaya";
import Contact from "../Components/Contact";
import About from "../Components/About";
import ChatbotDialogflow from "../Components/DialogFlowChat";

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-2 p-6">
      <Hero />
      <Explore />
      <Budaya />
      <About />
      <Contact />

      {/* Chatbot tetap muncul di semua user */}
      <ChatbotDialogflow />

      {/* Contoh: tampilkan info jika login */}
      {/* {isLoggedIn && <p className="text-green-600 text-center mt-4">Selamat datang kembali!</p>} */}
    </div>
  );
};

export default Home;
