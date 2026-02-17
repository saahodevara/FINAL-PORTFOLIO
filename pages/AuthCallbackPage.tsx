
import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, Github, AlertTriangle } from 'lucide-react';

const AuthCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { handleGitHubCallback } = useAuth();
  const navigate = useNavigate();
  const processed = useRef(false);

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (processed.current) return;

    if (code) {
      processed.current = true;
      // handleGitHubCallback(code)
      //   .then(() => navigate('/builder'))
      //   .catch(() => navigate('/login?error=auth_failed'));
      console.log("GitHub callback code found:", code);
      navigate('/');
    } else if (error) {
      navigate('/login?error=' + error);
    }
  }, [searchParams, handleGitHubCallback, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-sm">
        <div className="relative inline-block">
          <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center border border-slate-800 shadow-2xl">
            <Github className="w-10 h-10 text-white animate-pulse" />
          </div>
          <div className="absolute -bottom-2 -right-2">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">Authenticating</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Synchronizing your GitHub profile data. This will only take a moment.
          </p>
        </div>

        <div className="pt-8 border-t border-slate-900">
          <div className="flex items-center justify-center gap-2 text-slate-600 text-xs font-mono">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            ESTABLISHING SECURE HANDSHAKE...
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
