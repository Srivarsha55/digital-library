import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Account.css';

const ProfilePage = ({ userId }) => {
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    email: "",
    phoneNumber: "",
    birthday: "",
    gender: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/login/${userId}`);
        const currentUser = response.data;

        if (currentUser) {
          setUserData({
            id: currentUser.id,
            username: currentUser.username,
            email: currentUser.email,
            phoneNumber: currentUser.phoneNumber || "",
            birthday: currentUser.birthday || "",
            gender: currentUser.gender || "",
          });
        } else {
          console.error('User not found in API response');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/login/${userData.id}`, userData);
      if (response.status === 200) {
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-page">
      <h2>Edit Profile</h2>
      <form className="profile-form" onSubmit={handleProfileSubmit}>
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            placeholder="Your Name"
          />
        </div>
        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="name@example.com"
          />
        </div>
        <div className="input-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleInputChange}
            placeholder="555-123-4567"
          />
        </div>
        <div className="input-group">
          <label>Birthday</label>
          <input
            type="date"
            name="birthday"
            value={userData.birthday}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group full-width">
          <label>Gender</label>
          <select
            name="gender"
            value={userData.gender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className="save-btn">Save</button>
      </form>
    </div>
  );
};

export default ProfilePage;
