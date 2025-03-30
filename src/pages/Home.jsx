import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Ampat from '../asset/ampat.jpg'
import Cendrawasih from '../asset/cendrawasih.jpg'
import Kecak from '../asset/kecak.png'

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 gap-2">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center rounded-lg p-8 gap-12">
        {/* Left Section */}
        <div className="md:w-1/2 w-full text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-blue-600">
            Let’s Discover The Beautiful of Indonesia
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            WisataBudaya AI adalah platform berbasis kecerdasan buatan (AI) yang
            bertujuan untuk mengenalkan dan merekomendasikan wisata serta budaya
            Indonesia secara lebih interaktif dan personal. Dengan memanfaatkan
            teknologi Machine Learning dan Computer Vision, platform ini dapat
            memberikan rekomendasi wisata budaya yang sesuai dengan preferensi
            pengguna serta mengenali berbagai elemen budaya dari gambar atau
            teks, seperti pakaian adat, kuliner khas, tarian tradisional, dan
            artefak budaya.
          </p>
          <div className="mt-6">
            <input
              type="text"
              placeholder="Search The Beautiful of Indonesia..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Right Section - Bento Box Images */}
        <div className="md:w-1/2 w-full mt-6 md:mt-0 flex justify-center">
  <div className="grid grid-cols-2 gap-4 scale-125">
    {/* Cultural 1 - Kecil di kiri atas */}
    <img
  src={Cendrawasih}
  alt="Cultural 1"
  className="w-40 h-44 rounded-lg shadow-md object-cover object-center"
/>


    {/* Cultural 2 - Tinggi di kanan atas */}
    <img
      src={Ampat}
      alt="Cultural 2"
      className="w-40 h-80 rounded-lg shadow-md object-cover row-span-2"
    />

    {/* Cultural 3 - Di bawah Cultural 1, sejajar dengan Cultural 2 */}
    <img
      src={Kecak}
      alt="Cultural 3"
      className="w-40 h-32 rounded-lg shadow-md object-cover"
    />
  </div>
</div>

      </div>
    </div>
  );
};

export default Home;
