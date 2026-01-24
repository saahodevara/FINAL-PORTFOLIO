
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Layout, LogOut, LogIn, UserPlus, Cpu } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-500 transition-colors">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-50">PORTFOLI <span className="text-blue-500">AI</span></span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/gallery" className="text-slate-400 hover:text-slate-50 transition-colors flex items-center gap-1.5">
              <Layout className="w-4 h-4" /> Gallery
            </Link>
            <Link to="/ats-analyzer" className="text-slate-400 hover:text-slate-50 transition-colors flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> ATS Analyzer
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link to="/builder" className="bg-slate-800 text-slate-50 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors">
                  My Builder
                </Link>
                <button onClick={handleLogout} className="text-slate-400 hover:text-slate-50 transition-colors p-2">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-slate-400 hover:text-slate-50 transition-colors px-4 py-2 flex items-center gap-2">
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link to="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
                  <UserPlus className="w-4 h-4" /> Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
