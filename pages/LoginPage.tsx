
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, AlertCircle, Github, Loader2 } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { login, loginWithGitHub, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/builder');
    } else {
      setError('Invalid email or password. Hint: Signup first!');
    }
  };

  const handleGitHubLogin = () => {
    setIsRedirecting(true);
    loginWithGitHub();
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-950">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-3xl rounded-full" />
        
        <div className="text-center mb-10 relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-slate-400">Securely access your portfolio dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm animate-in fade-in zoom-in duration-300">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="space-y-4 mb-8">
          <button
            onClick={handleGitHubLogin}
            disabled={isLoading || isRedirecting}
            className="w-full py-4 bg-[#24292f] hover:bg-[#1b1f23] text-white rounded-xl font-semibold flex items-center justify-center gap-3 transition-all border border-slate-800 hover:border-slate-700 shadow-xl group disabled:opacity-70 disabled:cursor-wait"
          >
            {isRedirecting || isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Github className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Continue with GitHub</span>
              </>
            )}
          </button>
          
          <div className="flex items-center gap-4 py-2">
            <div className="h-px flex-1 bg-slate-800" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">or</span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-slate-700"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-slate-700"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isRedirecting}
            className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-50 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all border border-slate-700 disabled:opacity-50"
          >
            Sign In with Email <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm">
          New here?{' '}
          <Link to="/signup" className="text-blue-500 hover:text-blue-400 font-medium">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
