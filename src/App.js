import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SignInPage from './Module/signin';
import SignUpPage from './Module/signup';
import HomePage from './pages/homepage/Home';
import BooksPage from './pages/book/books';
import LibraryPage from './pages/book/Library';
import MembershipPage from './pages/book/membership';
import ContactPage from './pages/contact';
import BookDetail from './pages/book/BookDetail';
import Payment from './pages/payment/Payment';
import PaymentSuccess from './pages/payment/PaymentSuccess';
import AdminHome from './admin/adminhome';
import UserManagement from './admin/UserManagement';
import BookManagement from './admin/BookManagement'; 
import Subscription from './admin/Subscription';
import Settings from './admin/Settings';
import Account from './components/Account'; // Import the Account page
import './App.css';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    console.log('User logged out');
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/book-management" element={<BookManagement />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
