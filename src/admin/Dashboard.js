// src/components/Dashboard.js
import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

// Sample data for charts
const lineData = [
    { name: 'Jan', subscriptions: 100 },
    { name: 'Feb', subscriptions: 200 },
    { name: 'Mar', subscriptions: 300 },
    { name: 'Apr', subscriptions: 250 },
    { name: 'May', subscriptions: 400 },
    { name: 'Jun', subscriptions: 500 },
];

const barData = [
    { name: 'Jan', booksAdded: 20 },
    { name: 'Feb', booksAdded: 35 },
    { name: 'Mar', booksAdded: 50 },
    { name: 'Apr', booksAdded: 40 },
    { name: 'May', booksAdded: 60 },
    { name: 'Jun', booksAdded: 70 },
];

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            
            <div className="stats-container">
                <div className="stat-box">
                    <h3>Total Books</h3>
                    <p>1,200</p>
                </div>
                <div className="stat-box">
                    <h3>Total Subscriptions</h3>
                    <p>3,500</p>
                </div>
                <div className="stat-box">
                    <h3>New Subscribers This Month</h3>
                    <p>500</p>
                </div>
            </div>

            <div className="chart-container">
                <div className="chart-box">
                    <h3>Subscriptions Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#b89b74" />
                            <XAxis dataKey="name" stroke="#4a3b2a" />
                            <YAxis stroke="#4a3b2a" />
                            <Tooltip contentStyle={{ backgroundColor: '#f7e9d3', borderColor: '#b89b74' }} />
                            <Legend />
                            <Line type="monotone" dataKey="subscriptions" stroke="#a67c52" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-box">
                    <h3>Books Added Monthly</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#b89b74" />
                            <XAxis dataKey="name" stroke="#4a3b2a" />
                            <YAxis stroke="#4a3b2a" />
                            <Tooltip contentStyle={{ backgroundColor: '#f7e9d3', borderColor: '#b89b74' }} />
                            <Legend />
                            <Bar dataKey="booksAdded" fill="#b9936c" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
