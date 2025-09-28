import React, { useState, useEffect } from 'react';
import './Account.css';
import NavBar from './NavBar'; // Import the NavBar component
import ProfilePage from './ProfilePage';
import PrivacyAndPassword from './PrivacyAndPassword';
import axios from 'axios';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      const loggedInUsername = localStorage.getItem('username'); // Retrieve username from localStorage
      try {
        const response = await axios.get('http://localhost:8080/login');
        const currentUser = response.data.find(user => user.username === loggedInUsername);
        if (currentUser) {
          setUserId(currentUser.id);
        } else {
          console.error('User not found in API response');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserId();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfilePage userId={userId} />;
      case 'security':
        return <PrivacyAndPassword userId={userId} />;
      case 'bookHistory':
        return <div>Book History</div>;
      case 'paymentHistory':
        return <div>Payment History</div>;
      default:
        return <ProfilePage userId={userId} />;
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'security', label: 'Security & Privacy' },
    { id: 'bookHistory', label: 'Book History' },
    { id: 'paymentHistory', label: 'Payment History' },
  ];

  return (
    <div className="account-page">
      <NavBar /> {/* Add the NavBar here */}
      <header className="page-header">
        <div className="page-header-container row">
          <div className="toolbar row">
            <div className="filter-options small-12 medium-8 columns">
              {tabs.map((tab) => (
                <a
                  href="#"
                  key={tab.id}
                  className={`filter-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>
      <div className="account-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Account;
