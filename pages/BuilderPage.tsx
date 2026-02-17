
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';
import {
  User, Briefcase, FolderKanban, Plus, Trash2, Github, Linkedin,
  ChevronRight, ChevronLeft, Eye, Wand2, Terminal, Layers, FileText,
  LayoutTemplate, Target, Sparkles, Check, X, ArrowRight
} from 'lucide-react';
import { TEMPLATES } from '../constants';
import { GoogleGenAI } from "@google/genai";
import { PortfolioPurpose } from '../types';
import { generatePortfolioBundle } from '../src/lib/generator/generator';
import { TEMPLATE_REGISTRY } from '../src/lib/generator/templates_registry';

// --- SCHEMA DEFINITIONS ---
// This allows the form to be dynamic and scalable.
const FORM_SCHEMA = {
  identity: {
    title: "Identity Protocol",
    fields: [
      { key: 'name', label: 'Display Name', type: 'text', placeholder: 'e.g. Alex Rivera' },
      { key: 'title', label: 'Professional Role', type: 'text', placeholder: 'e.g. Full Stack Engineer' },
      { key: 'email', label: 'Contact Email', type: 'email', placeholder: 'hello@example.com' },
      { key: 'github', label: 'GitHub Handle', type: 'text', placeholder: 'username', icon: <Github className="w-3 h-3" /> },
      { key: 'linkedin', label: 'LinkedIn', type: 'text', placeholder: 'profile-url', icon: <Linkedin className="w-3 h-3" /> },
    ]
  }
};

const PURPOSES: { id: PortfolioPurpose; label: string; desc: string }[] = [
  { id: 'Job Search', label: 'Employee / Fresher', desc: 'Secure your next role. Optimized for ATS and recruiters. Highlights education & experience.' },
  { id: 'Business', label: 'Business Portfolio', desc: 'Grow your company. Showcase services, brand story, and social presence.' },
];

