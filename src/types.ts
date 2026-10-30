export type SkillCategory = 'frontend' | 'backend' | 'database' | 'architecture' | 'tools';

export interface SkillNode {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 0 - 100
  experienceYears: string;
  iconName: string;
  description: string;
  relatedIds: string[];
  orbitRadius: number; // Radius for orbiting visualization
  speed: number; // Speed multiplier
  color: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'client' | 'gateway' | 'service' | 'database' | 'cache';
  tech: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tagline: string;
  year: string;
  featured: boolean;
  heroImage: string;
  mockupImages: {
    desktop: string;
    mobile: string;
    tablet: string;
    architecture: string;
  };
  overview: string;
  clientTarget: string;
  techStack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  architectureNodes: ArchitectureNode[];
  codeComparison: {
    beforeTitle: string;
    beforeCode: string;
    afterTitle: string;
    afterCode: string;
    explanation: string;
  };
  features: string[];
  challenges: string;
  solution: string;
  githubUrl: string;
  liveUrl: string;
  accentColor: string;
}

export interface JourneyMilestone {
  id: string;
  year: string;
  period: string;
  title: string;
  organization: string;
  role: string;
  description: string;
  keyAchievements: string[];
  techUsed: string[];
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
}

export interface CrudItem {
  id: string;
  name: string;
  category: 'E-Commerce' | 'Jewelry' | 'API Spec';
  price: number;
  stock: number;
  dbSource: 'MongoDB' | 'MySQL';
  status: 'In Stock' | 'Low Stock' | 'Draft';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
}
