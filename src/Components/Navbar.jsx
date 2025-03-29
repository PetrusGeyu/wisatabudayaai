import React, { useState, useRef, useEffect } from 'react';
import './navbar.css';
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "Pengguna";

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
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
    <nav>
      <div className='logo'><a href="/" style={{ color: 'white', textDecoration: 'none' }}>WisataBudaya</a></div>
      <ul className='nav-links'>
        <li><Link to='/'>Beranda</Link></li>
        <li><Link to='/wisata'>Wisata</Link></li>
        <li><Link to='/budaya'>Budaya</Link></li>
        <div className='profile-wrapper' ref={dropdownRef}>
          <div className='profile-icon' onClick={toggleDropdown}>
            <FaUserCircle />
          </div>
          {dropdownOpen && (
            <div className='dropdown-menu'>
              <p className='user-name'>{userName}</p>
              <button className='logout-button' onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
