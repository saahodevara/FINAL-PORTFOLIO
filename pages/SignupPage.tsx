
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Briefcase, ArrowRight, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import Logo from '../components/Logo';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    password: ''
  });
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSigningUp(true);
    try {
      await signup(formData.name, formData.title, formData.email, formData.password);
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Signup failed.');
      setIsSigningUp(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 pt-20 bg-[#080808]">
        <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-[2rem] p-12 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-[#ccff00]/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-[#ccff00]" />
          </div>
          <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-4">Verification Sent</h2>
          <p className="text-slate-400 font-mono text-xs leading-relaxed mb-10 uppercase tracking-widest text-center">
            Initialization successful. We've sent an activation link to <span className="text-white">{formData.email}</span>.
          </p>
          <Link
            to="/login"
            className="w-full py-4 bg-white text-black hover:bg-[#ccff00] rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2"
          >
            Access Login <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ccff00] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative z-10 backdrop-blur-xl">
        <div className="flex justify-center mb-10">
          <div className="scale-150">
            <Logo className="w-12 h-12" />
          </div>
        </div>
        <div className="text-center mb-12">
          <h1 className="font-display font-black text-4xl text-white uppercase tracking-tighter mb-2">Initialize</h1>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Create your identity</p>
        </div>
        {error && (
          <div className="mb-8 p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-xs font-bold uppercase tracking-wide animate-in fade-in zoom-in duration-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#ccff00] transition-colors" />
              <input
                type="text"
                required
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]/50 transition-all font-mono text-sm placeholder-slate-700"
                placeholder="John Doe"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Professional Title</label>
            <div className="relative group">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#ccff00] transition-colors" />
              <input
                type="text"
                required
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]/50 transition-all font-mono text-sm placeholder-slate-700"
                placeholder="Software Engineer"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#ccff00] transition-colors" />
              <input
                type="email"
                required
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]/50 transition-all font-mono text-sm placeholder-slate-700"
                placeholder="you@example.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
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
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]/50 transition-all font-mono text-sm placeholder-slate-700"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSigningUp}
            className="w-full py-4 bg-[#ccff00] hover:bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-xs mt-8 disabled:opacity-50"
          >
            {isSigningUp ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Launch Profile <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>
        <p className="mt-10 text-center text-slate-500 text-xs font-mono">
          Already initialized?{' '}
          <Link to="/login" className="text-white hover:text-[#ccff00] border-b border-transparent hover:border-[#ccff00] transition-all pb-0.5">Access Terminal</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
