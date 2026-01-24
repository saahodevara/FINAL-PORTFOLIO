
import React, { useState, useEffect } from 'react';
import { PortfolioData } from '../types';
import { Github, Linkedin, Mail, ExternalLink, Code, Palette, TrendingUp, Briefcase, Zap, BookOpen, Brain, Menu, X, ArrowUp } from 'lucide-react';

interface PortfolioViewProps {
  data: PortfolioData;
  category?: string;
}

const PortfolioView: React.FC<PortfolioViewProps> = ({ data, category = 'Developer' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme Configuration Mapping
  const getThemeStyles = () => {
    switch (category) {
      case 'Designer':
        return {
          container: "bg-[#050505] font-sans",
          header: "text-center animate-in fade-in zoom-in duration-1000",
          card: "group bg-slate-900/30 backdrop-blur-md border border-white/5 rounded-[3rem] overflow-hidden hover:scale-[1.02] transition-all duration-700 hover:shadow-2xl hover:shadow-pink-500/10",
          accent: "text-pink-400",
          button: "bg-pink-500 text-white",
          icon: <Palette className="w-4 h-4" />,
          nav: "bg-black/40 backdrop-blur-xl border-white/5"
        };
      case 'Marketing':
        return {
          container: "bg-slate-950 font-sans",
          header: "text-left animate-in slide-in-from-left-20 duration-700",
          card: "group bg-slate-900 border-none rounded-2xl hover:translate-y-[-8px] transition-all duration-300 shadow-xl hover:shadow-orange-500/20",
          accent: "text-orange-400",
          button: "bg-orange-500 text-white shadow-lg shadow-orange-500/20",
          icon: <Zap className="w-4 h-4" />,
          nav: "bg-orange-600/10 backdrop-blur-xl border-orange-500/20"
        };
      case 'Finance':
        return {
          container: "bg-white font-sans text-slate-900",
          header: "text-left animate-in slide-in-from-top-10 duration-500",
          card: "group bg-white border border-slate-200 rounded-none hover:border-blue-600 transition-colors shadow-sm",
          accent: "text-blue-700",
          button: "bg-blue-800 text-white",
          icon: <TrendingUp className="w-4 h-4" />,
          nav: "bg-white/90 backdrop-blur-md border-slate-200"
        };
      case 'Writing':
        return {
          container: "bg-[#fdfcfb] font-serif text-slate-800",
          header: "text-center max-w-3xl mx-auto py-32 animate-reveal",
          card: "group bg-transparent border-b border-slate-200 rounded-none pb-12 hover:border-slate-400 transition-all",
          accent: "text-indigo-600",
          button: "bg-indigo-600 text-white",
          icon: <BookOpen className="w-4 h-4" />,
          nav: "bg-[#fdfcfb]/90 backdrop-blur-sm border-slate-100"
        };
      case 'Data Scientist':
        return {
          container: "bg-[#0b0f1a] font-mono text-cyan-50",
          header: "text-left animate-in fade-in duration-1000",
          card: "group bg-[#111827] border border-cyan-900/30 rounded-lg hover:border-cyan-400 transition-all",
          accent: "text-cyan-400",
          button: "bg-cyan-600 text-white",
          icon: <Brain className="w-4 h-4" />,
          nav: "bg-[#0b0f1a]/90 backdrop-blur-xl border-cyan-900/20"
        };
      default: // Developer
        return {
          container: "bg-slate-950 font-mono",
          header: "text-left animate-in slide-in-from-bottom-10 duration-500",
          card: "group bg-slate-900 border border-slate-800 rounded-md hover:border-green-500/50 transition-all shadow-none hover:shadow-[0_0_30px_rgba(34,197,94,0.1)]",
          accent: "text-green-500",
          button: "bg-green-600 text-white",
          icon: <Code className="w-4 h-4" />,
          nav: "bg-slate-950/90 backdrop-blur-xl border-slate-800"
        };
    }
  };

  const theme = getThemeStyles();
  const isDark = category !== 'Finance' && category !== 'Writing';

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Experience', href: '#experience' },
  ];

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`w-full min-h-screen pb-24 ${theme.container} transition-colors duration-1000 scroll-smooth relative`}>
      {/* Skip to content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[200] bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">
        Skip to content
      </a>

      {/* Internal Portfolio Header */}
      <nav 
        aria-label="Portfolio Navigation"
        className={`fixed top-0 left-0 right-0 z-[120] transition-all duration-500 border-b ${isScrolled ? theme.nav + ' py-3 shadow-lg' : 'bg-transparent border-transparent py-8'}`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a 
            href="#" 
            onClick={scrollToTop}
            className={`text-2xl font-black tracking-tighter flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            <span className={theme.accent}>{category === 'Developer' ? '> ' : ''}</span>
            {data.name?.split(' ')[0] || 'Portfolio'}
            {category === 'Developer' ? <span className="animate-pulse">_</span> : ''}
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all hover:${theme.accent} focus:outline-none focus:text-blue-500 focus:underline decoration-2 underline-offset-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:scale-110 hover:shadow-xl active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${theme.button}`}
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
            aria-expanded={mobileMenuOpen}
            className={`md:hidden p-3 rounded-xl hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'text-white' : 'text-slate-900'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 border-b transition-all duration-300 transform ${mobileMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-4 opacity-0 invisible'} ${theme.nav} p-8 space-y-6 shadow-2xl`}
        >
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-center text-xs font-black uppercase tracking-[0.3em] transition-all hover:${theme.accent} ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`block w-full text-center py-5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl active:scale-95 transition-transform ${theme.button}`}
          >
            Get In Touch
          </a>
        </div>
      </nav>

      <div id="main-content" className={`max-w-6xl mx-auto px-6 pt-24`}>
        
        {/* Hero Section */}
        <header className={`py-32 px-4 ${theme.header}`}>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-current mb-10 text-[10px] font-black uppercase tracking-[0.3em] ${theme.accent} bg-opacity-10 animate-pulse`}>
            {theme.icon} {category} Portfolio
          </div>
          <h1 className={`text-7xl md:text-9xl font-black mb-10 tracking-tighter leading-[0.85] ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {data.name || 'Anonymous'}
          </h1>
          <p className={`text-2xl md:text-4xl ${isDark ? 'text-slate-400' : 'text-slate-500'} font-bold mb-14 max-w-3xl mx-auto leading-tight opacity-90`}>
            {data.title || 'Professional Specialist'}
          </p>
          <div className="flex gap-8 justify-center md:justify-start">
            {[
              { Icon: Github, label: 'GitHub Profile' },
              { Icon: Linkedin, label: 'LinkedIn Profile' },
              { Icon: Mail, label: 'Email Me' }
            ].map(({Icon, label}, i) => (
              <a 
                key={i} 
                href="#" 
                aria-label={label}
                className={`p-5 rounded-3xl border-2 ${isDark ? 'border-slate-800 text-slate-400 hover:text-white hover:border-white hover:bg-slate-900' : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-900 hover:bg-slate-50'} transition-all duration-500 hover:scale-110 active:scale-90 focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
              >
                <Icon className="w-7 h-7" />
              </a>
            ))}
          </div>
        </header>

        {/* Dynamic Layout Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          
          {/* Main Content */}
          <main className="lg:col-span-8 space-y-40">
            
            {/* Bio Section */}
            <section 
              id="about" 
              className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 scroll-mt-40 group"
            >
              <h2 className={`text-[11px] font-black uppercase tracking-[0.5em] mb-12 flex items-center gap-4 ${theme.accent}`}>
                <span className="w-8 h-[2px] bg-current opacity-30 group-hover:w-12 transition-all" />
                // Philosophy
              </h2>
              <p className={`text-3xl md:text-5xl ${isDark ? 'text-slate-100' : 'text-slate-800'} leading-[1.1] font-bold tracking-tight`}>
                {data.bio || 'Ready to innovate and collaborate on next-generation solutions.'}
              </p>
            </section>

            {/* Projects Grid */}
            <section 
              id="work" 
              className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 scroll-mt-40 group"
            >
              <div className="flex justify-between items-center mb-20">
                <h2 className={`text-[11px] font-black uppercase tracking-[0.5em] flex items-center gap-4 ${theme.accent}`}>
                  <span className="w-8 h-[2px] bg-current opacity-30 group-hover:w-12 transition-all" />
                  // Selected Work
                </h2>
                <div className={`h-px flex-1 ${isDark ? 'bg-slate-800' : 'bg-slate-200'} mx-8 hidden md:block`} />
              </div>
              <div className="grid gap-20">
                {data.projects.map((proj) => (
                  <article 
                    key={proj.id} 
                    className={`${theme.card} group overflow-hidden focus-within:ring-4 focus-within:ring-blue-500/50`}
                  >
                    <div className="aspect-[21/9] relative overflow-hidden">
                      <img 
                        src={proj.imageUrl} 
                        alt={`Screenshot of ${proj.name}`} 
                        className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
                      />
                      <div className={`absolute inset-0 ${isDark ? 'bg-slate-950/50' : 'bg-white/10'} group-hover:opacity-0 transition-opacity`} />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 text-white">
                           <ExternalLink className="w-8 h-8" />
                         </div>
                      </div>
                    </div>
                    <div className="p-12">
                      <div className="flex justify-between items-center mb-8">
                        <h3 className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'} group-hover:${theme.accent} transition-colors`}>
                          <a href={proj.link} target="_blank" rel="noopener noreferrer" className="focus:outline-none focus:underline decoration-4">
                            {proj.name}
                          </a>
                        </h3>
                        <ExternalLink className={`w-8 h-8 ${theme.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                      </div>
                      <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} mb-12 leading-relaxed text-xl max-w-3xl font-medium`}>
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        {proj.techStack.map(tag => (
                          <span key={tag} className={`text-[10px] px-5 py-2 ${isDark ? 'bg-slate-950/50 border-slate-800 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-600'} border-2 rounded-full font-black uppercase tracking-widest`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-24 animate-in fade-in slide-in-from-right-8 duration-700 delay-500">
             <section id="experience" className="scroll-mt-40 group">
                <h2 className={`text-[11px] font-black uppercase tracking-[0.5em] mb-14 flex items-center gap-4 ${theme.accent}`}>
                  <span className="w-8 h-[2px] bg-current opacity-30 group-hover:w-12 transition-all" />
                  // Career Path
                </h2>
                <div className="space-y-16">
                  {data.experiences.map((exp) => (
                    <div key={exp.id} className={`relative pl-12 border-l-2 ${isDark ? 'border-slate-800' : 'border-slate-200'} transition-colors hover:border-current group-hover:border-current`}>
                      <div className={`absolute top-0 -left-[9px] w-4 h-4 rounded-full ${theme.accent} bg-current animate-pulse shadow-lg shadow-current/20`} />
                      <span className={`text-xs font-black block mb-5 ${isDark ? 'text-slate-600' : 'text-slate-400'} tracking-[0.3em]`}>{exp.duration}</span>
                      <h3 className={`text-2xl font-black ${isDark ? 'text-slate-50' : 'text-slate-900'} mb-2 tracking-tight`}>{exp.role}</h3>
                      <p className={`${theme.accent} text-sm mb-6 font-black uppercase tracking-tight`}>{exp.company}</p>
                      <p className={`${isDark ? 'text-slate-500' : 'text-slate-600'} text-base leading-relaxed font-medium`}>{exp.description}</p>
                    </div>
                  ))}
                </div>
             </section>

             <section 
               id="contact" 
               className={`p-12 ${isDark ? 'bg-slate-900 border-slate-800 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]' : 'bg-slate-50 border-slate-200 shadow-2xl'} border-2 rounded-[3rem] scroll-mt-40 sticky top-40`}
             >
                <h3 className={`font-black text-3xl mb-8 tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Initiate Dialogue</h3>
                <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-10 leading-relaxed font-medium`}>I'm currently evaluating high-impact partnerships and ambitious senior roles globally.</p>
                <button 
                  className={`w-full py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all hover:scale-[1.03] active:scale-95 hover:shadow-2xl shadow-current/30 focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${theme.button}`}
                >
                  Transmit Message
                </button>
             </section>
          </aside>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {isScrolled && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className={`fixed bottom-10 right-10 p-5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-90 z-[100] animate-in fade-in slide-in-from-bottom-4 ${isDark ? 'bg-white text-slate-950' : 'bg-slate-950 text-white'}`}
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default PortfolioView;
