import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './signup.css';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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

    const sendConfirmationEmail = (email, username) => {
        const templateParams = {
            to_email: email,
            to_name: username,
            message: 'Thank you for registering with NebulaReads! Your account has been created successfully.',
        };

        emailjs.send('service_w5so1il', 'template_cg98l8r', templateParams, 'J5CP6ybunP8RBwD-a')
            .then((response) => {
                console.log('Confirmation email sent successfully!', response.status, response.text);
            })
            .catch((error) => {
                console.error('Failed to send confirmation email:', error);
            });
    };

    const handleSignup = async () => {
        const { username, email, password, confirmPassword } = formData;

        if (!username || !email || !password || !confirmPassword) {
            setError('Please enter all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setError('');

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, role: 'user' }),
            });

            const text = await response.text();
            const result = text ? JSON.parse(text) : {};

            if (response.ok) {
                alert(result.message || 'Registration successful');
                sendConfirmationEmail(email, username);
                navigate('/');
            } else {
                setError(result.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred: ' + error.message);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-wrapper">
                <h2>Sign up</h2>
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
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
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
                <div className="input-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <p>
                    <input type="checkbox" />
                    <span>I read and agree to</span>
                    <span><a href="/terms-and-conditions" className="link"> Terms & Conditions</a></span>
                </p>
                <button className="bt1" onClick={handleSignup}>Sign up</button>
                <p>
                    Already have an account? <Link to="/">Login here!</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
