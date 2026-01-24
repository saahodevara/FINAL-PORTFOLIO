
import { GalleryItem, PortfolioData } from './types';

const createDemoData = (name: string, title: string, bio: string): PortfolioData => ({
  name,
  title,
  bio,
  github: 'demo-user',
  linkedin: 'demo-user',
  email: 'hello@example.com',
  experiences: [
    {
      id: 'e1',
      company: 'Global Tech Inc',
      role: `Senior ${title}`,
      duration: '2021 - Present',
      description: 'Leading strategic initiatives and managing cross-functional teams to deliver high-impact results.'
    },
    {
      id: 'e2',
      company: 'Creative Solutions',
      role: `Junior ${title}`,
      duration: '2019 - 2021',
      description: 'Developed core features and optimized internal workflows resulting in 20% efficiency gain.'
    }
  ],
  projects: [
    {
      id: 'p1',
      name: 'Project Alpha',
      techStack: ['React', 'Node.js', 'AWS'],
      description: 'An end-to-end solution for automated data processing and visualization.',
      imageUrl: 'https://picsum.photos/seed/project1/800/600',
      link: '#'
    },
    {
      id: 'p2',
      name: 'Mobile First Dashboard',
      techStack: ['Flutter', 'Firebase'],
      description: 'Real-time analytics dashboard with offline-first capabilities.',
      imageUrl: 'https://picsum.photos/seed/project2/800/600',
      link: '#'
    }
  ]
});

export const DUMMY_GALLERY: GalleryItem[] = [
  {
    id: '1',
    name: 'Alex Rivera',
    title: 'Senior Frontend Engineer',
    category: 'Developer',
    tech: ['React', 'TypeScript', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    fullData: createDemoData('Alex Rivera', 'Frontend Engineer', 'Crafting beautiful, performant web experiences with modern tools.')
  },
  {
    id: '2',
    name: 'Sarah Chen',
    title: 'Product Designer',
    category: 'Designer',
    tech: ['Figma', 'UI/UX', 'Prototyping'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    fullData: createDemoData('Sarah Chen', 'Product Designer', 'Solving complex problems through user-centric design and intuitive interfaces.')
  },
  {
    id: '3',
    name: 'Marcus Thorne',
    title: 'ML Engineer',
    category: 'Data Scientist',
    tech: ['Python', 'TensorFlow', 'PyTorch'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    fullData: createDemoData('Marcus Thorne', 'ML Engineer', 'Building scalable machine learning models for real-world predictive analytics.')
  },
  {
    id: '5',
    name: 'Sophia Loren',
    title: 'Growth Marketer',
    category: 'Marketing',
    tech: ['SEO', 'Ads', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    fullData: createDemoData('Sophia Loren', 'Growth Marketer', 'Driving user acquisition and brand loyalty through data-driven marketing campaigns.')
  },
  {
    id: '6',
    name: 'David Park',
    title: 'Financial Analyst',
    category: 'Finance',
    tech: ['Excel', 'SQL', 'Modeling'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    fullData: createDemoData('David Park', 'Financial Analyst', 'Expert in quantitative analysis and long-term financial forecasting.')
  },
  {
    id: '7',
    name: 'Emily Blunt',
    title: 'Technical Writer',
    category: 'Writing',
    tech: ['Docs', 'Markdown', 'APIs'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    fullData: createDemoData('Emily Blunt', 'Technical Writer', 'Bridging the gap between complex engineering and user understanding.')
  }
];

export const ATS_KEYWORDS = ['React', 'Node', 'Python', 'AWS', 'Docker', 'Kubernetes', 'SQL', 'TypeScript', 'CI/CD'];
