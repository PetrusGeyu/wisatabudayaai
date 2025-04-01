import React from "react";
import Batik from "../asset/batik.jpeg";
import Wayang from "../asset/wayang.jpg";
import Reog from "../asset/reog.jpg";
import Toraja from "../asset/toraja.jpeg";
import Pendet from "../asset/pendet.jpeg";
import Angklung from "../asset/angklung.jpeg";

const cultures = [
  {
    id: 1,
    title: "Batik",
    description: "Seni kain tradisional dengan motif khas Indonesia.",
    image: Batik,
    location: "Seluruh Indonesia",
  },
  {
    id: 2,
    title: "Wayang Kulit",
    description: "Pertunjukan bayangan menggunakan boneka kulit.",
    image: Wayang,
    location: "Jawa",
  },
  {
    id: 3,
    title: "Reog Ponorogo",
    description: "Tarian dengan topeng besar yang mencerminkan keberanian.",
    image: Reog,
    location: "Ponorogo, Jawa Timur",
  },
  {
    id: 4,
    title: "Rumah Adat Toraja",
    description: "Rumah adat unik berbentuk kapal dengan ukiran khas.",
    image: Toraja,
    location: "Toraja, Sulawesi Selatan",
  },
  {
    id: 5,
    title: "Tari Pendet",
    description: "Tarian penyambutan khas Bali yang penuh keindahan.",
    image: Pendet,
    location: "Bali",
  },
  {
    id: 6,
    title: "Angklung",
    description: "Alat musik bambu yang menghasilkan melodi indah.",
    image: Angklung,
    location: "Jawa Barat",
  },
];

const Budaya = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Judul di kiri */}
      <h2 className="text-3xl font-bold text-left mb-6">Budaya </h2>

      {/* Grid Card Budaya */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cultures.map((culture) => (
          <div
            key={culture.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 duration-300"
          >
            <img
              src={culture.image}
              alt={culture.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{culture.title}</h3>
              <p className="text-gray-600 text-sm">{culture.description}</p>
              <div className="mt-3 text-gray-500 text-sm">{culture.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Budaya;
