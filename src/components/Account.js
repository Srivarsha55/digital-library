import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Account.css";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [profileImage, setProfileImage] = useState("");

  const loggedInUsername = localStorage.getItem("username");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (loggedInUsername) {
      fetchUserId();
    }
  }, [loggedInUsername]);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserId = async () => {
    try {
      const response = await axios.get("http://localhost:8080/login");
      const currentUser = response.data.find((user) => user.username === loggedInUsername);

      if (currentUser) {
        setUserId(currentUser.id);
      } else {
        console.error("User not found in API response");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const fetchUserData = async () => {
    if (userId) {
      try {
        const response = await axios.get(`http://localhost:8080/login/${userId}`);
        const { username, email, phoneNumber, birthday, gender, password, profileImage } = response.data;
        setUsername(username);
        setEmail(email);
        setPhoneNumber(phoneNumber);
        setBirthday(birthday);
        setGender(gender);
        setPassword(password);
        setProfileImage(profileImage ? `data:image/png;base64,${profileImage}` : "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setProfileImage(base64String); // Store base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleBirthdayChange = (e) => setBirthday(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username,
      email,
      phoneNumber,
      birthday,
      gender,
      password,
      role: "user",
      profileImage, // Include base64 image
    };

    try {
      await axios.put(`http://localhost:8080/login/${userId}`, formData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-pic">
        <label className="-label" htmlFor="file">
          <span className="glyphicon glyphicon-camera"></span>
          <span>Change Image</span>
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
        <img
          src={profileImage ? `data:image/png;base64,${profileImage}` : 'https://cdn.pixabay.com/photo/2017/08/06/21/01/louvre-2596278_960_720.jpg'}
          id="output"
          width="200"
          alt="Profile"
        />
      </div>
      <div className="profile-details">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Phone number</label>
              <input
                type="tel"
                placeholder="555-123-4567"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </div>
            <div className="form-group">
              <label>Birthday</label>
              <input
                type="date"
                value={birthday}
                onChange={handleBirthdayChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Gender</label>
              <select value={gender} onChange={handleGenderChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <button type="submit" className="btn-save">
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
