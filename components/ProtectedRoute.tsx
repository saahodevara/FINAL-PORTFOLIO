
import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, Mail, LogOut, ArrowRight, RefreshCw } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoggedIn, isLoading, resendVerification, logout } = useAuth();
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#ccff00] animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Verification Check
  if (user && !user.emailVerified) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-[2rem] p-10 text-center relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ccff00] to-transparent opacity-20" />

          <div className="w-20 h-20 bg-[#ccff00]/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Mail className="w-10 h-10 text-[#ccff00]" />
          </div>

          <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-4">
            Verify Your <span className="text-[#ccff00]">Identity</span>
          </h2>

          <p className="text-slate-400 font-mono text-xs leading-relaxed mb-10 text-center uppercase tracking-widest">
            We've sent a secure link to <span className="text-white">{user.email}</span>. Please verify your account to unlock the builder.
          </p>

          <div className="space-y-4">
            <button
              onClick={async () => {
                setSending(true);
                await resendVerification();
                setSending(false);
                setSent(true);
              }}
              disabled={sending || sent}
              className="w-full py-4 bg-white text-black hover:bg-[#ccff00] rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {sending ? <RefreshCw className="w-4 h-4 animate-spin" /> : sent ? "LINK_DISPATCHED" : "RESEND_ENCRYPTED_LINK"}
              {!sending && !sent && <ArrowRight className="w-4 h-4" />}
            </button>

            <button
              onClick={logout}
              className="w-full py-4 bg-transparent border border-white/10 text-slate-500 hover:text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5">
            <p className="text-[10px] font-mono text-slate-600 uppercase">Status: Awaiting Verification Protocol</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
