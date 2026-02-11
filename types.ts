
export interface User {
  id: string;
  name: string;
  title: string;
  email: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  techStack: string[];
  imageUrl: string;
  description: string;
  link: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  bestFor: string;
  speedScore: number;
  previewImage: string;
  tags: string[];
}

export type PortfolioPurpose = 'Job Search' | 'Freelance' | 'Personal Brand' | 'Founder' | 'Internship';

export interface PortfolioData {
  templateId?: string;
  purpose: PortfolioPurpose;
  name: string;
  bio: string;
  title: string;
  skills: string[];
  github: string;
  linkedin: string;
  email: string;
  experiences: Experience[];
  projects: Project[];
}

export interface GalleryItem {
  id: string;
  name: string;
  title: string;
  category: 'Developer' | 'Designer' | 'Data Scientist' | 'Marketing' | 'Finance' | 'Writing' | 'Product';
  tech: string[];
  image: string;
  fullData: PortfolioData;
}
