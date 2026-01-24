
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Zap, ShieldCheck, ArrowRight, Code, Palette, Search } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-700 transition-all group">
    <div className="bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3 text-slate-50">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-32 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
            <SparkleIcon className="w-4 h-4 mr-2" />
            Empowering Careers with Generative AI
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Build Your Professional Portfolio in Under 60 Seconds
          </h1>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop struggling with templates. Let Portfoli AI handle the design and deployment while you focus on showcasing your best work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-500/20">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/gallery" className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all">
              View Showcase
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Engineered for Success</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Everything you need to land your next dream role, optimized for the modern recruiter.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Github className="w-6 h-6 text-blue-500" />}
              title="GitHub Sync"
              description="Automatically fetch your top repositories and showcase them with live tech tags and visual previews."
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-yellow-500" />}
              title="One-Click Deploy"
              description="Get a live production-ready URL in seconds. We handle the hosting, SSL, and global performance."
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-6 h-6 text-green-500" />}
              title="ATS Optimization"
              description="Built-in scoring tool to ensure your descriptions pass through Automated Tracking Systems flawlessly."
            />
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-24 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-12 text-slate-500 opacity-60">
             <div className="flex items-center gap-2"><Code className="w-5 h-5"/> Developer</div>
             <div className="flex items-center gap-2"><Palette className="w-5 h-5"/> Designer</div>
             <div className="flex items-center gap-2"><Search className="w-5 h-5"/> Analyst</div>
          </div>
        </div>
      </section>
    </div>
  );
};

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
  </svg>
);

export default LandingPage;
