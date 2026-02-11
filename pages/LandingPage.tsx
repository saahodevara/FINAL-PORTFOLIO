
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Zap, ShieldCheck, ArrowRight, Code, Palette, Search, Globe, ChevronRight, Star } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#080808]">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ccff00] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-[90rem] mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-[#ccff00] text-xs font-bold uppercase tracking-widest mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Star className="w-3 h-3 fill-current" />
            AI-POWERED PORTFOLIO BUILDER
          </div>
          
          <h1 className="font-display text-[12vw] leading-[0.85] font-black text-white uppercase tracking-tighter mix-blend-difference mb-12 animate-in fade-in zoom-in duration-1000">
            CREATE <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-500">YOUR</span> <span className="outline-text text-transparent" style={{ WebkitTextStroke: '2px #ccff00' }}>MYTH</span>
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-12 delay-300 duration-1000">
            <Link 
              to="/signup" 
              className="px-10 py-5 bg-[#ccff00] hover:bg-white text-black rounded-full font-display text-lg font-black uppercase tracking-wide hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_40px_rgba(204,255,0,0.3)]"
            >
              Start Building <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/gallery" 
              className="px-10 py-5 bg-transparent border border-white/20 text-white rounded-full font-display text-lg font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-all"
            >
              View Examples
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* MARQUEE SEPARATOR */}
      <div className="py-12 bg-[#ccff00] text-black overflow-hidden border-y border-black rotate-1 scale-105 origin-left">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
          {Array(10).fill(0).map((_, i) => (
            <span key={i} className="text-6xl font-display font-black uppercase flex items-center gap-8">
              Github Sync <span className="w-4 h-4 bg-black rounded-full" /> 
              ATS Optimized <span className="w-4 h-4 bg-black rounded-full" />
              Instant Deploy <span className="w-4 h-4 bg-black rounded-full" />
            </span>
          ))}
        </div>
      </div>

      {/* STACKING CARDS SECTION */}
      <div className="relative py-32 px-4 max-w-7xl mx-auto space-y-32">
        
        {/* Card 1 */}
        <div className="sticky top-32 bg-[#111] border border-white/10 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center shadow-2xl overflow-hidden group">
          <div className="flex-1 z-10">
            <div className="w-16 h-16 bg-[#ccff00]/10 rounded-2xl flex items-center justify-center mb-8">
               <Zap className="w-8 h-8 text-[#ccff00]" />
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">LIGHTNING<br/>FAST</h2>
            <p className="text-xl text-slate-400 leading-relaxed max-w-md">
              Don't waste hours tweaking CSS. Our AI engine builds a production-ready site from your raw data in milliseconds.
            </p>
          </div>
          <div className="flex-1 w-full aspect-square bg-[#ccff00] rounded-[2rem] relative overflow-hidden group-hover:scale-95 transition-transform duration-700">
             <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" alt="Speed" className="object-cover w-full h-full opacity-50 mix-blend-multiply" />
             <div className="absolute inset-0 flex items-center justify-center">
               <span className="font-display font-black text-9xl text-black opacity-20">01</span>
             </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="sticky top-40 bg-[#ececec] text-black border border-white/10 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row-reverse gap-12 items-center shadow-2xl overflow-hidden group">
          <div className="flex-1 z-10">
            <div className="w-16 h-16 bg-black/10 rounded-2xl flex items-center justify-center mb-8">
               <Github className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">GITHUB<br/>SYNCED</h2>
            <p className="text-xl text-slate-600 leading-relaxed max-w-md">
              Your code speaks for itself. We automatically pull your best repositories, readmes, and tech stacks into a visual showcase.
            </p>
          </div>
          <div className="flex-1 w-full aspect-square bg-black rounded-[2rem] relative overflow-hidden group-hover:scale-95 transition-transform duration-700">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80')] bg-cover opacity-60" />
             <div className="absolute inset-0 flex items-center justify-center">
               <span className="font-display font-black text-9xl text-white opacity-20">02</span>
             </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="sticky top-48 bg-[#ccff00] text-black border border-white/10 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center shadow-2xl overflow-hidden group">
          <div className="flex-1 z-10">
            <div className="w-16 h-16 bg-black/10 rounded-2xl flex items-center justify-center mb-8">
               <ShieldCheck className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">ATS<br/>READY</h2>
            <p className="text-xl text-slate-800 leading-relaxed max-w-md">
              Beat the bots. Our built-in analyzer ensures your portfolio and resume text hit every keyword required for your dream role.
            </p>
          </div>
          <div className="flex-1 w-full aspect-square bg-white rounded-[2rem] relative overflow-hidden group-hover:scale-95 transition-transform duration-700">
             <div className="absolute inset-0 flex items-center justify-center">
               <span className="font-display font-black text-9xl text-black opacity-10">03</span>
             </div>
             <div className="absolute inset-0 grid grid-cols-2 gap-2 p-4 opacity-50">
                <div className="bg-black/5 rounded-xl animate-pulse" />
                <div className="bg-black/5 rounded-xl animate-pulse delay-100" />
                <div className="bg-black/5 rounded-xl animate-pulse delay-200" />
                <div className="bg-black/5 rounded-xl animate-pulse delay-300" />
             </div>
          </div>
        </div>

      </div>

      {/* FINAL CTA */}
      <section className="py-40 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#111] -z-10" />
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-9xl font-display font-black text-white mb-12 uppercase leading-[0.8]">
            Don't Just <br/> <span className="text-[#ccff00]">Exist.</span>
          </h2>
          <Link to="/signup" className="inline-flex items-center gap-4 px-12 py-6 bg-white hover:bg-[#ccff00] text-black rounded-full font-display font-black text-xl uppercase tracking-widest transition-all hover:scale-105">
            Launch Now
          </Link>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
