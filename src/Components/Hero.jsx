import React from 'react'
import Ampat from '../asset/ampat.jpg'
import Cendrawasih from '../asset/cendrawasih.jpg'
import Kecak from '../asset/kecak.png'

const Hero = () => {
  return (
    <div className="max-w-6xl w-full flex flex-col md:flex-row items-center rounded-lg p-8 gap-12">
    {/* Left Section */}
    <div className="md:w-1/2 w-full text-center md:text-left">
      <h1 className="text-4xl font-extrabold text-blue-600">
        Let’s Discover The Beautiful of Indonesia
      </h1>
      <p className="mt-4 text-gray-700 text-lg">
        WisataBudaya AI adalah platform berbasis kecerdasan buatan (AI) yang
        bertujuan untuk mengenalkan dan merekomendasikan wisata serta budaya
        Indonesia secara lebih interaktif dan personal.
      </p>
      <div className="mt-6">
        <input
          type="text"
          placeholder="Search The Beautiful of Indonesia..."
          className="w-full px-4 py-2 border border-[gray] rounded-[24px] focus:outline-none focus:border-blue-400"
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
  )
}

export default Hero