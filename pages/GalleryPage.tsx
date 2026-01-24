
import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, X, ArrowLeft, Wand2 } from 'lucide-react';
import { DUMMY_GALLERY } from '../constants';
import { GalleryItem } from '../types';
import PortfolioView from '../components/PortfolioView';
import { useNavigate } from 'react-router-dom';

const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedDemo, setSelectedDemo] = useState<GalleryItem | null>(null);
  const navigate = useNavigate();

  const categories = ['All', 'Developer', 'Designer', 'Data Scientist', 'Marketing', 'Finance', 'Writing'];

  const filteredItems = DUMMY_GALLERY.filter(item => {
    const matchesFilter = filter === 'All' || item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                         item.tech.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Prevent body scroll when demo is open
  useEffect(() => {
    if (selectedDemo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedDemo]);

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto relative">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Professional Showcase</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">Explore high-fidelity portfolios built with Portfoli AI across the modern workforce.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text"
            placeholder="Search by name, role, or skill..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${filter === cat ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            onClick={() => setSelectedDemo(item)}
            className="group bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all cursor-pointer transform hover:-translate-y-2"
          >
            <div className="h-64 relative overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white text-slate-950 px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <ExternalLink className="w-4 h-4" /> Open Live Demo
                </div>
              </div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-blue-600 rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-lg shadow-blue-500/40">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl group-hover:text-blue-400 transition-colors mb-1">{item.name}</h3>
              <p className="text-sm text-slate-500 mb-6 font-medium">{item.title}</p>
              <div className="flex flex-wrap gap-2">
                {item.tech.slice(0, 3).map(t => (
                  <span key={t} className="text-[10px] bg-slate-800/50 text-slate-400 px-3 py-1 rounded-md uppercase font-bold border border-slate-700/50">
                    {t}
                  </span>
                ))}
                {item.tech.length > 3 && <span className="text-[10px] text-slate-600 font-bold">+{item.tech.length - 3}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Demo Modal */}
      {selectedDemo && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-slate-950 animate-in fade-in duration-500 overflow-y-auto overflow-x-hidden">
          {/* Modal Header */}
          <div className="sticky top-0 z-[110] bg-slate-950/80 backdrop-blur-2xl border-b border-slate-800 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <button 
                onClick={() => setSelectedDemo(null)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-all text-xs font-black uppercase tracking-widest"
              >
                <ArrowLeft className="w-4 h-4" /> Return to Gallery
              </button>
              
              <div className="flex items-center gap-6">
                <div className="hidden lg:flex items-center gap-3 text-[10px] text-slate-600 font-black tracking-widest">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                  STREAMING LIVE DEMO
                </div>
                <button 
                  onClick={() => navigate('/signup')}
                  className="bg-white hover:bg-slate-200 text-slate-950 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-xl"
                >
                  <Wand2 className="w-4 h-4 inline mr-2" /> Clone Template
                </button>
                <button 
                  onClick={() => setSelectedDemo(null)}
                  className="p-2 text-slate-500 hover:text-white transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>
            </div>
          </div>

          {/* Modal Content */}
          <div className="flex-1 bg-slate-950">
            <PortfolioView data={selectedDemo.fullData} category={selectedDemo.category} />
          </div>

          {/* Modal Footer */}
          <div className="bg-slate-900/50 border-t border-slate-800 py-16 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Want a site like this?</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">Generate your professional portfolio in seconds with our AI engine. No coding required.</p>
            <button 
              onClick={() => navigate('/signup')}
              className="bg-blue-600 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-2xl shadow-blue-500/20"
            >
              Build My Portfolio Now
            </button>
          </div>
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className="text-center py-32 bg-slate-900/20 border-2 border-slate-800 border-dashed rounded-[3rem] animate-in fade-in zoom-in">
          <p className="text-slate-500 font-mono">_NO_RESULTS_FOUND_</p>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
