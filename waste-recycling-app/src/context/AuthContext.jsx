// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in from localStorage
        const savedUser = localStorage.getItem('recyclingUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock authentication
        const mockUser = {
            id: 1,
            name: 'TEJAS TANDEL',
            email: 'Tejastandel2004@gmail.com',
            gender: 'Male',
            country: 'India',
            dateOfBirth: '2004-04-19',
            phone: '+918618305147',
            points: 750,
            plasticRecycled: 100,
            metalRecycled: 90,
            rank: 'Veteran Recycler'
        };

        if (email === mockUser.email && password === 'password') {
            setUser(mockUser);
            localStorage.setItem('recyclingUser', JSON.stringify(mockUser));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('recyclingUser');
    };

    const updateProfile = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('recyclingUser', JSON.stringify(updatedUser));
    };

    const value = {
        user,
        login,
        logout,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}