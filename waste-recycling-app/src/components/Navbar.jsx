// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">🌱 EcoRecycle</Link>
            </div>

            <div className="nav-links">
                <Link to="/" className={isActive('/')}>Dashboard</Link>
                <Link to="/profile" className={isActive('/profile')}>Profile</Link>
                <Link to="/leaderboard" className={isActive('/leaderboard')}>Leaderboard</Link>
                <Link to="/rewards" className={isActive('/rewards')}>Rewards</Link>
            </div>

            <div className="nav-user">
                <span className="user-welcome">Welcome, {user?.name}</span>
                <div className="points-badge">{user?.points} pts</div>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;