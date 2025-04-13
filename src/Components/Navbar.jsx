import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaUser, FaBookmark, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const userName = localStorage.getItem("name") || "Pengguna";
  const userEmail = localStorage.getItem("email") || "youremail@gmail.com";

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = (e) => {
    e.stopPropagation();
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className="flex justify-between items-center bg-blue-600 bg-opacity-80 backdrop-blur-md p-3 text-white sticky top-0 z-[1000] transition-all duration-300 ease-in-out"
    >
      <div className="text-xl font-bold">
        <Link to="/" className="text-white no-underline">
          WisataBudaya
        </Link>
      </div>

      <div className="lg:hidden z-[1001]" onClick={toggleMenu}>
        {menuOpen ? <FaTimes className="text-white text-xl" /> : <FaBars className="text-white text-xl" />}
      </div>

      <ul
        className={`${
          menuOpen ? "flex flex-col absolute top-full left-0 w-full bg-blue-600 bg-opacity-80 p-4 z-[999]" : "hidden"
        } lg:flex lg:flex-row lg:items-center lg:gap-6 lg:static lg:w-auto lg:bg-transparent`}
      >
        <li className="my-2 lg:my-0 text-center">
          <Link to="/" className="text-white hover:text-black transition-colors duration-300" onClick={() => setMenuOpen(false)}>
            Beranda
          </Link>
        </li>
        <li className="my-2 lg:my-0 text-center">
          <Link to="/wisata" className="text-white hover:text-black transition-colors duration-300" onClick={() => setMenuOpen(false)}>
            Wisata
          </Link>
        </li>
        <li className="my-2 lg:my-0 text-center">
          <Link to="/budaya" className="text-white hover:text-black transition-colors duration-300" onClick={() => setMenuOpen(false)}>
            Budaya
          </Link>
        </li>

        <div
          className="relative cursor-pointer mt-2 lg:mt-0 self-center"
          ref={dropdownRef}
          onClick={toggleDropdown}
          tabIndex={-1}
          onFocus={(e) => e.preventDefault()}
        >
          <div className="text-2xl text-white">
            <FaUserCircle />
          </div>
          {dropdownOpen && (
            <div className="absolute top-14 right-0 bg-blue-600 bg-opacity-90 text-white w-60 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out z-[999]">
              <div className="flex items-center p-4 border-b border-white/20 bg-blue-600 bg-opacity-80">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe41NOE7Eu1ezH1o_0dHiFy7VCQmvlAASYrw&s"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">{userName}</p>
                  <p className="text-xs">{userEmail}</p>
                </div>
              </div>
              <Link to="/user" className="flex items-center gap-2 p-3 hover:bg-white/10">
                <FaUser className="text-lg" /> Profile
              </Link>
              <Link to="/bookmark" className="flex items-center gap-2 p-3 hover:bg-white/10">
                <FaBookmark className="text-lg" /> Bookmark
              </Link>
              <button className="w-full text-left p-3 flex items-center gap-2 hover:bg-white/10" onClick={handleLogout}>
                <FaSignOutAlt className="text-lg" /> Log Out
              </button>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
