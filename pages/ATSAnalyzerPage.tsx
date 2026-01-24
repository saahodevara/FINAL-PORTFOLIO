
import React, { useState, useRef } from 'react';
import { 
  Cpu, CheckCircle2, AlertCircle, RefreshCw, BarChart3, 
  Upload, FileText, Target, ChevronDown, Sparkles 
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
    if (s >= 80) return 'text-green-500';
    if (s >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-2xl">
            <Cpu className="w-10 h-10 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">ATS Optimizer <span className="text-blue-500 font-mono text-sm ml-2 px-2 py-0.5 bg-blue-500/10 rounded">AI POWERED</span></h1>
            <p className="text-slate-400">Intelligent resume scoring based on your specific target career.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        <div className="space-y-8">
          {/* Step 1: Role Selection */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">1</div>
              <h2 className="text-xl font-bold flex items-center gap-2">Target Job Role <Target className="w-5 h-5 text-blue-500" /></h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <select 
                  disabled={isCustomRole}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 px-4 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none disabled:opacity-50 transition-all"
                  value={jobRole}
                  onChange={e => setJobRole(e.target.value)}
                >
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1">
                   <input 
                    type="checkbox" 
                    id="custom-toggle" 
                    className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-blue-600 focus:ring-blue-500" 
                    checked={isCustomRole}
                    onChange={() => setIsCustomRole(!isCustomRole)}
                   />
                   <label htmlFor="custom-toggle" className="text-sm text-slate-400 cursor-pointer hover:text-slate-200">Use Custom Role</label>
                </div>
                <input 
                  disabled={!isCustomRole}
                  type="text" 
                  placeholder="e.g. Lead VR/AR Engineer"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-30 transition-all"
                  value={customRole}
                  onChange={e => setCustomRole(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Step 2: Resume Input */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">2</div>
              <h2 className="text-xl font-bold flex items-center gap-2">Resume Source <FileText className="w-5 h-5 text-blue-500" /></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-blue-600/5 hover:border-blue-600/50 ${fileName ? 'border-blue-600/50 bg-blue-600/5' : 'border-slate-800'}`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".txt,.md,.rtf"
                  onChange={handleFileUpload} 
                />
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all ${fileName ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-800 text-slate-500'}`}>
                  <Upload className="w-6 h-6" />
                </div>
                <p className="font-bold text-slate-200">{fileName || 'Upload Resume File'}</p>
                <p className="text-xs text-slate-500 mt-2">Support for .txt, .md (Text-based files)</p>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">OR PASTE CONTENT</p>
                <textarea 
                  className="flex-1 min-h-[160px] bg-slate-950 border border-slate-800 rounded-3xl p-4 text-sm font-mono text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-slate-800"
                  placeholder="Paste your resume text here..."
                  value={text}
                  onChange={e => {
                    setText(e.target.value);
                    setFileName(null);
                  }}
                />
              </div>
            </div>

            <button 
              onClick={analyzeWithAI}
              disabled={!text || analyzing}
              className="w-full mt-8 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50 group"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  AI is analyzing your fit...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 text-yellow-400 group-hover:scale-125 transition-transform" />
                  Perform AI Optimization Scan
                </>
              )}
            </button>
          </section>
        </div>

        {/* Results Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center sticky top-24">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-8">AI Career Score</h3>
            
            {result ? (
              <div className="space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-48 h-48">
                    <circle 
                      className="text-slate-800" 
                      strokeWidth="10" 
                      stroke="currentColor" 
                      fill="transparent" 
                      r="80" 
                      cx="96" 
                      cy="96" 
                    />
                    <circle 
                      className={getScoreColor(result.score)} 
                      strokeWidth="10" 
                      strokeDasharray={502.6}
                      strokeDashoffset={502.6 - (502.6 * result.score) / 100}
                      strokeLinecap="round" 
                      stroke="currentColor" 
                      fill="transparent" 
                      r="80" 
                      cx="96" 
                      cy="96" 
                      style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                    />
                  </svg>
                  <div className="absolute text-5xl font-black">{result.score}%</div>
                </div>

                <div className="text-left space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Target className="w-3 h-3" /> Role Match Summary
                    </h4>
                    <p className="text-sm text-slate-300 bg-slate-950 p-4 rounded-2xl border border-slate-800 leading-relaxed">
                      {result.roleMatch}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Top Detected Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.detectedSkills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded uppercase border border-green-500/20 tracking-wider">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-red-500/60 uppercase tracking-widest mb-3">Critical Gaps</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.missingSkills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-red-500/10 text-red-400 text-[10px] font-bold rounded uppercase border border-red-500/20 tracking-wider">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <h4 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">Expert Suggestions</h4>
                    <ul className="text-xs text-slate-400 space-y-3">
                      {result.suggestions.map((s, i) => (
                        <li key={i} className="flex gap-2 items-start leading-relaxed">
                          <span className="text-blue-500 font-bold">•</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-20 flex flex-col items-center gap-4 text-slate-700">
                <div className="w-16 h-16 bg-slate-950 rounded-full flex items-center justify-center border border-slate-800">
                  <BarChart3 className="w-8 h-8 opacity-20" />
                </div>
                <p className="text-xs max-w-[200px] leading-relaxed">
                  Upload your resume and select your target role to see your match score and AI-powered feedback.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSAnalyzerPage;
