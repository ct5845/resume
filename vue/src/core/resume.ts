export type IconKey = { [key: string]: string };

export interface Profile {
  network: string;
  icon: IconKey;
  url: string;
}

export interface Basics {
  name: string;
  label: string;
  location: {
    city: string;
    countryCode: string;
    icon: IconKey;
  };
  profiles: Profile[];
  url: string;
}

export interface Work {
  id: number;
  name: string;
  position: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  studyType: string;
  startDate: string;
  endDate: string;
}

export interface SkillSet {
  primary: string[];
  secondary: string[];
  tertiary?: string[];
}

export interface Skills {
  languages: SkillSet;
  frameworks: SkillSet;
  tools: SkillSet;
}

export interface Project {
  name: string;
  description: string;
  url?: string;
}

export interface Interest {
  name: string;
  keywords: string[];
  shortText: string;
}

export interface Resume {
  basics: Basics;
  work: Work[];
  education: Education[];
  skills: Skills;
  projects: Project[];
  interests: Interest[];
}
