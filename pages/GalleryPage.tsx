
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

  const categories = ['All', 'Developer', 'Designer', 'Data Scientist', 'Product', 'Marketing', 'Finance', 'Writing'];

  const filteredItems = DUMMY_GALLERY.filter(item => {
    const matchesFilter = filter === 'All' || item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                         item.tech.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    if (selectedDemo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedDemo]);

  return (
    <div className="pt-32 pb-24 px-4 max-w-[90rem] mx-auto min-h-screen">
      
      {/* Editorial Header */}
      <div className="mb-20">
        <h1 className="font-display text-[8vw] leading-none font-black text-white uppercase mb-6">
          The <span className="text-[#ccff00]">Index</span>
        </h1>
        <div className="h-[1px] w-full bg-white/20 mb-8" />
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light">
          A curated collection of high-performance identities.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-6 mb-16 items-start">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                filter === cat 
                  ? 'bg-[#ccff00] text-black border-[#ccff00]' 
                  : 'bg-transparent text-slate-400 border-white/20 hover:border-white hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex-1 w-full md:w-auto relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text"
            placeholder="Search the archive..."
            className="w-full bg-[#111] border border-white/20 rounded-full py-3 pl-12 pr-6 text-white focus:outline-none focus:border-[#ccff00] transition-colors font-mono text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Bold Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedDemo(item)}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 border border-white/10">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              
              <div className="absolute top-4 left-4">
                 <span className="px-3 py-1 bg-black/50 backdrop-blur text-white border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                   {item.category}
                 </span>
              </div>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <div className="w-12 h-12 bg-[#ccff00] rounded-full flex items-center justify-center text-black">
                  <ExternalLink className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end border-b border-white/10 pb-4 group-hover:border-[#ccff00] transition-colors">
              <div>
                <h3 className="text-2xl font-display font-bold text-white mb-1 uppercase">{item.name}</h3>
                <p className="text-sm text-slate-500 font-mono">{item.title}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-[#ccff00] opacity-0 group-hover:opacity-100 transition-opacity">
                  VIEW_PROFILE
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Demo Modal */}
      {selectedDemo && (
        <div className="fixed inset-0 z-[100] bg-[#080808] animate-in fade-in duration-300 overflow-y-auto">
          <div className="sticky top-0 z-[110] bg-[#080808]/90 backdrop-blur-md border-b border-white/10 p-4">
            <div className="max-w-[90rem] mx-auto flex items-center justify-between">
              <button 
                onClick={() => setSelectedDemo(null)}
                className="flex items-center gap-2 text-white hover:text-[#ccff00] text-xs font-bold uppercase tracking-widest"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Index
              </button>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/signup')}
                  className="px-6 py-2 bg-[#ccff00] hover:bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest transition-all"
                >
                  Clone This
                </button>
                <button onClick={() => setSelectedDemo(null)}>
                  <X className="w-6 h-6 text-white hover:text-red-500 transition-colors" />
                </button>
              </div>
            </div>
          </div>
          <div className="min-h-screen">
            <PortfolioView data={selectedDemo.fullData} category={selectedDemo.category} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
