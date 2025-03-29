import React, { useState, useRef, useEffect } from 'react';
import './navbar.css';
import { FaUserCircle, FaUser, FaBookmark, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const userName = localStorage.getItem("name") || "Pengguna";
  const userEmail = localStorage.getItem("email") || "youremail@gmail.com";

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

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
    <nav>
      <div className='logo'><a href="/" style={{ color: 'white', textDecoration: 'none' }}>WisataBudaya</a></div>
      <ul className='nav-links'>
        <li><Link to='/'>Beranda</Link></li>
        <li><Link to='/wisata'>Wisata</Link></li>
        <li><Link to='/budaya'>Budaya</Link></li>
        <div className='profile-container' ref={dropdownRef} onClick={toggleDropdown}>
          <div className='profile-icon'><FaUserCircle /></div>
          {dropdownOpen && (
            <div className='dropdown-menu'>
              <div className='dropdown-header'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe41NOE7Eu1ezH1o_0dHiFy7VCQmvlAASYrw&s" alt="User Avatar" className="avatar"/>
                <div>
                  <p className="username">{userName}</p>
                  <p className="email">{userEmail}</p>
                </div>
              </div>
              <hr />
              <Link to={'/user'}><FaUser className="icon"/> Profile</Link>
              <Link to={'/bookmark'}><FaBookmark className="icon"/> Bookmark</Link>
              <button className="logout-button" onClick={handleLogout}><FaSignOutAlt className="icon"/> Log Out</button>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
