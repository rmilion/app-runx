"use client";

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export type User = {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  level: number;
  xp: number;
  total_distance: number;
  total_time: number;
  territories_count: number;
  is_pro: boolean;
  subscription_end?: string;
  created_at: string;
};

export type Run = {
  id: string;
  user_id: string;
  distance: number;
  duration: number;
  calories: number;
  avg_speed: number;
  route: any; // GeoJSON
  territories_conquered: string[];
  started_at: string;
  ended_at: string;
};

export type Territory = {
  id: string;
  user_id: string;
  name: string;
  coordinates: any; // GeoJSON
  strength: number;
  conquered_at: string;
  last_defended: string;
};

export type Mission = {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special';
  target_value: number;
  reward_xp: number;
  reward_coins: number;
  expires_at?: string;
};

export type UserMission = {
  id: string;
  user_id: string;
  mission_id: string;
  progress: number;
  completed: boolean;
  completed_at?: string;
};

export type Notification = {
  id: string;
  user_id: string;
  type: 'invasion' | 'conquest' | 'achievement' | 'system';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
};
