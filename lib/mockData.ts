// lib/mockData.ts

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
  latitude: number;
  longitude: number;
}

// The logged-in customer's location — used to calculate distance & center the map.
// Kozhikode, Kerala. Swap for real geolocation later.
export const CUSTOMER_LOCATION = {
  latitude: 11.2588,
  longitude: 75.7804,
};

export const MOCK_CATEGORIES: ServiceCategory[] = [
  { id: '1', name: 'Electrical', icon: '⚡', description: 'Wiring, repairs & installations' },
  { id: '2', name: 'Plumbing', icon: '🚰', description: 'Pipe fitting, leaks & bathroom maintenance' },
  { id: '3', name: 'Home Care', icon: '👵', description: 'Elderly care, nursing & assistance' },
  { id: '4', name: 'Carpentry', icon: '🪵', description: 'Furniture repair & custom woodwork' },
    { id: '5', name: 'Painting', icon: '🎨', description: 'Interior & exterior wall painting' },
  { id: '6', name: 'Cleaning', icon: '🧹', description: 'Home deep cleaning & sanitization' },
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
    latitude: 11.2644,
    longitude: 75.7889,
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
    latitude: 11.2512,
    longitude: 75.7735,
  },
  {
    id: 'w3',
    name: 'Sunita K.',
    societyName: 'Kozhikode Home Care Cooperative',
    categoryName: 'Home Care',
    ratingAvg: 4.7,
    experienceYears: 5,
    hourlyRate: 380,
    visitCharge: 60,
    verified: true,
    jobsThisWeek: 3,
    bio: 'Specializes in post-surgery care and daily assistance for seniors.',
    latitude: 11.2701,
    longitude: 75.7650,
  },
  {
    id: 'w4',
    name: 'Anil Joseph',
    societyName: "Malabar Electricians' Cooperative Society",
    categoryName: 'Electrical',
    ratingAvg: 4.6,
    experienceYears: 9,
    hourlyRate: 320,
    visitCharge: 100,
    verified: true,
    jobsThisWeek: 1,
    bio: 'Nine years in industrial and residential wiring, panel upgrades.',
    latitude: 11.2455,
    longitude: 75.7920,
  },
  {
    id: 'w5',
    name: 'Prakash Nair',
    societyName: 'Kozhikode Plumbers Guild',
    categoryName: 'Plumbing',
    ratingAvg: 4.5,
    experienceYears: 7,
    hourlyRate: 300,
    visitCharge: 80,
    verified: true,
    jobsThisWeek: 2,
    bio: 'Leak detection, bathroom fittings, and pipeline repair specialist.',
    latitude: 11.2560,
    longitude: 75.7710,
  },
  {
    id: 'w6',
    name: 'Deepa Menon',
    societyName: 'Calicut Carpentry Cooperative',
    categoryName: 'Carpentry',
    ratingAvg: 4.9,
    experienceYears: 8,
    hourlyRate: 340,
    visitCharge: 90,
    verified: true,
    jobsThisWeek: 0,
    bio: 'Custom furniture repair and modular fittings, 8 years of experience.',
    latitude: 11.2620,
    longitude: 75.7800,
  },
    {
    id: 'w7', name: 'Fathima Beevi', societyName: 'Kozhikode Painters Collective',
    categoryName: 'Painting', ratingAvg: 4.7, experienceYears: 5, hourlyRate: 280,
    visitCharge: 70, verified: true, jobsThisWeek: 4,
    bio: 'Interior and exterior painting, texture finishes, waterproof coating.',
    latitude: 11.2495, longitude: 75.7845,
  },
  {
    id: 'w8', name: 'Biju Thomas', societyName: 'Malabar Home Services Cooperative',
    categoryName: 'Cleaning', ratingAvg: 4.6, experienceYears: 3, hourlyRate: 250,
    visitCharge: 60, verified: true, jobsThisWeek: 2,
    bio: 'Deep cleaning, sanitization, and move-in/move-out cleaning specialist.',
    latitude: 11.2670, longitude: 75.7760,
  },
];

// Straight-line distance between two coordinates, in km (Haversine formula).
export function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10; // rounded to 1 decimal
}