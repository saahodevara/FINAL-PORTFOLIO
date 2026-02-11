
import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, Experience, Project, PortfolioPurpose } from '../types';

interface PortfolioContextType {
  portfolioData: PortfolioData;
  updateBasics: (data: Partial<PortfolioData>) => void;
  addExperience: (exp: Experience) => void;
  removeExperience: (id: string) => void;
  addProject: (proj: Project) => void;
  removeProject: (id: string) => void;
  selectTemplate: (templateId: string) => void;
  setPurpose: (purpose: PortfolioPurpose) => void;
  updateSkills: (skills: string[]) => void;
}

const initialData: PortfolioData = {
  templateId: undefined,
  purpose: 'Job Search',
  name: '',
  bio: '',
  title: '',
  skills: [],
  github: '',
  linkedin: '',
  email: '',
  experiences: [],
  projects: []
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(initialData);

  useEffect(() => {
    const stored = localStorage.getItem('portfoli_data');
    if (stored) {
      // Merge stored data with initialData structure to ensure new fields exist
      const parsed = JSON.parse(stored);
      setPortfolioData({ ...initialData, ...parsed });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('portfoli_data', JSON.stringify(portfolioData));
  }, [portfolioData]);

  const updateBasics = (data: Partial<PortfolioData>) => {
    setPortfolioData(prev => ({ ...prev, ...data }));
  };

  const addExperience = (exp: Experience) => {
    setPortfolioData(prev => ({ ...prev, experiences: [...prev.experiences, exp] }));
  };

  const removeExperience = (id: string) => {
    setPortfolioData(prev => ({ ...prev, experiences: prev.experiences.filter(e => e.id !== id) }));
  };

  const addProject = (proj: Project) => {
    setPortfolioData(prev => ({ ...prev, projects: [...prev.projects, proj] }));
  };

  const removeProject = (id: string) => {
    setPortfolioData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  };

  const selectTemplate = (templateId: string) => {
    setPortfolioData(prev => ({ ...prev, templateId }));
  };

  const setPurpose = (purpose: PortfolioPurpose) => {
    setPortfolioData(prev => ({ ...prev, purpose }));
  };

  const updateSkills = (skills: string[]) => {
    setPortfolioData(prev => ({ ...prev, skills }));
  };

  return (
    <PortfolioContext.Provider value={{ 
      portfolioData, 
      updateBasics, 
      addExperience, 
      removeExperience, 
      addProject, 
      removeProject, 
      selectTemplate,
      setPurpose,
      updateSkills
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within a PortfolioProvider');
  return context;
};
