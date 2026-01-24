
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';
import { 
  User, Briefcase, FolderKanban, Plus, Trash2, Github, Linkedin, 
  ChevronRight, ChevronLeft, Eye, Save
} from 'lucide-react';

const BuilderPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const { portfolioData, updateBasics, addExperience, removeExperience, addProject, removeProject } = usePortfolio();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Temporary state for new experience/project inputs
  const [newExp, setNewExp] = useState({ company: '', role: '', duration: '', description: '' });
  const [newProj, setNewProj] = useState({ name: '', techStack: '', imageUrl: '', description: '', link: '' });

  const handleAddExp = () => {
    if (newExp.company && newExp.role) {
      addExperience({ ...newExp, id: Date.now().toString() });
      setNewExp({ company: '', role: '', duration: '', description: '' });
    }
  };

  const handleAddProj = () => {
    if (newProj.name) {
      addProject({ 
        ...newProj, 
        id: Date.now().toString(), 
        techStack: newProj.techStack.split(',').map(s => s.trim()).filter(Boolean) 
      });
      setNewProj({ name: '', techStack: '', imageUrl: '', description: '', link: '' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Project Builder</h1>
          <p className="text-slate-400">Step {step} of 3: {step === 1 ? 'Basics' : step === 2 ? 'Experience' : 'Projects'}</p>
        </div>
        <div className="flex gap-3">
           <button 
            onClick={() => navigate('/preview')}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-medium transition-all"
          >
            <Eye className="w-4 h-4" /> Preview
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-12">
        {[1, 2, 3].map(s => (
          <div key={s} className={`h-2 flex-1 rounded-full transition-all ${s <= step ? 'bg-blue-600' : 'bg-slate-800'}`} />
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl min-h-[500px]">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" /> Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Display Name</label>
                <input 
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Full Name"
                  value={portfolioData.name || user?.name || ''}
                  onChange={e => updateBasics({ name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Professional Headline</label>
                <input 
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="e.g. Full Stack Developer"
                  value={portfolioData.title || user?.title || ''}
                  onChange={e => updateBasics({ title: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Short Bio</label>
              <textarea 
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Briefly describe your expertise..."
                value={portfolioData.bio}
                onChange={e => updateBasics({ bio: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2"><Github className="w-4 h-4"/> GitHub Username</label>
                <input 
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="username"
                  value={portfolioData.github}
                  onChange={e => updateBasics({ github: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2"><Linkedin className="w-4 h-4"/> LinkedIn ID</label>
                <input 
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="profile-name"
                  value={portfolioData.linkedin}
                  onChange={e => updateBasics({ linkedin: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-500" /> Work Experience
            </h2>
            
            <div className="space-y-4">
              {portfolioData.experiences.map(exp => (
                <div key={exp.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{exp.role} @ {exp.company}</h3>
                    <p className="text-sm text-slate-500">{exp.duration}</p>
                    <p className="text-sm text-slate-400 mt-2">{exp.description.substring(0, 100)}...</p>
                  </div>
                  <button onClick={() => removeExperience(exp.id)} className="text-slate-500 hover:text-red-500 transition-colors p-2">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              {portfolioData.experiences.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-2xl">
                  <p className="text-slate-500">No work history added yet.</p>
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
              <h3 className="font-medium text-slate-300">Add Experience</h3>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  placeholder="Company"
                  className="bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-50"
                  value={newExp.company}
                  onChange={e => setNewExp({...newExp, company: e.target.value})}
                />
                <input 
                  placeholder="Role"
                  className="bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-50"
                  value={newExp.role}
                  onChange={e => setNewExp({...newExp, role: e.target.value})}
                />
              </div>
              <input 
                placeholder="Duration (e.g. 2021 - Present)"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-50"
                value={newExp.duration}
                onChange={e => setNewExp({...newExp, duration: e.target.value})}
              />
              <textarea 
                placeholder="Description (PAR Method: Problem, Action, Result)"
                rows={3}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-50"
                value={newExp.description}
                onChange={e => setNewExp({...newExp, description: e.target.value})}
              />
              <button 
                onClick={handleAddExp}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-400 text-sm font-medium"
              >
                <Plus className="w-4 h-4" /> Add to List
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-blue-500" /> Key Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolioData.projects.map(proj => (
                <div key={proj.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl relative group">
                  <h3 className="font-bold pr-8">{proj.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {proj.techStack.map(tag => (
                      <span key={tag} className="text-[10px] bg-slate-800 px-2 py-0.5 rounded uppercase">{tag}</span>
                    ))}
                  </div>
                  <button 
                    onClick={() => removeProject(proj.id)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
              <h3 className="font-medium text-slate-300">Add Project</h3>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  placeholder="Project Name"
                  className="bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-50"
                  value={newProj.name}
                  onChange={e => setNewProj({...newProj, name: e.target.value})}
                />
                <input 
                  placeholder="Tech Stack (comma separated)"
                  className="bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-50"
                  value={newProj.techStack}
                  onChange={e => setNewProj({...newProj, techStack: e.target.value})}
                />
              </div>
              <input 
                placeholder="Image URL"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-50"
                value={newProj.imageUrl}
                onChange={e => setNewProj({...newProj, imageUrl: e.target.value})}
              />
              <textarea 
                placeholder="Project Description"
                rows={2}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-50"
                value={newProj.description}
                onChange={e => setNewProj({...newProj, description: e.target.value})}
              />
              <button 
                onClick={handleAddProj}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-400 text-sm font-medium"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </div>
          </div>
        )}

        <div className="mt-12 flex justify-between items-center pt-8 border-t border-slate-800">
          <button
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-400 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20"
            >
              Continue <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => navigate('/preview')}
              className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-xl font-semibold shadow-lg shadow-green-500/20"
            >
              Finish & Preview <Eye className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
