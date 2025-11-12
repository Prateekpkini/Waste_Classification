// src/pages/Rewards.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import RewardCard from '../components/RewardCard';
import '../styles/Rewards.css';

function Rewards() {
    const { user, updateProfile } = useAuth();
    const [loading, setLoading] = useState(false);

    const rewards = [
        {
            id: 1,
            title: "$10 Gift Card",
            description: "Use this gift card for purchases at various online stores.",
            cost: 500,
            image: "🎁"
        },
        {
            id: 2,
            title: "Free Starbucks Coffee",
            description: "Get a free coffee at Starbucks, any size, any flavor.",
            cost: 300,
            image: "☕"
        },
        {
            id: 3,
            title: "50% Off Movie Ticket",
            description: "Enjoy 50% off at participating theaters on your next movie ticket.",
            cost: 800,
            image: "🎬"
        }
    ];

    const handleRedeem = async (reward) => {
        if (loading) return;
        setLoading(true);

        if (user.points >= reward.cost) {
            const newPoints = user.points - reward.cost;
            try {
                await updateProfile({ points: newPoints });
                alert(`Congratulations! You redeemed ${reward.title} for ${reward.cost} points. Your new balance is ${newPoints} points.`);
            } catch (error) {
                alert(`Redemption failed: ${error.message}`);
            }
        } else {
            alert(`You need ${reward.cost - user.points} more points to redeem this reward. Keep recycling!`);
        }
        setLoading(false);
    };

    return (
        <div className="rewards">
            <div className="rewards-header">
                <h1>🎁 Exchange Your Points For Exciting Rewards</h1>
                <div className="points-balance">
                    You have <span className="points-highlight">{user.points} Points</span> ready for redemption!
                </div>
            </div>

            <div className="rewards-grid">
                {rewards.map(reward => (
                    <RewardCard
                        key={reward.id}
                        reward={reward}
                        userPoints={user.points}
                        onRedeem={handleRedeem}
                    />
                ))}
            </div>
        </div>
    );
}

export default Rewards;