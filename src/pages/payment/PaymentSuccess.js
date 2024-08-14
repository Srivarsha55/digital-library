import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Footer from '../../Footer';
import './PaymentSuccess.css';

const PaymentSuccess = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const updateMembershipStatus = () => {
      const user = JSON.parse(localStorage.getItem('user')) || {};
      user.membership = 'premium';
      localStorage.setItem('user', JSON.stringify(user));
    };

    updateMembershipStatus();

    const timer = setTimeout(() => {
      navigate('/home');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="container">
        <div className="heading">
          <span className="tick-container">
            <i className="tick"></i>
          </span>
          <span>Your payment is successful</span>
        </div>
        <div className="text-container">
          <div>You will be logged out of all devices except this one.</div>
          <div>You will be redirected to the homepage in 5 seconds.</div>
          <div>Click the button below if you are not redirected to the homepage.</div>
          <button onClick={() => navigate('/home')} className="primary-button">
            Go to Homepage
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentSuccess;
