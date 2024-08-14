import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../Footer';
import './contact.css';

const ContactUs = ({ isLoggedIn, onLogout }) => {
  const [data, setData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', data);

    // Show a thank you message
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitted(false);
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="contact-container">
        <form method="post" onSubmit={handleSubmit}>
          <h1>Contact <span>Here</span></h1>
          <input type="text" name="name" onChange={handleChange} value={data.name} placeholder="Enter Name" required />
          <input type="email" name="email" onChange={handleChange} value={data.email} placeholder="Enter the Email ID" required />
          <input type="tel" name="phone" onChange={handleChange} value={data.phone} placeholder="+91" required />
          <textarea name="message" onChange={handleChange} value={data.message} rows="10" placeholder="Type here..." required></textarea>
          <button type="submit">Send</button>

          {isSubmitted && (
            <div className="popup">
              <div className="popup-content">
                <p>Thank you for your response!</p>
                <button onClick={handleReset}>Close</button>
              </div>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
