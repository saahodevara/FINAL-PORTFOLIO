
import { GalleryItem, PortfolioData, Template } from './types';

export const TEMPLATES: Template[] = [
  {
    id: 'minimal-dev',
    name: 'Terminal',
    description: 'A clean, code-focused layout for backend engineers. High contrast, mono fonts.',
    bestFor: 'Developer',
    speedScore: 99,
    previewImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
    tags: ['Fast', 'Minimal', 'Dark']
  },
  {
    id: 'visual-creative',
    name: 'Canvas',
    description: 'Image-heavy grid layout for visual storytellers and UI designers.',
    bestFor: 'Designer',
    speedScore: 94,
    previewImage: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=600&q=80',
    tags: ['Gallery', 'Visual', 'Modern']
  },
  {
    id: 'corporate-pro',
    name: 'Executive',
    description: 'Polished, structured layout for business professionals and product managers.',
    bestFor: 'Product Manager',
    speedScore: 97,
    previewImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    tags: ['Clean', 'Structured', 'Professional']
  }
];

const createDemoData = (
  name: string, 
  title: string, 
  bio: string, 
  purpose: PortfolioData['purpose'],
  skills: string[],
  projects: PortfolioData['projects'],
  experiences: PortfolioData['experiences']
): PortfolioData => ({
  name,
  title,
  bio,
  purpose,
  skills,
  github: 'demo-user',
  linkedin: 'demo-user',
  email: 'hello@example.com',
  experiences,
  projects
});

