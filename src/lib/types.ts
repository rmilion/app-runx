// Types for RUNX App

export interface Territory {
  id: string;
  coordinates: [number, number][];
  ownerId: string;
  ownerName: string;
  strength: number;
  capturedAt: Date;
  lastReinforced: Date;
  area: number;
  color: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  energy: number;
  maxEnergy: number;
  territories: Territory[];
  stats: UserStats;
  inventory: Inventory;
}

export interface UserStats {
  totalDistance: number;
  totalTime: number;
  totalRuns: number;
  territoriesConquered: number;
  territoriesLost: number;
  battlesWon: number;
  battlesLost: number;
  currentStreak: number;
  longestStreak: number;
  calories: number;
  avgPace: number;
}

export interface Inventory {
  skins: string[];
  avatars: string[];
  flags: string[];
  boosts: Boost[];
}

export interface Boost {
  id: string;
  name: string;
  type: 'double_strength' | 'reinforce_base' | 'spy_opponent' | 'energy_refill';
  duration: number;
  quantity: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'distance' | 'conquest' | 'defense' | 'time';
  target: number;
  progress: number;
  reward: {
    xp: number;
    energy: number;
    items?: string[];
  };
  expiresAt: Date;
  completed: boolean;
}

export interface Notification {
  id: string;
  type: 'invasion' | 'conquest' | 'defense' | 'achievement' | 'challenge';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export interface RunSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  distance: number;
  duration: number;
  pace: number;
  calories: number;
  route: [number, number][];
  territoriesConquered: string[];
  xpGained: number;
  active: boolean;
}

export type GameMode = 'solo' | 'domination' | 'team' | 'stealth';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  avatar: string;
  score: number;
  territories: number;
  level: number;
}
