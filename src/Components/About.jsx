import React from "react";
import aboutImage from "../asset/about.jpg"; // Tambahkan gambar pendukung
import { FaBrain, FaGlobeAsia, FaMapMarkedAlt, FaCameraRetro } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Hero Section */}
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8">
        {/* Left Section - Text */}
        <div className="md:w-1/2 w-full text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-blue-600">Tentang WisataBudaya AI</h1>
          <p className="mt-4 text-gray-700 text-lg">
            WisataBudaya AI adalah platform berbasis kecerdasan buatan (AI) yang bertujuan untuk
            mengenalkan dan merekomendasikan wisata serta budaya Indonesia secara lebih interaktif
            dan personal. Dengan teknologi Machine Learning dan Computer Vision, platform ini
            mampu memberikan rekomendasi wisata serta mengenali berbagai elemen budaya seperti
            pakaian adat, kuliner khas, tarian tradisional, dan artefak budaya.
          </p>
        </div>

        {/* Right Section - Image */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src={aboutImage}
            alt="About WisataBudaya AI"
            className="w-96 h-64 rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl w-full mt-12">
        <h2 className="text-3xl font-bold text-center mb-6">Fitur Utama</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:scale-105 transition">
            <FaBrain className="text-blue-600 text-4xl mb-3" />
            <h3 className="font-semibold text-xl">AI Rekomendasi Wisata</h3>
            <p className="text-gray-600 text-sm">Menyesuaikan rekomendasi wisata berdasarkan preferensi pengguna.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:scale-105 transition">
            <FaGlobeAsia className="text-blue-600 text-4xl mb-3" />
            <h3 className="font-semibold text-xl">Pengenalan Budaya</h3>
            <p className="text-gray-600 text-sm">Mengenali budaya Indonesia dari gambar dan teks.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:scale-105 transition">
            <FaMapMarkedAlt className="text-blue-600 text-4xl mb-3" />
            <h3 className="font-semibold text-xl">Panduan Wisata</h3>
            <p className="text-gray-600 text-sm">Informasi lengkap tentang tempat wisata budaya di Indonesia.</p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:scale-105 transition">
            <FaCameraRetro className="text-blue-600 text-4xl mb-3" />
            <h3 className="font-semibold text-xl">Analisis Foto Budaya</h3>
            <p className="text-gray-600 text-sm">Menggunakan Computer Vision untuk mengenali elemen budaya dari foto.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
