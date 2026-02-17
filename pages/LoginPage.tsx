
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, AlertCircle, Loader2, Sparkles, Cpu } from 'lucide-react';
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
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isGoogleHandshaking, setIsGoogleHandshaking] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);
    try {
      await login(email, password);
      navigate('/builder');
    } catch (err: any) {
      setError('Invalid Credentials(email / password)');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsGoogleHandshaking(true);
    try {
      await loginWithGoogle();
      navigate('/builder');
    } catch (err: any) {
      setError('pop up closed! Retry');
      setIsGoogleHandshaking(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20 bg-[#080808] relative overflow-hidden">

      {/* Handshaking Overlay */}
      {isGoogleHandshaking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-2xl animate-in fade-in duration-500">
          <div className="max-w-md w-full px-10 text-center space-y-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-[#ccff00] opacity-20 blur-3xl animate-pulse" />
              <Logo className="w-24 h-24 relative animate-bounce" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter flex items-center justify-center gap-3">
                <Sparkles className="w-6 h-6 text-[#ccff00]" /> Auth Protocol
              </h2>
              <p className="text-[#ccff00] font-mono text-[10px] font-bold uppercase tracking-[0.5em] animate-pulse">
                Handshaking with Google Systems...
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="h-1 w-24 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#ccff00] w-1/2 animate-[progress_2s_infinite]" />
              </div>
            </div>
            <style>{`
              @keyframes progress {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(200%); }
              }
            `}</style>
          </div>
        </div>
      )}

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

        <div className="space-y-4 mb-8">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoggingIn || isGoogleHandshaking}
            className="w-full py-4 bg-white text-black hover:bg-slate-200 rounded-xl font-bold flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-xs disabled:opacity-70"
          >
            <GoogleIcon className="w-4 h-4" />
            <span>Continue with Google</span>
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
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]/50 transition-all placeholder:text-slate-700 font-mono text-sm"
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
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]/50 transition-all placeholder:text-slate-700 font-mono text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoggingIn || isGoogleHandshaking}
            className="w-full py-4 bg-[#ccff00] hover:bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-xs disabled:opacity-50 mt-4"
          >
            {isLoggingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-[10px] font-bold uppercase tracking-wide animate-in fade-in zoom-in duration-300 leading-relaxed text-center justify-center">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              {error}
            </div>
          )}
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
