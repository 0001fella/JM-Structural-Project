// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check localStorage for existing session on initial load
  useEffect(() => {
    const user = localStorage.getItem('quantbuild_user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);
  
  // Login function
  const login = (email, password) => {
    // In a real app, this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = {
          id: 'user_12345',
          name: email.split('@')[0],
          email,
          role: 'admin'
        };
        setCurrentUser(user);
        localStorage.setItem('quantbuild_user', JSON.stringify(user));
        resolve(user);
      }, 800);
    });
  };
  
  // Signup function
  const signup = (name, email, password) => {
    // In a real app, this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          name,
          email,
          role: 'user'
        };
        setCurrentUser(user);
        localStorage.setItem('quantbuild_user', JSON.stringify(user));
        resolve(user);
      }, 1000);
    });
  };
  
  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('quantbuild_user');
  };
  
  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}