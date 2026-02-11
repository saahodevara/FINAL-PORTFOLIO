
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Command, ArrowRight } from 'lucide-react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6">
      <nav className="glass-panel rounded-full px-4 py-3 flex items-center gap-4 shadow-2xl w-full max-w-4xl justify-between border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div>
              <Logo className="w-8 h-8" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white hidden sm:block">
              PORTFOLI<span className="text-[#ccff00]">.AI</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center bg-white/5 rounded-full p-1 gap-1">
          <NavLink to="/" active={isActive('/')} label="Home" />
          <NavLink to="/gallery" active={isActive('/gallery')} label="Showcase" />
          <NavLink to="/ats-analyzer" active={isActive('/ats-analyzer')} label="Analyzer" />
        </div>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link 
                to="/builder" 
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 tracking-wide ${isActive('/builder') ? 'bg-[#ccff00] text-black shadow-[0_0_20px_rgba(204,255,0,0.4)]' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                <Command className="w-3 h-3" /> BUILD
              </Link>
              <button onClick={handleLogout} className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-slate-400 transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="hidden sm:block px-4 py-2 text-xs font-bold text-white hover:text-[#ccff00] transition-colors uppercase tracking-wider">
                Log In
              </Link>
              <Link to="/signup" className="px-6 py-2.5 bg-white text-black rounded-full text-xs font-bold hover:bg-[#ccff00] transition-colors flex items-center gap-2 tracking-wide uppercase">
                Start <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>

      </nav>
    </div>
  );
};

const NavLink: React.FC<{ to: string, active: boolean, label: string }> = ({ to, active, label }) => (
  <Link 
    to={to} 
    className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 uppercase tracking-wide ${
      active 
        ? 'bg-white text-black' 
        : 'text-slate-400 hover:text-white'
    }`}
  >
    {label}
  </Link>
);

export default Navbar;
