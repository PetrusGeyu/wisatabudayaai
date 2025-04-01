import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-6xl w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Judul */}
        <h1 className="text-4xl font-extrabold text-blue-600 text-center">Get in Touch</h1>
        <p className="text-gray-600 text-center mt-2">
          Hubungi kami untuk pertanyaan, saran, atau kerja sama!
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Form Kontak */}
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Kirim Pesan</h2>
            <form className="flex flex-col space-y-4">
              <input 
                type="text" 
                placeholder="Nama Anda" 
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              />
              <input 
                type="email" 
                placeholder="Email Anda" 
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              />
              <textarea 
                rows="4" 
                placeholder="Pesan Anda" 
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              />
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Informasi Kontak */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-blue-600 text-2xl" />
              <p className="text-gray-700">Jl. Wisata Budaya No. 123, Jakarta, Indonesia</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-blue-600 text-2xl" />
              <p className="text-gray-700">contact@wisatabudayaai.com</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhone className="text-blue-600 text-2xl" />
              <p className="text-gray-700">+62 812 3456 7890</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-blue-600 text-2xl hover:text-blue-800 transition">
                <FaFacebook />
              </a>
              <a href="#" className="text-blue-600 text-2xl hover:text-blue-800 transition">
                <FaInstagram />
              </a>
              <a href="#" className="text-blue-600 text-2xl hover:text-blue-800 transition">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
