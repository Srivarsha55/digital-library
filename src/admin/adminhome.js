import React from 'react';
import { Link } from 'react-router-dom';
import './adminhome.css'; // Ensure this CSS file is imported

const Layout = ({ children }) => {
    return (
        <div className="admin-page">
            <header className="header">
                <div className="header-left">
                    <h1>NebulaReads</h1>
                </div>
                <div className="header-right">
                    <div className="profile-icon">A</div>
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
                {children}
            </main>
        </div>
    );
}

export default Layout;
