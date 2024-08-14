import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
const AuthDropdown = ({ onClose }) => {
  return (
    <div className="dropdown-content" onClick={onClose}>
      <Link to="/signin">Sign In</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default AuthDropdown;