const BuilderPage: React.FC = () => {
  const { portfolioData, updateBasics, addExperience, removeExperience, addProject, removeProject, selectTemplate, setPurpose, updateSkills } = usePortfolio();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Wizard State
  const [currentPhase, setCurrentPhase] = useState<'PURPOSE' | 'TEMPLATE' | 'BUILD'>('PURPOSE');
  const [buildStep, setBuildStep] = useState(1); // 1: Identity, 2: Skills, 3: History, 4: Projects

  // AI State
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<{ field: string, text: string } | null>(null);

  // Local Form State
  const [newExp, setNewExp] = useState({ company: '', role: '', duration: '', description: '' });
  const [newProj, setNewProj] = useState({ name: '', techStack: '', imageUrl: '', description: '', link: '' });
  const [skillInput, setSkillInput] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  // --- AI GENERATION LOGIC ---
  const generateWithAI = async (field: string, context: any = {}) => {
    setAiLoading(field);
    setAiSuggestion(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let prompt = "";
      const { purpose, title } = portfolioData;

      if (field === 'bio') {
        prompt = portfolioData.purpose === 'Business'
          ? `You are a professional brand strategist. Write a compelling, 3-sentence "About US" bio for a business named "${portfolioData.name}". 
             Goal: Win client trust. Tone: Corporate yet modern. Focus on service excellence.`
          : `You are a career coach. Write a professional, 3-sentence bio for a "${title}" whose goal is "${purpose}". 
             Tone: Confident, modern, and authentic. Focus on value proposition.`;
      } else if (field === 'skills') {
        prompt = portfolioData.purpose === 'Business'
          ? `List 12 comma-separated core services or expertise areas for a business named "${portfolioData.name}" in the "${title}" industry.
             Return ONLY the comma-separated list.`
          : `List 12 comma-separated technical and soft skills relevant for a "${title}" aiming for "${purpose}". 
             Return ONLY the comma-separated list, no numbering.`;
      } else if (field === 'exp_desc') {
        prompt = `Write a short, punchy description (2-3 sentences) for a role as "${context.role}" at "${context.company}". 
        Use action verbs. Optimize for a "${purpose}" portfolio.`;
      } else if (field === 'proj_desc') {
        prompt = `Describe a project named "${context.name}" built with "${context.techStack}". 
        Focus on the technical challenge and solution. Keep it under 40 words.`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      const text = response.text?.trim() || "";
      setAiSuggestion({ field, text });

    } catch (error) {
      console.error("AI Generation failed", error);
    } finally {
      setAiLoading(null);
    }
  };

  const acceptAiSuggestion = () => {
    if (!aiSuggestion) return;
    const { field, text } = aiSuggestion;

    if (field === 'bio') updateBasics({ bio: text });
    if (field === 'skills') {
      const newSkills = text.split(',').map(s => s.trim()).filter(Boolean);
      updateSkills([...new Set([...portfolioData.skills, ...newSkills])]);
    }
    if (field === 'exp_desc') setNewExp(prev => ({ ...prev, description: text }));
    if (field === 'proj_desc') setNewProj(prev => ({ ...prev, description: text }));

    setAiSuggestion(null);
  };

  // --- HANDLERS ---
  const handleAddSkill = () => {
    if (skillInput.trim()) {
      updateSkills([...portfolioData.skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    updateSkills(portfolioData.skills.filter(s => s !== skill));
  };

  const handleExport = async () => {
    if (!portfolioData.templateId) return;
    setIsExporting(true);
    try {
      // Find the master template files from registry
      const masterTemplate = TEMPLATE_REGISTRY.find(t => t.id === portfolioData.templateId)
        || TEMPLATE_REGISTRY[0]; // Fallback to first if not found in registry (demo safety)

      const zipBlob = await generatePortfolioBundle(portfolioData, masterTemplate.files);

      // Download Logic
      const url = window.URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${portfolioData.name.replace(/\s+/g, '_')}_Portfolio.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed", error);
    } finally {
      setIsExporting(false);
    }
  };

  // --- RENDERERS ---

  // PHASE 1: PURPOSE SELECTION
  if (currentPhase === 'PURPOSE') {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full text-[#ccff00] text-[10px] font-bold uppercase tracking-widest mb-6">
            <Target className="w-3 h-3" /> Step 1 / 3
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
            Define Your <span className="text-[#ccff00]">Mission</span>
          </h1>
          <p className="text-slate-400 font-mono text-sm max-w-xl mx-auto">
            Our AI adapts the tone, structure, and content suggestions based on your primary objective.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PURPOSES.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setPurpose(p.id);
                setCurrentPhase('TEMPLATE');
              }}
              className="group bg-[#111] border border-white/10 hover:border-[#ccff00] hover:bg-[#ccff00]/5 p-8 rounded-3xl text-left transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-[#ccff00] group-hover:text-black flex items-center justify-center mb-6 transition-colors">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2 uppercase group-hover:text-[#ccff00] transition-colors">{p.label}</h3>
              <p className="text-sm font-mono text-slate-500 leading-relaxed group-hover:text-slate-300">{p.desc}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // PHASE 2: TEMPLATE SELECTION
  if (currentPhase === 'TEMPLATE') {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <button onClick={() => setCurrentPhase('PURPOSE')} className="text-slate-500 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full text-[#ccff00] text-[10px] font-bold uppercase tracking-widest">
            <LayoutTemplate className="w-3 h-3" /> Step 2 / 3
          </div>
        </div>

        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
            Select Your <span className="text-[#ccff00]">Aesthetic</span>
          </h1>
          <p className="text-slate-400 font-mono text-sm">Choose a high-performance foundation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEMPLATES.map(template => (
            <div
              key={template.id}
              className="group bg-[#111] border border-white/10 rounded-[2rem] overflow-hidden hover:border-[#ccff00]/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(204,255,0,0.1)] flex flex-col"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-black">
                <img src={template.previewImage} alt={template.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="font-display font-bold text-2xl text-white uppercase mb-1">{template.name}</h3>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-mono text-slate-300 uppercase">{template.bestFor}</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
                  {template.description}
                </p>
                <button
                  onClick={() => {
                    selectTemplate(template.id);
                    setCurrentPhase('BUILD');
                  }}
                  className="w-full py-4 bg-white text-black hover:bg-[#ccff00] rounded-xl font-bold font-mono uppercase tracking-widest transition-all text-xs flex items-center justify-center gap-2"
                >
                  Use Template <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // PHASE 3: BUILDER FORM
  const steps = [
    { id: 1, label: 'Identity', icon: User },
    { id: 2, label: 'Skills', icon: Sparkles },
    { id: 3, label: 'History', icon: Briefcase },
    { id: 4, label: 'Projects', icon: FolderKanban }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-6xl mx-auto">

      {/* Builder Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <button onClick={() => setCurrentPhase('TEMPLATE')} className="text-[10px] font-mono text-slate-500 hover:text-white mb-2 flex items-center gap-1 uppercase tracking-widest">
            <ChevronLeft className="w-3 h-3" /> Change Template
          </button>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Portfolio Architect</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/preview')}
            className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-full text-xs font-bold hover:scale-105 transition-transform"
          >
            <Eye className="w-3 h-3" /> PREVIEW
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Navigation Sidebar */}
        <div className="lg:col-span-3">
          <div className="sticky top-32 space-y-2">
            {steps.filter(s => {
              if (portfolioData.purpose === 'Business') return s.id === 1;
              return true;
            }).map(s => (
              <button
                key={s.id}
                onClick={() => setBuildStep(s.id)}
                className={`w-full px-4 py-4 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-between group ${buildStep === s.id
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                  : 'bg-[#111] text-slate-500 hover:text-white border border-transparent hover:border-white/10'
                  }`}
              >
                <span className="flex items-center gap-3">
                  <s.icon className="w-4 h-4" /> {s.label}
                </span>
                {buildStep === s.id && <ChevronRight className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="lg:col-span-9">
          <div className="glass-panel rounded-3xl p-1 relative overflow-hidden min-h-[600px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20" />

            <div className="bg-[#050505] rounded-[22px] p-8 md:p-12 h-full">

              {/* STEP 1: IDENTITY */}
              {buildStep === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="border-b border-white/5 pb-4 mb-8">
                    <h2 className="text-lg font-mono font-bold text-white mb-1">IDENTITY_PROTOCOL</h2>
                    <p className="text-xs text-slate-500 font-mono">Core profile data.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Conditional Fields based on Purpose */}
                    {portfolioData.purpose === 'Business' ? (
                      <>
                        <div className="space-y-2">
                          <Label>Business Name</Label>
                          <Input
                            placeholder="e.g. Nexus Design Systems"
                            value={portfolioData.name || ''}
                            onChange={e => updateBasics({ name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Industry / Niche</Label>
                          <Input
                            placeholder="e.g. Creative Agency"
                            value={portfolioData.title || ''}
                            onChange={e => updateBasics({ title: e.target.value })}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label>Display Name</Label>
                          <Input
                            placeholder="e.g. Alex Rivera"
                            value={portfolioData.name || ''}
                            onChange={e => updateBasics({ name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Professional Role</Label>
                          <Input
                            placeholder="e.g. Full Stack Engineer"
                            value={portfolioData.title || ''}
                            onChange={e => updateBasics({ title: e.target.value })}
                          />
                        </div>
                      </>
                    )}

                    <div className="space-y-2">
                      <Label>Contact Email</Label>
                      <Input
                        type="email"
                        placeholder="hello@example.com"
                        value={portfolioData.email || ''}
                        onChange={e => updateBasics({ email: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label><Github className="w-3 h-3 inline mr-1" /> GitHub</Label>
                        <Input
                          placeholder="username"
                          value={portfolioData.github || ''}
                          onChange={e => updateBasics({ github: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label><Linkedin className="w-3 h-3 inline mr-1" /> LinkedIn</Label>
                        <Input
                          placeholder="profile-url"
                          value={portfolioData.linkedin || ''}
                          onChange={e => updateBasics({ linkedin: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Instagram</Label>
                        <Input
                          placeholder="@username"
                          value={portfolioData.instagram || ''}
                          onChange={e => updateBasics({ instagram: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Twitter / X</Label>
                        <Input
                          placeholder="@username"
                          value={portfolioData.twitter || ''}
                          onChange={e => updateBasics({ twitter: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-2 relative">
                      <div className="flex justify-between items-end">
                        <Label>{portfolioData.purpose === 'Business' ? 'ABOUT THE BUSINESS' : 'PROFESSIONAL BIO'}</Label>
                        <button
                          onClick={() => generateWithAI('bio')}
                          disabled={!!aiLoading}
                          className="flex items-center gap-1.5 text-[10px] font-bold text-[#ccff00] hover:text-white uppercase tracking-widest transition-colors mb-2 disabled:opacity-50"
                        >
                          {aiLoading === 'bio' ? <span className="animate-pulse">Thinking...</span> : <><Wand2 className="w-3 h-3" /> AI GENERATE</>}
                        </button>
                      </div>

                      {aiSuggestion?.field === 'bio' && (
                        <div className="mb-4 p-4 bg-[#ccff00]/5 border border-[#ccff00]/20 rounded-xl animate-in zoom-in duration-300">
                          <p className="text-sm text-slate-200 mb-3 font-mono leading-relaxed">{aiSuggestion.text}</p>
                          <div className="flex gap-2">
                            <button onClick={acceptAiSuggestion} className="px-3 py-1.5 bg-[#ccff00] text-black text-[10px] font-bold rounded hover:bg-white uppercase tracking-wider flex items-center gap-2">
                              <Check className="w-3 h-3" /> Accept
                            </button>
                            <button onClick={() => setAiSuggestion(null)} className="px-3 py-1.5 bg-white/5 text-white text-[10px] font-bold rounded hover:bg-white/10 uppercase tracking-wider flex items-center gap-2">
                              <X className="w-3 h-3" /> Discard
                            </button>
                          </div>
                        </div>
                      )}

                      <textarea
                        rows={4}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg py-3 px-4 text-slate-200 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 font-mono text-sm transition-all resize-none"
                        placeholder="Briefly describe your expertise..."
                        value={portfolioData.bio}
                        onChange={e => updateBasics({ bio: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: SKILLS */}
              {buildStep === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="border-b border-white/5 pb-4 mb-8 flex justify-between items-end">
                    <div>
                      <h2 className="text-lg font-mono font-bold text-white mb-1">SKILL_MATRIX</h2>
                      <p className="text-xs text-slate-500 font-mono">Core competencies & technologies.</p>
                    </div>
                    <button
                      onClick={() => generateWithAI('skills')}
                      disabled={!!aiLoading || !portfolioData.title}
                      className="flex items-center gap-1.5 text-[10px] font-bold text-[#ccff00] hover:text-white uppercase tracking-widest transition-colors disabled:opacity-50"
                    >
                      {aiLoading === 'skills' ? <span className="animate-pulse">Analyzing...</span> : <><Wand2 className="w-3 h-3" /> AI SUGGEST</>}
                    </button>
                  </div>

                  {aiSuggestion?.field === 'skills' && (
                    <div className="mb-8 p-6 bg-[#ccff00]/5 border border-[#ccff00]/20 rounded-xl animate-in zoom-in duration-300">
                      <h3 className="text-[#ccff00] text-xs font-bold uppercase tracking-widest mb-4">AI Suggestions</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {aiSuggestion.text.split(',').map((s, i) => (
                          <span key={i} className="px-2 py-1 bg-black/20 text-slate-300 text-xs font-mono rounded border border-white/5">{s.trim()}</span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <button onClick={acceptAiSuggestion} className="px-4 py-2 bg-[#ccff00] text-black text-xs font-bold rounded hover:bg-white uppercase tracking-wider flex items-center gap-2">
                          <Check className="w-3 h-3" /> Add All Skills
                        </button>
                        <button onClick={() => setAiSuggestion(null)} className="px-4 py-2 bg-white/5 text-white text-xs font-bold rounded hover:bg-white/10 uppercase tracking-wider flex items-center gap-2">
                          <X className="w-3 h-3" /> Discard
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <Input
                        placeholder="Add a skill (e.g. React, Figma, SEO)"
                        value={skillInput}
                        onChange={e => setSkillInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAddSkill()}
                      />
                      <button
                        onClick={handleAddSkill}
                        className="px-6 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold uppercase text-xs tracking-wider"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {portfolioData.skills.map((skill, i) => (
                        <div key={i} className="group flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 hover:border-white/20 rounded-full text-sm font-mono text-slate-300 transition-all">
                          {skill}
                          <button onClick={() => handleRemoveSkill(skill)} className="text-slate-600 group-hover:text-red-400">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      {portfolioData.skills.length === 0 && (
                        <span className="text-slate-600 text-xs font-mono italic">No skills recorded yet.</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: EXPERIENCE */}
              {buildStep === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="border-b border-white/5 pb-4 mb-8">
                    <h2 className="text-lg font-mono font-bold text-white mb-1">EXPERIENCE_LOG</h2>
                    <p className="text-xs text-slate-500 font-mono">Career history.</p>
                  </div>

                  <div className="space-y-4 mb-12">
                    {portfolioData.experiences.map(exp => (
                      <div key={exp.id} className="p-6 bg-white/5 border border-white/5 rounded-xl flex justify-between items-start group hover:border-white/20 transition-all">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-white">{exp.role}</h3>
                            <span className="text-xs font-mono text-slate-500 bg-white/5 px-2 py-1 rounded">@{exp.company}</span>
                          </div>
                          <p className="text-xs font-mono text-slate-500 mb-3">{exp.duration}</p>
                          <p className="text-sm text-slate-400 max-w-2xl">{exp.description}</p>
                        </div>
                        <button onClick={() => removeExperience(exp.id)} className="text-slate-600 hover:text-red-500 transition-colors p-2">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 bg-[#0f0f0f] border border-white/5 rounded-xl space-y-4">
                    <h3 className="font-mono text-xs font-bold text-slate-400 uppercase mb-4">Add Entry</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Company" value={newExp.company} onChange={e => setNewExp({ ...newExp, company: e.target.value })} />
                      <Input placeholder="Role" value={newExp.role} onChange={e => setNewExp({ ...newExp, role: e.target.value })} />
                    </div>
                    <Input placeholder="Duration (e.g. 2021 - Present)" value={newExp.duration} onChange={e => setNewExp({ ...newExp, duration: e.target.value })} />

                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <Label>DESCRIPTION</Label>
                        <button
                          onClick={() => generateWithAI('exp_desc', { role: newExp.role, company: newExp.company })}
                          disabled={!!aiLoading || !newExp.role}
                          className="flex items-center gap-1.5 text-[10px] font-bold text-[#ccff00] hover:text-white uppercase tracking-widest transition-colors mb-2 disabled:opacity-50"
                        >
                          {aiLoading === 'exp_desc' ? <span className="animate-pulse">Thinking...</span> : <><Wand2 className="w-3 h-3" /> AI SUGGEST</>}
                        </button>
                      </div>

                      {aiSuggestion?.field === 'exp_desc' && (
                        <div className="mb-4 p-4 bg-[#ccff00]/5 border border-[#ccff00]/20 rounded-xl animate-in zoom-in duration-300">
                          <p className="text-sm text-slate-200 mb-3 font-mono leading-relaxed">{aiSuggestion.text}</p>
                          <div className="flex gap-2">
                            <button onClick={acceptAiSuggestion} className="px-3 py-1.5 bg-[#ccff00] text-black text-[10px] font-bold rounded hover:bg-white uppercase tracking-wider flex items-center gap-2">
                              <Check className="w-3 h-3" /> Accept
                            </button>
                            <button onClick={() => setAiSuggestion(null)} className="px-3 py-1.5 bg-white/5 text-white text-[10px] font-bold rounded hover:bg-white/10 uppercase tracking-wider flex items-center gap-2">
                              <X className="w-3 h-3" /> Discard
                            </button>
                          </div>
                        </div>
                      )}

                      <textarea
                        placeholder="Describe your achievements..."
                        rows={2}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg py-3 px-4 text-slate-200 focus:outline-none focus:border-white/30 font-mono text-sm"
                        value={newExp.description}
                        onChange={e => setNewExp({ ...newExp, description: e.target.value })}
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (newExp.company && newExp.role) {
                          addExperience({ ...newExp, id: Date.now().toString() });
                          setNewExp({ company: '', role: '', duration: '', description: '' });
                        }
                      }}
                      className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-white uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="w-3 h-3" /> Append
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: PROJECTS */}
              {buildStep === 4 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="border-b border-white/5 pb-4 mb-8">
                    <h2 className="text-lg font-mono font-bold text-white mb-1">PROJECT_INDEX</h2>
                    <p className="text-xs text-slate-500 font-mono">Case studies & portfolio items.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    {portfolioData.projects.map(proj => (
                      <div key={proj.id} className="p-4 bg-white/5 border border-white/5 rounded-xl relative group hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-white">{proj.name}</h3>
                          <button
                            onClick={() => removeProject(proj.id)}
                            className="text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-400 mb-3 line-clamp-2">{proj.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {proj.techStack.map(tag => (
                            <span key={tag} className="text-[10px] bg-black border border-white/10 text-slate-400 px-2 py-0.5 rounded font-mono uppercase">{tag}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 bg-[#0f0f0f] border border-white/5 rounded-xl space-y-4">
                    <h3 className="font-mono text-xs font-bold text-slate-400 uppercase">New Project</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Project Name" value={newProj.name} onChange={e => setNewProj({ ...newProj, name: e.target.value })} />
                      <Input placeholder="Tech Stack (comma separated)" value={newProj.techStack} onChange={e => setNewProj({ ...newProj, techStack: e.target.value })} />
                    </div>
                    <Input placeholder="Image URL" value={newProj.imageUrl} onChange={e => setNewProj({ ...newProj, imageUrl: e.target.value })} />
                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <Label>DESCRIPTION</Label>
                        <button
                          onClick={() => generateWithAI('proj_desc', { name: newProj.name, techStack: newProj.techStack })}
                          disabled={!!aiLoading || !newProj.name}
                          className="flex items-center gap-1.5 text-[10px] font-bold text-[#ccff00] hover:text-white uppercase tracking-widest transition-colors mb-2 disabled:opacity-50"
                        >
                          {aiLoading === 'proj_desc' ? <span className="animate-pulse">Thinking...</span> : <><Wand2 className="w-3 h-3" /> AI ENHANCE</>}
                        </button>
                      </div>

                      {aiSuggestion?.field === 'proj_desc' && (
                        <div className="mb-4 p-4 bg-[#ccff00]/5 border border-[#ccff00]/20 rounded-xl animate-in zoom-in duration-300">
                          <p className="text-sm text-slate-200 mb-3 font-mono leading-relaxed">{aiSuggestion.text}</p>
                          <div className="flex gap-2">
                            <button onClick={acceptAiSuggestion} className="px-3 py-1.5 bg-[#ccff00] text-black text-[10px] font-bold rounded hover:bg-white uppercase tracking-wider flex items-center gap-2">
                              <Check className="w-3 h-3" /> Accept
                            </button>
                            <button onClick={() => setAiSuggestion(null)} className="px-3 py-1.5 bg-white/5 text-white text-[10px] font-bold rounded hover:bg-white/10 uppercase tracking-wider flex items-center gap-2">
                              <X className="w-3 h-3" /> Discard
                            </button>
                          </div>
                        </div>
                      )}

                      <textarea
                        placeholder="Project Description"
                        rows={2}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg py-3 px-4 text-slate-200 focus:outline-none focus:border-white/30 font-mono text-sm"
                        value={newProj.description}
                        onChange={e => setNewProj({ ...newProj, description: e.target.value })}
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (newProj.name) {
                          addProject({
                            ...newProj,
                            id: Date.now().toString(),
                            techStack: newProj.techStack.split(',').map(s => s.trim()).filter(Boolean)
                          });
                          setNewProj({ name: '', techStack: '', imageUrl: '', description: '', link: '' });
                        }
                      }}
                      className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-white uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="w-3 h-3" /> Add Project
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-white/5 flex justify-between">
                <button
                  onClick={() => setBuildStep(prev => Math.max(1, prev - 1))}
                  disabled={buildStep === 1}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                {portfolioData.purpose === 'Business' ? (
                  <div className="flex gap-4">
                    <button
                      onClick={handleExport}
                      disabled={isExporting}
                      className="flex items-center gap-2 px-8 py-3 bg-white/10 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors disabled:opacity-50"
                    >
                      {isExporting ? <span className="animate-pulse text-[10px]">Generating...</span> : <><FileText className="w-4 h-4" /> Download ZIP</>}
                    </button>
                    <button
                      onClick={() => navigate('/preview')}
                      className="flex items-center gap-2 px-8 py-3 bg-[#ccff00] text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors shadow-[0_0_20px_rgba(204,255,0,0.3)]"
                    >
                      Finish & Preview <Eye className="w-4 h-4" />
                    </button>
                  </div>
                ) : buildStep < 4 ? (
                  <button
                    onClick={() => setBuildStep(prev => Math.min(4, prev + 1))}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors"
                  >
                    Next Step <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <button
                      onClick={handleExport}
                      disabled={isExporting}
                      className="flex items-center gap-2 px-8 py-3 bg-white/10 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors disabled:opacity-50"
                    >
                      {isExporting ? <span className="animate-pulse text-[10px]">Generating...</span> : <><FileText className="w-4 h-4" /> Download ZIP</>}
                    </button>
                    <button
                      onClick={() => navigate('/preview')}
                      className="flex items-center gap-2 px-8 py-3 bg-[#ccff00] text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors shadow-[0_0_200px_rgba(204,255,0,0.3)]"
                    >
                      Finish & Preview <Eye className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-[10px] font-mono font-bold text-slate-500 mb-2 uppercase tracking-widest">
    {children}
  </label>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg py-3 px-4 text-slate-200 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 font-mono text-sm transition-all placeholder:text-slate-700"
  />
);

export default BuilderPage;
