// src/components/Layout.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import './adminhome.css';

const Layout = ({ children }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/'); 
    };

    return (
        <div className="admin-page">
            <header className="header">
                <Link to="/adminhome" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="header-left">
                    <h1>NebulaReads</h1>
                </div></Link>
                <div className="header-right">
                    <div className="profile-icon" onClick={handleLogout}>A</div>
                </div>
            </header>
            <nav className="sidebar">
                <ul>
                    <li><Link to="/user-management">User Management</Link></li>
                    <li><Link to="/book-management">Book Management</Link></li>
                    <li><Link to="/subscription">Subscription</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                </ul>
            </nav>
            <main className="content">
                {children || <Dashboard />}  
            </main>
        </div>
    );
};

export default Layout;
