import React from 'react'
import './navbar.css';
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav>
      <div className='logo'><a href="">WisataBudaya</a></div>
      <ul className='nav-links'>
        <li><a href="#">Beranda</a></li>
        <li><a href="#">Wisata</a></li>
        <li><a href="#">Budaya</a></li>
        <div className='profile-icon'><FaUserCircle /></div>
      </ul>
    </nav>
  );
};

export default Navbar