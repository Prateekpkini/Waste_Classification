// src/pages/Profile.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Profile.css';

function Profile() {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...user });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        setError('');
        setMessage('');

        // Only send fields that exist in the 'profiles' table
        const { name, gender, country, date_of_birth, phone } = formData;
        const profileUpdates = { name, gender, country, date_of_birth, phone };

        try {
            await updateProfile(profileUpdates);
            setMessage('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({ ...user });
        setIsEditing(false);
        setError('');
        setMessage('');
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
                        <button className="save-btn" onClick={handleSave} disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button className="cancel-btn" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

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
                                    value={formData.name || ''}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{user.name}</p>
                            )}
                        </div>

                        <div className="info-group">
                            <label>Email</label>
                            <p>{user.email}</p>
                        </div>

                        <div className="info-group">
                            <label>Gender</label>
                            {isEditing ? (
                                <select
                                    name="gender"
                                    value={formData.gender || 'Other'}
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
                                    value={formData.country || ''}
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
                                    name="date_of_birth"
                                    value={formData.date_of_birth || ''}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{user.date_of_birth}</p>
                            )}
                        </div>

                        <div className="info-group">
                            <label>Phone Number</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone || ''}
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
                            <span className="stat-value">{user.plastic_recycled}</span>
                            <span className="stat-label">Plastic Items</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{user.metal_recycled}</span>
                            <span className="stat-label">Metal Items</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{user.plastic_recycled + user.metal_recycled}</span>
                            <span className="stat-label">Total Recycled</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;