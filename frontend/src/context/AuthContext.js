import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      } catch (e) {
        console.error("Error parsing saved user:", e);
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    const jwtToken = data.token || data.jwt;
    const userData = {
      id: data.userId || data.id || 1,
      email: data.email || email,
      name: data.name || email.split('@')[0],
      firstName: data.name ? data.name.split(' ')[0] : 'User',
      lastName: data.name ? data.name.split(' ')[1] || '' : '',
      role: data.role || 'USER'
    };

    setToken(jwtToken);
    setUser(userData);

    localStorage.setItem('token', jwtToken);
    localStorage.setItem('user', JSON.stringify(userData));

    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    return data;
  };

  const logout = () => {
    try {
      authService.logout();
    } catch (err) {
      console.warn("Logout error:", err);
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateUser = (updatedUserData) => {
    const newUser = { ...user, ...updatedUserData };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
