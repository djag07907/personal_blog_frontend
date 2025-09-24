export interface AboutPageData {
  id: number;
  title: string;
  description: string;
  content: string;
  image?: {
    url: string;
  };
  skills?: string[];
  experience?: {
    id: number;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description: string;
    current: boolean;
  }[];
  education?: {
    id: number;
    institution: string;
    degree: string;
    startDate: string;
    endDate?: string;
    description?: string;
  }[];
  achievements?: {
    id: number;
    title: string;
    description: string;
    date: string;
  }[];
  publishedAt: string;
}

export interface PersonalInfo {
  name: string;
  tagline: string;
  location?: string;
  yearsOfExperience?: number;
}