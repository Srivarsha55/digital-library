import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signin.css';

const SigninPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSignin = async () => {
    const { username, password } = formData;

    if (!username || !password) {
      setError('Please enter all fields');
      return;
    }

    setError('');

    try {
      const response = await fetch('http://localhost:8080/login/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      console.log('Login response:', result); 
      localStorage.setItem("username", username); // Store username in localStorage

      if (response.ok) {
        switch (result.role) {
          case 'admin':
            navigate('/adminhome'); // Redirect to admin home
            break;
          case 'user':
            navigate('/home'); // Redirect to user home
            break;
          default:
            navigate('/adminhome'); // Redirect to a default page if role is unknown
        }
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-wrapper">
        <h2>Sign in</h2>
        <div className="input-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button className="bt1" onClick={handleSignin}>Sign in</button>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
