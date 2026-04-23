import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  name?: string;
  email?: string;
  id?: string;
  location?: string;      // Add this!
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check if Google passed a token in the URL
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');

    if (urlToken) {
      localStorage.setItem('token', urlToken);
      // Clean up the URL so the token isn't visible
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // 2. Fetch the user profile using the token
    const token = localStorage.getItem('token');

    if (token) {
      fetch(`${import.meta.env.VITE_BACKEND_URI}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}` // Pass JWT in header
        }
      })
        .then(res => res.ok ? res.json() : Promise.reject('Invalid token'))
        .then(data => setUser(data))
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    // Reloading ensures the useEffect runs and fetches the user
    window.location.href = '/home'; 
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/'; // Kick to login page
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};