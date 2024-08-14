import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Footer from '../../Footer';
import './membership.css';
import book1 from '../book/asserts/all.jpeg';
import book2 from '../book/asserts/king.jpeg';
import book3 from '../book/asserts/mice.png';

const Membership = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (location.state && location.state.requiredMembership) {
      setShowPopup(true);
    }
  }, [location.state]);

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleUpgradeClick = () => {
    navigate('/payment');
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="membership-container">
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>Upgrade to Premium</h3>
              <p>To access this book, you need a premium membership. Would you like to upgrade?</p>
              <button className="popup-button" onClick={closePopup}>Close</button>
              <button className="popup-button" onClick={handleUpgradeClick}>Upgrade Now</button>
            </div>
          </div>
        )}
        <header className="header">
          <h1>NebulaReaders</h1>
          <p>Unlimited Reading. Unlimited Listening. Any Device.</p>
        </header>
        <div className="content">
          <div className="plans-section">
            <h2>Choose your plan</h2>
            <div className="plans">
              <div className="plan">
                <h3>Free Plan</h3>
                <p className="price">Rs.0.00</p>
                <p>Explore a selection of popular titles with our Free Plan—no commitment required.</p>
              </div>
              <div className="plan highlight">
                <h3>Premium Plan</h3>
                <p className="price">RS.100/mo</p>
                <p>Enjoy unlimited access to all content and exclusive releases with our Premium Plan.</p>
                <p>Limited time offer: Get 1 month free with annual subscription.</p>
              </div>
            </div>
            <button className="cta-button" onClick={handleUpgradeClick}>Experience Premium Bliss</button>
            <p className="terms">
              By signing up, you accept the NebulaReaders Terms and authorize us to charge your selected payment method or any payment method on file after the free trial period. Your membership will be billed at the chosen rate plus applicable taxes until canceled. You can cancel anytime at www.nebulareaders.com/kucentral.
            </p>
          </div>
          <div className="carousel-section">
            <h2>For you in NebulaReaders</h2>
            <div className="carousel">
              <div className="carousel-item">
                <img src={book1} alt="Book 1" />
                <p>All your Twisted Secrets</p>
              </div>
              <div className="carousel-item">
                <img src={book2} alt="Book 2" />
                <p>I Am The king Of The Castle</p>
              </div>
              <div className="carousel-item">
                <img src={book3} alt="Book 3" />
                <p>Of mice And Men</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Membership;
