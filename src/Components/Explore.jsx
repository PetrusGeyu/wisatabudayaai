import React from "react";
import Borobudur from "../asset/candi.jpg";
import RajaAmpat from "../asset/ampat.jpg";
import TanahLot from "../asset/lot.jpeg";

const places = [
  {
    id: 1,
    title: "Candi Borobudur",
    description: "Candi Buddha terbesar di dunia, warisan budaya UNESCO.",
    image: Borobudur,
    rating: 4.8,
    location: "Magelang, Jawa Tengah",
  },
  {
    id: 2,
    title: "Raja Ampat",
    description: "Surga bawah laut dengan terumbu karang yang indah.",
    image: RajaAmpat,
    rating: 4.9,
    location: "Papua Barat",
  },
  {
    id: 3,
    title: "Tanah Lot",
    description: "Pura unik di atas batu karang di tepi laut.",
    image: TanahLot,
    rating: 4.7,
    location: "Bali",
  },
];

const Explore = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Judul */}
      <h2 className="text-3xl font-bold text-left mb-6">Explore</h2>

      {/* Grid Card Wisata */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place) => (
          <div
            key={place.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 duration-300"
          >
            <img
              src={place.image}
              alt={place.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{place.title}</h3>
              <p className="text-gray-600 text-sm">{place.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-yellow-500 font-bold">⭐ {place.rating}</span>
                <span className="text-gray-500 text-sm">{place.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
