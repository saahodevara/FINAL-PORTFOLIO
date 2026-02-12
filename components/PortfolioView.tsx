
import React, { useState, useEffect } from 'react';
import { PortfolioData } from '../types';
import { Github, Linkedin, Mail, ExternalLink, Code, Palette, Zap, Menu, X, ArrowUp } from 'lucide-react';

interface PortfolioViewProps {
  data: PortfolioData;
  category?: string;
  isPreview?: boolean;
}

const PortfolioView: React.FC<PortfolioViewProps> = ({ data, category = 'Developer', isPreview = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // If in preview mode, we listen to the specific container scroll
    const handleScroll = () => {
      if (isPreview) {
        const container = document.getElementById('preview-container');
        if (container) {
          setIsScrolled(container.scrollTop > 50);
        }
      } else {
        setIsScrolled(window.scrollY > 50);
      }
    };

    if (isPreview) {
      const container = document.getElementById('preview-container');
      container?.addEventListener('scroll', handleScroll);
      return () => container?.removeEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isPreview]);

  // Theme Configuration Mapping
  const getThemeStyles = () => {
    switch (category) {
      case 'Designer':
        return {
          container: "bg-[#050505] font-sans selection:bg-pink-500/30",
          header: "text-center animate-in fade-in zoom-in duration-1000",
          card: "group bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:scale-[1.01] transition-all duration-500",
          accent: "text-pink-400",
          button: "bg-pink-500 text-white hover:bg-pink-400",
          icon: <Palette className="w-4 h-4" />,
          nav: "glass-panel"
        };
      case 'Marketing':
        return {
          container: "bg-slate-950 font-sans selection:bg-orange-500/30",
          header: "text-left animate-in slide-in-from-left-20 duration-700",
          card: "group bg-slate-900 border border-slate-800 rounded-2xl hover:-translate-y-1 transition-all duration-300",
          accent: "text-orange-400",
          button: "bg-orange-500 text-white hover:bg-orange-400",
          icon: <Zap className="w-4 h-4" />,
          nav: "bg-slate-950/80 backdrop-blur-md border-b border-slate-800"
        };
      default: // Developer (Nfinite Theme)
        return {
          container: "bg-[#050505] font-sans text-slate-200 selection:bg-white/20",
          header: "text-left animate-in slide-in-from-bottom-10 duration-500",
          card: "group bg-[#0a0a0a] border border-white/10 hover:border-white/30 transition-all rounded-xl relative overflow-hidden",
          accent: "text-white",
          button: "bg-white text-black hover:bg-slate-200",
          icon: <Code className="w-4 h-4" />,
          nav: "glass-panel border-b border-white/5"
        };
    }
  };

  const theme = getThemeStyles();
  const isDark = true;

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Experience', href: '#experience' },
  ];

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isPreview) {
      document.getElementById('preview-container')?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Adjust Navbar positioning strategy for Preview Mode
  // In Preview Mode (inside a scrolling div), 'fixed' positions relative to viewport (bad).
  // 'sticky' positions relative to scrolling container (good).
  // We use negative margin to allow content to flow under the glassy nav.
  const navPositionClass = isPreview ? 'sticky top-0 mb-[-80px]' : 'fixed top-0 left-0 right-0';

  return (
    <div className={`w-full min-h-screen pb-24 ${theme.container} transition-colors duration-1000 scroll-smooth relative`}>
      {/* Background Grid for Developer Theme */}
      {category === 'Developer' && (
         <div className="absolute inset-0 z-0 pointer-events-none bg-grid opacity-50 fixed" />
      )}

      {/* Internal Portfolio Header */}
      <nav 
        className={`${navPositionClass} z-[120] transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}
      >
        <div className={`max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'bg-black/60 backdrop-blur-xl border border-white/10 rounded-full py-3 px-6' : ''}`}>
          <a 
            href="#" 
            onClick={scrollToTop}
            className={`text-lg font-bold tracking-tight flex items-center gap-2 text-white`}
          >
            {category === 'Developer' && <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>}
            {data.name?.split(' ')[0] || 'Portfolio'}
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-[10px] font-mono uppercase tracking-widest transition-all hover:text-white ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${theme.button}`}
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            className={`md:hidden p-2 text-white`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-4 right-4 mt-2 bg-[#111] border border-white/10 rounded-2xl p-4 flex flex-col gap-4 shadow-2xl">
             {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 text-xs font-mono uppercase text-slate-400 hover:text-white hover:bg-white/5 rounded-lg"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      <div id="main-content" className={`max-w-6xl mx-auto px-6 pt-32 relative z-10`}>
        
        {/* Hero Section */}
        <header className={`py-20 lg:py-32 px-4 ${theme.header}`}>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded border border-white/10 mb-8 text-[10px] font-mono uppercase tracking-widest text-slate-400 bg-white/5`}>
            {theme.icon} {category} // {data.purpose}
          </div>
          <h1 className={`text-6xl md:text-9xl font-bold mb-8 tracking-tighter leading-none text-white`}>
            {data.name || 'Anonymous'}
          </h1>
          <p className={`text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl leading-relaxed font-light`}>
            {data.title || 'Professional Specialist'}
          </p>
          <div className="flex gap-4 justify-start">
            {[
              { Icon: Github, label: 'GitHub' },
              { Icon: Linkedin, label: 'LinkedIn' },
              { Icon: Mail, label: 'Email' }
            ].map(({Icon, label}, i) => (
              <a 
                key={i} 
                href="#" 
                className={`p-4 rounded-full border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all`}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </header>

        {/* Dynamic Layout Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          
          {/* Main Content */}
          <main className="lg:col-span-8 space-y-32">
            
            {/* Bio Section */}
            <section id="about" className="scroll-mt-32">
              <h2 className={`text-[10px] font-mono uppercase tracking-widest mb-8 text-slate-500`}>
                01 // INTRODUCTION
              </h2>
              <p className={`text-2xl md:text-4xl text-white leading-tight font-medium`}>
                {data.bio || 'Ready to innovate and collaborate on next-generation solutions.'}
              </p>
              
              {data.skills && data.skills.length > 0 && (
                <div className="mt-12">
                   <h3 className="text-[10px] font-mono uppercase tracking-widest mb-4 text-slate-600">Competencies</h3>
                   <div className="flex flex-wrap gap-2">
                     {data.skills.map(skill => (
                       <span key={skill} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-mono text-slate-300">
                         {skill}
                       </span>
                     ))}
                   </div>
                </div>
              )}
            </section>

            {/* Projects Grid */}
            <section id="work" className="scroll-mt-32">
              <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-4">
                <h2 className={`text-[10px] font-mono uppercase tracking-widest text-slate-500`}>
                  02 // SELECTED WORKS
                </h2>
                <span className="text-[10px] font-mono text-slate-600">INDEX OF {data.projects.length} ITEMS</span>
              </div>
              
              <div className="space-y-24">
                {data.projects.map((proj, i) => (
                  <article key={proj.id} className="group">
                    <div className={`${theme.card} aspect-[16/9] mb-8 relative`}>
                      <img 
                        src={proj.imageUrl} 
                        alt={proj.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-sm">
                        <span className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-white border border-white px-4 py-2 rounded-full">
                          View Case Study <ExternalLink className="w-3 h-3"/>
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-3xl font-bold text-white group-hover:underline decoration-1 underline-offset-4">
                          {proj.name}
                        </h3>
                        <span className="text-xs font-mono text-slate-500">0{i + 1}</span>
                      </div>
                      <p className="text-slate-400 text-lg mb-6 max-w-2xl leading-relaxed">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {proj.techStack.map(tag => (
                          <span key={tag} className="text-[10px] px-3 py-1 border border-white/10 text-slate-400 rounded-full font-mono uppercase">
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
          <aside className="lg:col-span-4 space-y-24">
             <section id="experience" className="scroll-mt-32">
                <h2 className={`text-[10px] font-mono uppercase tracking-widest mb-12 text-slate-500 border-b border-white/10 pb-4`}>
                  03 // EXPERIENCE LOG
                </h2>
                <div className="space-y-12">
                  {data.experiences.map((exp) => (
                    <div key={exp.id} className="group">
                      <span className="text-[10px] font-mono text-slate-500 block mb-2">{exp.duration}</span>
                      <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                      <p className={`text-xs font-mono text-slate-400 mb-4 uppercase tracking-wider`}>@ {exp.company}</p>
                      <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-300 transition-colors">{exp.description}</p>
                    </div>
                  ))}
                </div>
             </section>

             <section 
               id="contact" 
               className={`p-8 bg-white/5 border border-white/10 rounded-2xl sticky top-32`}
             >
                <h3 className="font-bold text-xl mb-4 text-white">Initialize Contact</h3>
                <p className="text-sm text-slate-400 mb-8 leading-relaxed">Open for opportunities. Let's build something scalable.</p>
                <button 
                  className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${theme.button}`}
                >
                  Send Message
                </button>
             </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PortfolioView;
