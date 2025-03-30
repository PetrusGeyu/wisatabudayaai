import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-5">
      <h1 className="text-6xl font-bold text-blue-500">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mt-2">Oops! Halaman tidak ditemukan</h2>
      <p className="text-gray-500 mt-2">Halaman yang kamu cari tidak tersedia atau telah dipindahkan.</p>
      <Link to="/" className="mt-5 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all">
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;
