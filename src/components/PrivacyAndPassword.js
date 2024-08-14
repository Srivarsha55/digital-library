import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Account.css';

const PrivacyAndPassword = ({ userId }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [userInfo, setUserInfo] = useState({});
  const [isPasswordValid, setIsPasswordValid] = useState(true); // State to check if the current password is valid

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/login/${userId}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      // Validate current password
      const validateResponse = await axios.post(`http://localhost:8080/login/${userId}/validate-password`, {
        currentPassword: passwordData.currentPassword
      });

      if (validateResponse.status === 200 && validateResponse.data.valid) {
        // Update password
        const updateResponse = await axios.put(`http://localhost:8080/login/${userId}/update-password`, {
          newPassword: passwordData.newPassword
        });

        if (updateResponse.status === 200) {
          alert("Password updated successfully!");
        }
      } else {
        setIsPasswordValid(false); // Set flag if the current password is invalid
        alert("Current password is incorrect.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="privacy-page">
      <h2>Security and Privacy</h2>
      <form className="privacy-form" onSubmit={handlePasswordSubmit}>
        <div className="input-group">
          <label>Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handleInputChange}
            placeholder="Current Password"
            required
          />
          {!isPasswordValid && <span className="error-message">Current password is incorrect.</span>}
        </div>
        <div className="input-group">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handleInputChange}
            placeholder="New Password"
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
            placeholder="Confirm New Password"
            required
          />
        </div>
        <button type="submit" className="save-btn">Save</button>
      </form>
    </div>
  );
};

export default PrivacyAndPassword;
