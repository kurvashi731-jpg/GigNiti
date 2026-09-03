export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Worker {
  id: string;
  name: string;
  societyName: string;
  categoryName: string;
  ratingAvg: number;
  experienceYears: number;
  hourlyRate: number;
  visitCharge: number;
  verified: boolean;
  jobsThisWeek: number;
  bio: string;
}

export const MOCK_CATEGORIES: ServiceCategory[] = [
  { id: '1', name: 'Electrical', icon: '⚡', description: 'Wiring, repairs & installations' },
  { id: '2', name: 'Plumbing', icon: '🚰', description: 'Pipe fitting, leaks & bathroom maintenance' },
  { id: '3', name: 'Home Care', icon: '👵', description: 'Elderly care, nursing & assistance' },
  { id: '4', name: 'Carpentry', icon: '🪵', description: 'Furniture repair & custom woodwork' },
];

export const MOCK_WORKERS: Worker[] = [
  {
    id: 'w1',
    name: 'Ramesh Kumar',
    societyName: "Malabar Electricians' Cooperative Society",
    categoryName: 'Electrical',
    ratingAvg: 4.8,
    experienceYears: 6,
    hourlyRate: 350,
    visitCharge: 100,
    verified: true,
    jobsThisWeek: 2,
    bio: 'Certified electrician specializing in residential safety audits and smart fitting.',
  },
  {
    id: 'w2',
    name: 'Anish V.',
    societyName: 'Kozhikode Home Care Cooperative',
    categoryName: 'Home Care',
    ratingAvg: 4.9,
    experienceYears: 4,
    hourlyRate: 400,
    visitCharge: 50,
    verified: true,
    jobsThisWeek: 1,
    bio: 'Trained elderly care provider with emergency response certification.',
  },
];