// src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const getNextRankPoints = () => {
        if (user.points < 500) return 500;
        if (user.points < 1000) return 1000;
        if (user.points < 5000) return 5000;
        return 'Max Rank';
    };

    const handleQuickAction = (action) => {
        switch (action) {
            case 'leaderboard':
                navigate('/leaderboard');
                break;
            case 'rewards':
                navigate('/rewards');
                break;
            case 'recycle':
                alert('Recycling feature coming soon!');
                break;
            default:
                break;
        }
    };

    return (
        <div className="dashboard">
            <div className="welcome-section">
                <h1>Welcome back, {user.name}!</h1>
                <div className="points-display">
                    <div className="total-points">
                        <span className="points-number">{user.points}</span>
                        <span className="points-label">Total Points</span>
                    </div>
                </div>
            </div>

            <div className="achievements-section">
                <h2>🏆 Achievements</h2>

                <div className="rank-card">
                    <h3>Your Current Rank</h3>
                    <div className="rank-info">
                        <span className="rank-badge">{user.rank}</span>
                        <p><strong>Total Points:</strong> {user.points}</p>
                    </div>
                    <div className="rank-progress">
                        <p><strong>Next Title:</strong> Eco-Warrior at {getNextRankPoints()} points</p>
                    </div>
                </div>

                <div className="recycling-stats">
                    <div className="stat-card">
                        <h4>♻️ Plastic Recycling</h4>
                        <p><strong>Items Recycled:</strong> {user.plastic_recycled} plastic bottles</p>
                        <p><strong>Points Earned:</strong> {user.plastic_recycled * 5}</p>
                    </div>

                    <div className="stat-card">
                        <h4>🔩 Metal Recycling</h4>
                        <p><strong>Items Recycled:</strong> {user.metal_recycled} metal cans</p>
                        <p><strong>Points Earned:</strong> {user.metal_recycled * 5}</p>
                    </div>
                </div>
            </div>

            <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                    <button
                        className="action-btn primary"
                        onClick={() => handleQuickAction('recycle')}
                    >
                        ♻️ Recycle Now
                    </button>
                    <button
                        className="action-btn secondary"
                        onClick={() => handleQuickAction('leaderboard')}
                    >
                        📊 View Leaderboard
                    </button>
                    <button
                        className="action-btn secondary"
                        onClick={() => handleQuickAction('rewards')}
                    >
                        🎁 Redeem Rewards
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;