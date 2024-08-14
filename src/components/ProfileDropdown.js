import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileDropdown.css'; // Optional: Add styles for the dropdown

const ProfileDropdown = ({ userName, onLogout, onClose }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/account'); // Updated to navigate to the account page
    onClose();
  };

  const handleLogout = () => {
    onLogout(); 
    navigate('/'); // Redirect after logout
    onClose();
  };

  return (
    <ul className="profile-dropdown">
      <li onClick={handleProfileClick}>Profile</li> {/* Updated text to 'Account' */}
      <li onClick={handleLogout}>Logout</li>
    </ul>
  );
};

export default ProfileDropdown;
