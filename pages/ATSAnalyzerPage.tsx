
import React, { useState, useRef } from 'react';
import { 
  Cpu, Target, RefreshCw, BarChart3, 
  Upload, FileText, ChevronDown, Sparkles 
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Engineer",
  "Data Scientist",
  "Product Designer",
  "Product Manager",
  "DevOps Engineer",
  "Cybersecurity Analyst",
  "Mobile Developer (React Native/Flutter)",
  "Machine Learning Engineer"
];

interface AnalysisResult {
  score: number;
  detectedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
  roleMatch: string;
}

const ATSAnalyzerPage: React.FC = () => {
  const [text, setText] = useState('');
  const [jobRole, setJobRole] = useState(ROLES[0]);
  const [customRole, setCustomRole] = useState('');
  const [isCustomRole, setIsCustomRole] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setText(content);
      };
      reader.readAsText(file);
    }
  };

  const analyzeWithAI = async () => {
    if (!text) return;
    setAnalyzing(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const targetRole = isCustomRole ? customRole : jobRole;
      
      const prompt = `
        Analyze the following resume text against the job role: "${targetRole}".
        Provide a detailed ATS score and feedback in JSON format.
        
        Resume Content:
        """
        ${text}
        """
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER, description: "ATS match score from 0-100" },
              detectedSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
              missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
              suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
              roleMatch: { type: Type.STRING, description: "Short summary of how well they match the role" }
            },
            required: ["score", "detectedSkills", "missingSkills", "suggestions", "roleMatch"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}') as AnalysisResult;
      setResult(data);
    } catch (error) {
      console.error("AI Analysis failed:", error);
      // Fallback display if API fails
      setResult({
        score: 0,
        detectedSkills: ["Error analyzing"],
        missingSkills: ["Check your API Key / Environment"],
        suggestions: ["Please ensure your text content is valid."],
        roleMatch: "Analysis could not be completed at this time."
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-[#ccff00]';
    if (s >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-[#080808] pt-32 pb-20 px-4">
      <div className="max-w-[90rem] mx-auto">
        
        {/* Header Section */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full text-[#ccff00] text-[10px] font-bold uppercase tracking-widest mb-6">
            <Cpu className="w-3 h-3" /> AI Powered Analysis
          </div>
          <h1 className="font-display text-[8vw] lg:text-[6vw] leading-[0.85] font-black text-white uppercase tracking-tighter mb-8">
            ATS <span className="text-[#ccff00]">OPTIMIZER</span>
          </h1>
          <div className="h-[1px] w-full bg-white/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
          
          {/* Main Input Area */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Step 1: Role Selection */}
            <section className="bg-[#111] border border-white/10 rounded-[2rem] p-8 md:p-12 relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                  <span className="font-display font-black text-6xl text-[#ccff00]/10">01</span>
               </div>
              
              <h2 className="text-2xl font-display font-bold text-white uppercase mb-8 flex items-center gap-3">
                <Target className="w-6 h-6 text-[#ccff00]" /> Target Role
              </h2>
              
              <div className="space-y-6">
                <div className="relative">
                  <select 
                    disabled={isCustomRole}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-5 px-6 text-white focus:outline-none focus:border-[#ccff00] appearance-none disabled:opacity-30 transition-all font-mono text-sm uppercase tracking-wide cursor-pointer"
                    value={jobRole}
                    onChange={e => setJobRole(e.target.value)}
                  >
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                     <div className="relative flex items-center">
                       <input 
                        type="checkbox" 
                        id="custom-toggle" 
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-white/20 bg-[#0a0a0a] checked:border-[#ccff00] checked:bg-[#ccff00] transition-all"
                        checked={isCustomRole}
                        onChange={() => setIsCustomRole(!isCustomRole)}
                       />
                       <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 peer-checked:opacity-100">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                         </svg>
                       </div>
                     </div>
                     <label htmlFor="custom-toggle" className="text-xs font-mono font-bold uppercase text-slate-400 cursor-pointer hover:text-white transition-colors">Define Custom Role</label>
                  </div>
                  <input 
                    disabled={!isCustomRole}
                    type="text" 
                    placeholder="e.g. Lead VR/AR Engineer"
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-[#ccff00] disabled:opacity-30 transition-all font-mono text-sm"
                    value={customRole}
                    onChange={e => setCustomRole(e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Step 2: Resume Input */}
            <section className="bg-[#111] border border-white/10 rounded-[2rem] p-8 md:p-12 relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                  <span className="font-display font-black text-6xl text-[#ccff00]/10">02</span>
               </div>

              <h2 className="text-2xl font-display font-bold text-white uppercase mb-8 flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#ccff00]" /> Resume Data
              </h2>

              <div className="space-y-6">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`border border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group/upload ${
                    fileName 
                      ? 'border-[#ccff00] bg-[#ccff00]/5' 
                      : 'border-white/20 hover:border-[#ccff00] hover:bg-white/5'
                  }`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept=".txt,.md,.rtf"
                    onChange={handleFileUpload} 
                  />
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${fileName ? 'bg-[#ccff00] text-black' : 'bg-white/10 text-slate-400 group-hover/upload:bg-white group-hover/upload:text-black'}`}>
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-white uppercase tracking-wider text-sm mb-2">{fileName || 'Upload Resume File'}</p>
                  <p className="text-[10px] font-mono text-slate-500 uppercase">.txt or .md format</p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <span className="bg-[#111] px-4 text-[10px] font-mono text-slate-600 uppercase">OR</span>
                  </div>
                  <div className="h-[1px] bg-white/10 w-full" />
                </div>

                <textarea 
                  className="w-full min-h-[200px] bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 text-sm font-mono text-slate-300 focus:outline-none focus:border-[#ccff00] placeholder-slate-700 resize-none transition-colors"
                  placeholder="Paste raw text content here..."
                  value={text}
                  onChange={e => {
                    setText(e.target.value);
                    setFileName(null);
                  }}
                />
              </div>

              <button 
                onClick={analyzeWithAI}
                disabled={!text || analyzing}
                className="w-full mt-10 py-6 bg-[#ccff00] hover:bg-white text-black rounded-xl font-display font-black text-xl uppercase tracking-widest flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
              >
                {analyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    PROCESSING
                  </>
                ) : (
                  <>
                    RUN ANALYSIS <Sparkles className="w-5 h-5" />
                  </>
                )}
              </button>
            </section>
          </div>

          {/* Results Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 md:p-10 sticky top-32 min-h-[600px] flex flex-col">
              <h3 className="text-slate-500 text-[10px] font-mono font-bold uppercase tracking-widest mb-10 text-center border-b border-white/5 pb-6">
                Analysis Results
              </h3>
              
              {result ? (
                <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-10 duration-700">
                  
                  {/* Score Visualization */}
                  <div className="flex justify-center mb-12 relative">
                    <div className="w-48 h-48 relative flex items-center justify-center">
                       {/* Background Circle */}
                       <svg className="w-full h-full transform -rotate-90">
                         <circle
                           cx="96" cy="96" r="88"
                           fill="none"
                           stroke="#1a1a1a"
                           strokeWidth="8"
                         />
                         {/* Progress Circle */}
                         <circle
                           cx="96" cy="96" r="88"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="8"
                           strokeDasharray={2 * Math.PI * 88}
                           strokeDashoffset={2 * Math.PI * 88 * (1 - result.score / 100)}
                           className={`${getScoreColor(result.score)} transition-all duration-1000 ease-out`}
                         />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <span className={`text-6xl font-display font-black ${getScoreColor(result.score)}`}>
                           {result.score}
                         </span>
                         <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Match Rate</span>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-8 flex-1">
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                         Executive Summary
                      </h4>
                      <p className="text-sm font-mono text-white leading-relaxed p-4 bg-white/5 rounded-xl border border-white/10">
                        {result.roleMatch}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold text-[#ccff00] uppercase tracking-widest mb-3">
                        Detected Keywords
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.detectedSkills.map(skill => (
                          <span key={skill} className="px-3 py-1 bg-[#ccff00]/10 text-[#ccff00] text-[10px] font-bold rounded-full uppercase border border-[#ccff00]/20 tracking-wider">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-3">
                        Critical Missing Keywords
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.missingSkills.map(skill => (
                          <span key={skill} className="px-3 py-1 bg-red-500/10 text-red-400 text-[10px] font-bold rounded-full uppercase border border-red-500/20 tracking-wider opacity-80">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                        Optimization Protocol
                      </h4>
                      <ul className="space-y-3">
                        {result.suggestions.map((s, i) => (
                          <li key={i} className="flex gap-3 text-xs text-slate-300 leading-relaxed group">
                            <span className="text-[#ccff00] mt-1">/</span>
                            <span className="group-hover:text-white transition-colors">{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-600 gap-6 opacity-50">
                  <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                    <BarChart3 className="w-8 h-8" />
                  </div>
                  <div className="text-center max-w-[200px]">
                    <p className="font-display font-bold text-white uppercase text-xl mb-2">Awaiting Data</p>
                    <p className="text-[10px] font-mono uppercase tracking-widest">Input resume & role to initialize scan sequence</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSAnalyzerPage;