export const DUMMY_GALLERY: GalleryItem[] = [
  // 1. Creative Developer (The Visual Coder)
  {
    id: '1',
    name: 'Kai Ro',
    title: 'Creative Technologist',
    category: 'Developer',
    tech: ['Three.js', 'WebGL', 'GLSL', 'React'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    fullData: createDemoData(
      'Kai Ro',
      'Creative Technologist',
      'Merging code and art to create immersive web experiences. Specializing in WebGL and interactive 3D environments.',
      'Freelance',
      ['Three.js', 'React-Three-Fiber', 'GLSL', 'Typescript', 'Blender'],
      [
        {
          id: 'p1',
          name: 'Neon Horizon',
          techStack: ['Three.js', 'React', 'Audio API'],
          description: 'An audio-reactive 3D landscape generator that pulses with user music.',
          imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
          link: '#'
        },
        {
          id: 'p2',
          name: 'Void Shader',
          techStack: ['GLSL', 'WebGL'],
          description: 'A collection of high-performance fragment shaders for web backgrounds.',
          imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
          link: '#'
        }
      ],
      [
        {
          id: 'e1',
          company: 'Digital Dreams Agency',
          role: 'Lead Creative Dev',
          duration: '2022 - Present',
          description: 'Spearheading 3D web campaigns for Fortune 500 clients.'
        }
      ]
    )
  },
  // 2. AI Engineer (The Trending Role)
  {
    id: '2',
    name: 'Elena Void',
    title: 'AI Solutions Architect',
    category: 'Data Scientist',
    tech: ['Python', 'LangChain', 'OpenAI', 'PyTorch'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    fullData: createDemoData(
      'Elena Void',
      'AI Architect',
      'Building the bridge between LLMs and enterprise applications. Obsessed with RAG pipelines and autonomous agents.',
      'Job Search',
      ['Python', 'LangChain', 'Vector DBs', 'FastAPI', 'AWS'],
      [
        {
          id: 'p1',
          name: 'LegalMind AI',
          techStack: ['Python', 'OpenAI API', 'Pinecone'],
          description: 'An automated legal document analyzer using RAG for context-aware answers.',
          imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
          link: '#'
        },
        {
          id: 'p2',
          name: 'Agent Smith',
          techStack: ['AutoGPT', 'Docker'],
          description: 'Autonomous research agent capable of browsing the web and summarizing news.',
          imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
          link: '#'
        }
      ],
      [
        {
          id: 'e1',
          company: 'Anthropic Systems',
          role: 'Machine Learning Engineer',
          duration: '2021 - 2023',
          description: 'Optimized inference pipelines for large language models.'
        }
      ]
    )
  },
  // 3. Product Designer (The Minimalist)
  {
    id: '3',
    name: 'Lila Banks',
    title: 'Product Designer',
    category: 'Designer',
    tech: ['Figma', 'Protopie', 'Design Systems'],
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80',
    fullData: createDemoData(
      'Lila Banks',
      'Product Designer',
      'Crafting intuitive digital interfaces with a focus on accessibility and motion. Believer in "Less is More".',
      'Personal Brand',
      ['Figma', 'UI/UX', 'Interaction Design', 'Accessibility', 'Prototyping'],
      [
        {
          id: 'p1',
          name: 'FinFlow App',
          techStack: ['Figma', 'Mobile Design'],
          description: 'Complete redesign of a banking app focusing on Gen Z financial literacy.',
          imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
          link: '#'
        },
        {
          id: 'p2',
          name: 'Aero System',
          techStack: ['Design Systems', 'Documentation'],
          description: 'A comprehensive design system for an enterprise SaaS platform.',
          imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80',
          link: '#'
        }
      ],
      [
        {
          id: 'e1',
          company: 'Stripe',
          role: 'Senior Product Designer',
          duration: '2020 - Present',
          description: 'Led the design overhaul of the checkout experience.'
        }
      ]
    )
  },
  // 4. Indie Founder (The Builder)
  {
    id: '4',
    name: 'Mike Chen',
    title: 'Indie Founder',
    category: 'Product',
    tech: ['Next.js', 'Supabase', 'Stripe', 'Marketing'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    fullData: createDemoData(
      'Mike Chen',
      'Serial Founder',
      'Building profitable micro-SaaS products in public. shipping code and content daily.',
      'Founder',
      ['Full Stack Dev', 'SEO', 'Product Strategy', 'Next.js', 'PostgreSQL'],
      [
        {
          id: 'p1',
          name: 'SaaS Starter Kit',
          techStack: ['Next.js', 'Boilerplate'],
          description: 'The most popular open-source starter kit for indie hackers.',
          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
          link: '#'
        },
        {
          id: 'p2',
          name: 'TweetQueue',
          techStack: ['SaaS', 'Twitter API'],
          description: 'Automated social media scheduling tool generated $5k MRR.',
          imageUrl: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80',
          link: '#'
        }
      ],
      [
        {
          id: 'e1',
          company: 'Self Employed',
          role: 'Founder',
          duration: '2019 - Present',
          description: 'Bootstrapped 3 profitable SaaS businesses.'
        }
      ]
    )
  },
  // 5. Blockchain Dev (The Specialist)
  {
    id: '5',
    name: 'Dax Cipher',
    title: 'Smart Contract Engineer',
    category: 'Developer',
    tech: ['Solidity', 'Rust', 'Ethereum', 'Web3'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    fullData: createDemoData(
      'Dax Cipher',
      'Web3 Engineer',
      'Securing the decentralized web. Auditing smart contracts and building DeFi protocols.',
      'Freelance',
      ['Solidity', 'Hardhat', 'Rust', 'Cryptography', 'Audit'],
      [
        {
          id: 'p1',
          name: 'Liquidity DEX',
          techStack: ['Solidity', 'React'],
          description: 'Decentralized exchange with automated market maker functionality.',
          imageUrl: 'https://images.unsplash.com/photo-1621504450162-11365236327c?w=800&q=80',
          link: '#'
        },
        {
          id: 'p2',
          name: 'NFT Bridge',
          techStack: ['Rust', 'Polkadot'],
          description: 'Cross-chain bridge for transferring digital assets.',
          imageUrl: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&q=80',
          link: '#'
        }
      ],
      [
        {
          id: 'e1',
          company: 'Consensys',
          role: 'Blockchain Developer',
          duration: '2020 - 2022',
          description: 'Contributed to core Ethereum infrastructure tools.'
        }
      ]
    )
  },
   // 6. Growth Lead (The Modern Marketer)
  {
    id: '6',
    name: 'Sophia Vane',
    title: 'Head of Growth',
    category: 'Marketing',
    tech: ['SQL', 'Google Ads', 'Mixpanel', 'HubSpot'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    fullData: createDemoData(
      'Sophia Vane',
      'Growth Strategist',
      'Data-driven marketer specializing in B2B SaaS acquisition and retention loops.',
      'Job Search',
      ['SEO/SEM', 'Data Analysis', 'Copywriting', 'Automation', 'CRM'],
      [
        {
          id: 'p1',
          name: 'ScaleUp Campaign',
          techStack: ['Ads', 'Landing Pages'],
          description: 'Increased organic traffic by 300% in 6 months via content strategy.',
          imageUrl: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&q=80',
          link: '#'
        },
        {
          id: 'p2',
          name: 'Viral Loop Study',
          techStack: ['Product Growth'],
          description: 'Case study on referral mechanics that drove 10k signups.',
          imageUrl: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80',
          link: '#'
        }
      ],
      [
        {
          id: 'e1',
          company: 'TechFlow',
          role: 'Growth Marketing Manager',
          duration: '2019 - Present',
          description: 'Managing a $50k/mo ad budget and leading a team of 4.'
        }
      ]
    )
  }
];

export const ATS_KEYWORDS = ['React', 'Node', 'Python', 'AWS', 'Docker', 'Kubernetes', 'SQL', 'TypeScript', 'CI/CD'];
