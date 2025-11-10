// src/pages/Profile.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Profile.css';

function Profile() {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...user });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        updateProfile(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({ ...user });
        setIsEditing(false);
    };

    return (
        <div className="profile">
            <div className="profile-header">
                <h1>User Profile</h1>
                {!isEditing ? (
                    <button
                        className="edit-btn"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Profile
                    </button>
                ) : (
                    <div className="edit-actions">
                        <button className="save-btn" onClick={handleSave}>
                            Save Changes
                        </button>
                        <button className="cancel-btn" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            <div className="profile-content">
                <div className="profile-card">
                    <h2>Personal Information</h2>
                    <div className="profile-info">
                        <div className="info-group">
                            <label>Full Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{user.name}</p>
                            )}
                        </div>

                        <div className="info-group">
                            <label>Email</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{user.email}</p>
                            )}
                        </div>

                        <div className="info-group">
                            <label>Gender</label>
                            {isEditing ? (
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            ) : (
                                <p>{user.gender}</p>
                            )}
                        </div>

                        <div className="info-group">
                            <label>Country</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{user.country}</p>
                            )}
                        </div>

                        <div className="info-group">
                            <label>Date of Birth</label>
                            {isEditing ? (
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{user.dateOfBirth}</p>
                            )}
                        </div>

                        <div className="info-group">
                            <label>Phone Number</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{user.phone}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="stats-card">
                    <h2>Your Recycling Stats</h2>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-value">{user.points}</span>
                            <span className="stat-label">Total Points</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{user.plasticRecycled}</span>
                            <span className="stat-label">Plastic Items</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{user.metalRecycled}</span>
                            <span className="stat-label">Metal Items</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{user.plasticRecycled + user.metalRecycled}</span>
                            <span className="stat-label">Total Recycled</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;