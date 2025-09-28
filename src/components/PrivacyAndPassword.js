import React, { useState } from 'react';
import axios from 'axios';

const PrivacyAndPassword = ({ userId, username }) => {  // Pass username if it's different from userId
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Check if new password and confirm password match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New password and confirm password don't match.");
      return;
    }

    // Check if the new password is not empty
    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      // Verify the current password by calling the backend /login/check endpoint
      const checkResponse = await axios.post('http://localhost:8080/login/check', {
        username: username,  // Assuming username is passed as a prop
        password: passwordData.currentPassword,
      });

      if (checkResponse.data.success) {
        // Update the password if the current password is correct
        const updateResponse = await axios.put(`http://localhost:8080/login/${userId}/password`, {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        });

        if (updateResponse.data.success) {
          setSuccess('Password updated successfully!');
          setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } else {
          setError('Failed to update the password. Please try again.');
        }
      } else {
        setError('Current password is incorrect.');
      }
    } catch (error) {
      setError('Error updating password: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="privacy-and-password">
      <h2>Privacy & Password</h2>
      
      <form onSubmit={handlePasswordUpdate} className="password-form">
        <div className="input-group">
          <label>Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit" className="save-btn">Update Password</button>
      </form>
    </div>
  );
};

export default PrivacyAndPassword;
