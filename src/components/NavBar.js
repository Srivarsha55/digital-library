import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import logo from '../assets/logo.png';
import { CgProfile } from "react-icons/cg";
import { FaBars, FaTimes } from "react-icons/fa";
import Search from './Search';
import ProfileDropdown from './ProfileDropdown';

const NavBar = ({ userName, onLogout }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Determine if user is authenticated based on userName
  const isAuthenticated = !!userName;

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleSearchResultClick = (book) => {
    setSearchResults([]);
    navigate(`/books?search=${encodeURIComponent(book.title)}`);
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout(); // Call the passed onLogout function
    }
    navigate('/'); // Redirect to the sign-in page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home">
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>
      </div>
      <ul className={`navbar-links ${showMenu ? 'active' : ''}`}>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/library">My Library</Link></li>
        <li><Link to="/membership">Membership</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
      <div className="navbar-search">
        <Search onSearchResults={handleSearchResults} />
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((book, index) => (
              <div
                key={index}
                className="search-result-item"
                onClick={() => handleSearchResultClick(book)}
              >
                {book.title}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="profile-icon" onClick={handleProfileClick}>
        <CgProfile className='icon' />
        {isAuthenticated && <span className="username">{userName}</span>}
        {isDropdownOpen && (
          <ProfileDropdown
            userName={userName}
            onLogout={handleLogout} // Pass the updated handleLogout function
            onClose={handleCloseDropdown}
          />
        )}
      </div>
      <div className="hamburger" onClick={() => setShowMenu(!showMenu)}>
        {showMenu ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default NavBar;
