
export interface User {
  id: string;
  name: string;
  title: string;
  email: string;
  emailVerified: boolean;
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
  speedScore?: number;
  previewImage: string;
  tags: string[];
}

export type PortfolioPurpose = 'Job Search' | 'Business';

export interface PortfolioData {
  templateId?: string;
  purpose: PortfolioPurpose;
  name: string; // Personal or Business Name
  bio: string; // Personal Bio or About Business
  title: string;
  skills: string[];
  github: string;
  linkedin: string;
  email: string;
  // Socials
  instagram?: string;
  twitter?: string;
  // Professional
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
