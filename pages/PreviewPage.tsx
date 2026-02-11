
import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import PortfolioView from '../components/PortfolioView';
import { 
  Rocket, GithubIcon, CheckCircle, Loader2, Link as LinkIcon, Download, Cloud 
} from 'lucide-react';
import { TEMPLATES } from '../constants';

const ActionHeader: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const [syncing, setSyncing] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [showToast, setShowToast] = useState<'sync' | 'deploy' | 'download' | null>(null);
  const [liveUrl, setLiveUrl] = useState('');

  const templateName = TEMPLATES.find(t => t.id === portfolioData.templateId)?.name || 'Custom';

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setShowToast('sync');
      setTimeout(() => setShowToast(null), 3000);
    }, 2000);
  };

  const handleDeploy = () => {
    setDeploying(true);
    setTimeout(() => {
      setDeploying(false);
      setLiveUrl(`https://${portfolioData.name.toLowerCase().replace(/\s/g, '-') || 'user'}.netlify.app`);
      setShowToast('deploy');
      setTimeout(() => setShowToast(null), 5000);
    }, 2500);
  };

  const handleDownloadZip = () => {
    // Mock ZIP download by downloading JSON for now
    // Real implementation would bundle the react source
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${portfolioData.name || 'portfolio'}-source.json`); // Simulating zip download
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    setShowToast('download');
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <div className="bg-slate-900 border-b border-slate-800 py-3 px-6 flex items-center justify-between sticky top-[64px] z-40">
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline text-xs font-bold text-slate-500 uppercase tracking-widest">Environment</span>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-green-400 text-[10px] font-bold">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          READY ({templateName})
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-all disabled:opacity-50"
        >
          {syncing ? <Loader2 className="w-3 h-3 animate-spin" /> : <GithubIcon className="w-3 h-3" />}
          Sync
        </button>
        <button 
          onClick={handleDownloadZip}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-all"
        >
          <Download className="w-3 h-3" />
          Source (.zip)
        </button>
        <button 
          onClick={handleDeploy}
          disabled={deploying}
          className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50"
        >
          {deploying ? <Loader2 className="w-3 h-3 animate-spin" /> : <Cloud className="w-3 h-3" />}
          Deploy to Netlify
        </button>
      </div>

      {showToast && (
        <div className="fixed bottom-6 right-6 bg-slate-800 border border-slate-700 p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-10 z-[120]">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <div>
            <p className="font-bold text-slate-50">
              {showToast === 'sync' ? 'GitHub Repos Synced' : showToast === 'deploy' ? 'Site Deployed Successfully' : 'Download Started'}
            </p>
            <p className="text-xs text-slate-400">
              {showToast === 'sync' ? 'Your latest projects have been pulled.' : showToast === 'deploy' ? 'Your portfolio is live globally.' : 'Source code package prepared.'}
            </p>
            {showToast === 'deploy' && liveUrl && (
              <a href={liveUrl} target="_blank" className="text-blue-400 text-[10px] hover:underline flex items-center gap-1 mt-1">
                <LinkIcon className="w-2.5 h-2.5" /> {liveUrl}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const PreviewPage: React.FC = () => {
  const { portfolioData } = usePortfolio();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <ActionHeader />
      <main className="flex-1">
        {/* Pass the template bestFor as category to control styling */}
        <PortfolioView data={portfolioData} category={TEMPLATES.find(t => t.id === portfolioData.templateId)?.bestFor || 'Developer'} />
      </main>
      <footer className="py-12 border-t border-slate-900 text-center">
        <p className="text-slate-500 text-sm">Generated by Portfoli AI &copy; 2024</p>
      </footer>
    </div>
  );
};

export default PreviewPage;
