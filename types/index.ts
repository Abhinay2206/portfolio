export interface ProjectDetails {
  overview?: string;
  challenges?: string[];
  solutions?: string[];
  impact?: string;
  images?: { url: string; caption: string }[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  features: string[];
  demo: string;
  github: string;
  projectDetails?: ProjectDetails;
}

export interface Skills {
  [category: string]: string[];
}