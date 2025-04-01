import React from "react";
import { FaPhone, FaFax, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-gray-800 text-white p-10 rounded-lg shadow-xl grid md:grid-cols-2 gap-10">
        {/* Formulir */}
        <div>
          <h2 className="text-4xl font-bold mb-4">Get in <span className="text-blue-400">Touch</span></h2>
          <p className="text-gray-400 mb-6">Hubungi kami untuk pertanyaan, saran, atau kerja sama!</p>
          <form className="space-y-4">
            <input type="text" placeholder="Name *" className="w-full p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="email" placeholder="Email *" className="w-full p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="text" placeholder="Phone number *" className="w-full p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="text" placeholder="How did you find us?" className="w-full p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button className="w-full bg-blue-500 p-3 rounded text-white font-semibold hover:bg-blue-600 transition">SEND</button>
          </form>
          <div className="flex items-center space-x-4 text-gray-300 mt-6">
            <FaPhone className="text-xl" /><span>+62 812 3456 7890</span>
            <FaFax className="text-xl" /><span>05 5342 1234</span>
            <FaEnvelope className="text-xl" /><span>info@wisatabudayaai.com</span>
          </div>
        </div>
        {/* Peta */}
        <div>
          <iframe 
            className="w-full h-120 rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.500490983221!2d110.3789957750209!3d-7.190714669537411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708c312dc1bb31%3A0x5027a76e3564940!2sWisata%20Budaya!5e0!3m2!1sid!2sid!4v1618997028287!5m2!1sid!2sid" 
            allowFullScreen="" 
            loading="lazy" 
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;