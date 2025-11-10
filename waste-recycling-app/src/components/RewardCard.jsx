// src/components/RewardCard.jsx
import React from 'react';
import '../styles/RewardCard.css';

function RewardCard({ reward, userPoints, onRedeem }) {
    const canRedeem = userPoints >= reward.cost;

    return (
        <div className={`reward-card ${canRedeem ? 'available' : 'locked'}`}>
            <div className="reward-image">{reward.image}</div>
            <h3 className="reward-title">{reward.title}</h3>
            <p className="reward-description">{reward.description}</p>
            <div className="reward-cost">
                Cost: <span className="cost-amount">{reward.cost} Points</span>
            </div>
            <button
                className={`redeem-btn ${canRedeem ? 'available' : 'disabled'}`}
                onClick={() => onRedeem(reward)}
                disabled={!canRedeem}
            >
                {canRedeem ? 'Redeem Now' : 'Not Enough Points'}
            </button>
        </div>
    );
}

export default RewardCard;