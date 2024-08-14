// MainLayout.js
import React from 'react';
import NavBar from './components/NavBar';
import Footer from './Footer';

const MainLayout = ({ children, isLoggedIn, onLogout }) => (
  <>
    <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} />
    <div className="main-content">{children}</div>
    <Footer />
  </>
);

export default MainLayout;
