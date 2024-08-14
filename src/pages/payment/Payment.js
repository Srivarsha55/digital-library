import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Footer from '../../Footer';
import './Payment.css';

const Payment = ({ isLoggedIn, onLogout }) => {
  const [subscription, setSubscription] = useState('1-month');
  const [cost, setCost] = useState(100);
  const navigate = useNavigate();

  const handleSubscriptionChange = (event) => {
    const value = event.target.value;
    setSubscription(value);

    switch (value) {
      case '1-month':
        setCost(100);
        break;
      case '3-month':
        setCost(250);
        break;
      case '6-month':
        setCost(450);
        break;
      case '9-month':
        setCost(600);
        break;
      case '1-year':
        setCost(1000);
        break;
      default:
        setCost(100);
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/payment-success');
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <h4>Payment Details</h4>
            <div className="input-group">
              <input
                id="payment-method-card"
                type="radio"
                name="payment-method"
                value="card"
                defaultChecked
              />
              <label htmlFor="payment-method-card">
                <span>
                  <i className="fa fa-cc-visa" /> Credit Card
                </span>
              </label>
              <input
                id="payment-method-paypal"
                type="radio"
                name="payment-method"
                value="paypal"
              />
              <label htmlFor="payment-method-paypal">
                <span>
                  <i className="fa fa-cc-paypal" /> Paypal
                </span>
              </label>
            </div>
            <div className="input-group input-group-icon">
              <input type="text" placeholder="Card Number" />
              <div className="input-icon">
                <i className="fa fa-credit-card" />
              </div>
            </div>
            <div className="col-half">
              <div className="input-group input-group-icon">
                <input type="text" placeholder="Card CVC" />
                <div className="input-icon">
                  <i className="fa fa-user" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="row left-align">
            <h4>Subscription Duration</h4>
            <div className="input-group">
              <select onChange={handleSubscriptionChange}>
                <option value="1-month">1 Month</option>
                <option value="3-month">3 Months</option>
                <option value="6-month">6 Months</option>
                <option value="9-month">9 Months</option>
                <option value="1-year">1 Year</option>
              </select>
            </div>
            <p className="cost">Total Cost: Rs.{cost}</p>
          </div>

          <div className="row left-align">
            <h4>Terms and Conditions</h4>
            <div className="input-group-checkbox">
              <input id="terms" type="checkbox" />
              <label htmlFor="terms">
                I accept the terms and conditions for signing up to this service, and hereby
                confirm I have read the privacy policy.
              </label>
            </div>
          </div>
          
          <button type="submit" className="pay-button">Pay Now</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
