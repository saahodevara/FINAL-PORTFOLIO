
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, title: string, email: string) => void;
  loginWithGitHub: () => void;
  loginWithGoogle: () => void;
  handleGitHubCallback: (code: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Safe environment variable access
const getGitHubClientId = () => {
  try {
    return (typeof process !== 'undefined' && process.env?.VITE_GITHUB_CLIENT_ID) || 'mock_client_id';
  } catch (e) {
    return 'mock_client_id';
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('portfoli_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    const storedUser = localStorage.getItem('portfoli_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email === email) {
        setUser(parsedUser);
        setIsLoggedIn(true);
        return true;
      }
    }
    return false;
  };

  const signup = (name: string, title: string, email: string) => {
    const newUser: User = { id: Math.random().toString(36).substr(2, 9), name, title, email };
    localStorage.setItem('portfoli_user', JSON.stringify(newUser));
    setUser(newUser);
    setIsLoggedIn(true);
  };

  const loginWithGitHub = () => {
    const clientId = getGitHubClientId();
    // Use window.location.origin to ensure the callback returns to the correct host
    const redirectUri = window.location.origin + window.location.pathname + '#/auth/callback';
    const scope = 'read:user user:email repo';
    const state = Math.random().toString(36).substring(7);
    
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`;
    
    console.log('Redirecting to GitHub:', githubUrl);
    window.location.assign(githubUrl);
  };

  const loginWithGoogle = () => {
    // Mock Google Login for prototype
    setIsLoading(true);
    setTimeout(() => {
      const mockGoogleUser: User = {
        id: 'google_' + Math.random().toString(36).substr(2, 9),
        name: 'Google User',
        title: 'Product Creator',
        email: 'user@gmail.com'
      };
      localStorage.setItem('portfoli_user', JSON.stringify(mockGoogleUser));
      setUser(mockGoogleUser);
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleGitHubCallback = async (code: string) => {
    setIsLoading(true);
    try {
      // Simulation of Backend exchange:
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      const mockGitHubUser: User = {
        id: 'gh_' + Math.random().toString(36).substr(2, 9),
        name: 'GitHub User',
        title: 'Software Engineer',
        email: 'user@github.com'
      };
      
      localStorage.setItem('portfoli_user', JSON.stringify(mockGitHubUser));
      setUser(mockGitHubUser);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('GitHub Auth Failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('portfoli_user');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, login, signup, loginWithGitHub, loginWithGoogle, handleGitHubCallback, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
