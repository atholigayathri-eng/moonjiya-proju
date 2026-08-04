import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { auth } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        if (savedUser && savedToken) {
          try {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
          } catch (e) {
            console.error("Error parsing saved user:", e);
          }
        }
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
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
    await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    const data = await authService.register(userData);
    return data;
  };

  const logout = async () => {
    try {
      await signOut(auth);
      await authService.logout();
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

