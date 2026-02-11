
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, AlertCircle, Github, Loader2 } from 'lucide-react';
import Logo from '../components/Logo';

// Mock Google Icon
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
  </svg>
);

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { login, loginWithGitHub, loginWithGoogle, isLoading } = useAuth();
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

  const handleGoogleLogin = () => {
    setIsRedirecting(true);
    loginWithGoogle();
    // Simulate redirection delay handled in context, but adding listener/effect here if needed
    // In this mock, context updates isLoggedIn which triggers effect or navigation elsewhere 
    // But since context is async in mock, we wait.
    setTimeout(() => {
       navigate('/builder');
    }, 1600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20 bg-[#080808] relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ccff00] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative z-10 backdrop-blur-xl">
        
        <div className="flex justify-center mb-10">
          <div className="scale-150">
            <Logo className="w-12 h-12" />
          </div>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="font-display font-black text-4xl text-white uppercase tracking-tighter mb-2">Welcome Back</h1>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Access your terminal</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-xs font-bold uppercase tracking-wide animate-in fade-in zoom-in duration-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="space-y-4 mb-8">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading || isRedirecting}
            className="w-full py-4 bg-white text-black hover:bg-slate-200 rounded-xl font-bold flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-xs disabled:opacity-70 disabled:cursor-wait"
          >
            {isRedirecting || isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <GoogleIcon className="w-4 h-4" />
                <span>Continue with Google</span>
              </>
            )}
          </button>

          <button
            onClick={handleGitHubLogin}
            disabled={isLoading || isRedirecting}
            className="w-full py-4 bg-[#24292e] text-white hover:bg-[#2f363d] rounded-xl font-bold flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-xs disabled:opacity-70 disabled:cursor-wait border border-white/10"
          >
            {isRedirecting || isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Github className="w-4 h-4" />
                <span>Continue with GitHub</span>
              </>
            )}
          </button>
          
          <div className="flex items-center gap-4 py-2 opacity-50">
            <div className="h-px flex-1 bg-white/20" />
            <span className="text-[10px] font-mono text-slate-500 uppercase">or login with email</span>
            <div className="h-px flex-1 bg-white/20" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#ccff00] transition-colors" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]/50 transition-all placeholder-slate-700 font-mono text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#ccff00] transition-colors" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]/50 transition-all placeholder-slate-700 font-mono text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isRedirecting}
            className="w-full py-4 bg-[#ccff00] hover:bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-xs disabled:opacity-50 mt-4"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="mt-10 text-center text-slate-500 text-xs font-mono">
          New to the platform?{' '}
          <Link to="/signup" className="text-white hover:text-[#ccff00] border-b border-transparent hover:border-[#ccff00] transition-all pb-0.5">Initialize Account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
