// src/pages/Leaderboard.jsx
import React from 'react';
import '../styles/Leaderboard.css';

function Leaderboard() {
    const topRecyclers = [
        {
            id: 1,
            name: "TEJAS TANDEL",
            rank: "Veteran Recycler",
            position: 1,
            points: 750,
            plasticRecycled: 100,
            metalRecycled: 90,
            isCurrentUser: true
        },
        {
            id: 2,
            name: "MANISH NAIK",
            rank: "Eco-Warrior",
            position: 2,
            points: 700,
            plasticRecycled: 100,
            metalRecycled: 80,
            isCurrentUser: false
        },
        {
            id: 3,
            name: "ABHISHEK NAIK",
            rank: "Recycler Extraordinaire",
            position: 3,
            points: 500,
            plasticRecycled: 60,
            metalRecycled: 64,
            isCurrentUser: false
        }
    ];

    const getRankIcon = (position) => {
        switch (position) {
            case 1: return "🥇";
            case 2: return "🥈";
            case 3: return "🥉";
            default: return position;
        }
    };

    return (
        <div className="leaderboard">
            <div className="leaderboard-header">
                <h1>🏆 Top Recyclers Leaderboard</h1>
                <p>See how you rank among other eco-warriors</p>
            </div>

            <div className="leaderboard-list">
                {topRecyclers.map(recycler => (
                    <div
                        key={recycler.id}
                        className={`leaderboard-card ${recycler.isCurrentUser ? 'current-user' : ''}`}
                    >
                        <div className="rank-position">
                            <span className="rank-icon">{getRankIcon(recycler.position)}</span>
                            <span className="rank-number">Rank {recycler.position}</span>
                        </div>

                        <div className="user-info">
                            <h3 className="user-name">{recycler.name}</h3>
                            <span className="user-rank">{recycler.rank}</span>
                        </div>

                        <div className="user-stats">
                            <div className="points-display">
                                <strong className="points-amount">{recycler.points} Points</strong>
                            </div>

                            <div className="recycling-stats">
                                <div className="stat">
                                    <span>Plastic: {recycler.plasticRecycled} items</span>
                                </div>
                                <div className="stat">
                                    <span>Metal: {recycler.metalRecycled} items</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Leaderboard;