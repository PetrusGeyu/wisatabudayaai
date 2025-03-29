import React from 'react'
import './navbar.css';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav>
      <div className='logo'><a href="">WisataBudaya</a></div>
      <ul className='nav-links'>
        <li><Link to='/'>Beranda</Link></li>
        <li><Link to={'/wisata'}>Wisata</Link></li>
        <li><a href="#">Budaya</a></li>
        <div className='profile-icon'><FaUserCircle /></div>
      </ul>
    </nav>
  );
};

export default Navbar