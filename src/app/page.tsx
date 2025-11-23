'use client';

import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import dynamic from 'next/dynamic';
import { User, Territory, Mission, Notification, RunSession, LeaderboardEntry } from '@/lib/types';
import { COLORS, ENERGY_CONFIG } from '@/lib/constants';

// Dynamic imports to avoid SSR issues
const MapView = dynamic(() => import('./components/MapView'), { ssr: false });
const RunTracker = dynamic(() => import('./components/RunTracker'), { ssr: false });
const MissionsPanel = dynamic(() => import('./components/MissionsPanel'), { ssr: false });
const StatsPanel = dynamic(() => import('./components/StatsPanel'), { ssr: false });
const LeaderboardPanel = dynamic(() => import('./components/LeaderboardPanel'), { ssr: false });
const ProfilePanel = dynamic(() => import('./components/ProfilePanel'), { ssr: false });
const NotificationCenter = dynamic(() => import('./components/NotificationCenter'), { ssr: false });
const Navigation = dynamic(() => import('./components/Navigation'), { ssr: false });

export default function RunXApp() {
  const [activeTab, setActiveTab] = useState('map');
  const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null);
  const [activeRoute, setActiveRoute] = useState<[number, number][]>([]);
  const [mounted, setMounted] = useState(false);
  
  // Mock User Data
  const [user, setUser] = useState<User>({
    id: 'current-user',
    name: 'Corredor Pro',
    avatar: '',
    level: 5,
    xp: 1250,
    energy: 85,
    maxEnergy: ENERGY_CONFIG.maxEnergy,
    territories: [],
    stats: {
      totalDistance: 45000,
      totalTime: 18000,
      totalRuns: 23,
      territoriesConquered: 12,
      territoriesLost: 3,
      battlesWon: 8,
      battlesLost: 2,
      currentStreak: 5,
      longestStreak: 12,
      calories: 2850,
      avgPace: 5.2,
    },
    inventory: {
      skins: [],
      avatars: [],
      flags: [],
      boosts: [
        { id: '1', name: 'Força Dupla', type: 'double_strength', duration: 300, quantity: 3 },
        { id: '2', name: 'Reforço de Base', type: 'reinforce_base', duration: 600, quantity: 2 },
      ],
    },
  });

  // Mock Territories
  const [territories, setTerritories] = useState<Territory[]>([
    {
      id: '1',
      coordinates: [
        [-23.5505, -46.6333],
        [-23.5515, -46.6333],
        [-23.5515, -46.6343],
        [-23.5505, -46.6343],
      ],
      ownerId: 'current-user',
      ownerName: 'Corredor Pro',
      strength: 85,
      capturedAt: new Date(),
      lastReinforced: new Date(),
      area: 875,
      color: COLORS.territories.owned,
    },
    {
      id: '2',
      coordinates: [
        [-23.5525, -46.6333],
        [-23.5535, -46.6333],
        [-23.5535, -46.6343],
        [-23.5525, -46.6343],
      ],
      ownerId: 'other-user',
      ownerName: 'Rival Runner',
      strength: 45,
      capturedAt: new Date(),
      lastReinforced: new Date(),
      area: 625,
      color: COLORS.territories.contested,
    },
  ]);

  // Mock Missions
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: '1',
      title: 'Maratona Diária',
      description: 'Corra 2 km para reforçar seus territórios',
      type: 'distance',
      target: 2000,
      progress: 1200,
      reward: { xp: 50, energy: 10 },
      expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000),
      completed: false,
    },
    {
      id: '2',
      title: 'Expansão',
      description: 'Conquiste 1 novo quarteirão',
      type: 'conquest',
      target: 1,
      progress: 0,
      reward: { xp: 75, energy: 15 },
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
      completed: false,
    },
    {
      id: '3',
      title: 'Defesa Ativa',
      description: 'Defenda uma área antes que ela caia',
      type: 'defense',
      target: 1,
      progress: 1,
      reward: { xp: 100, energy: 20 },
      expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000),
      completed: true,
    },
  ]);

  // Mock Notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'invasion',
      title: 'Território Invadido!',
      message: 'Rival Runner está tentando tomar seu território no Centro',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
    },
    {
      id: '2',
      type: 'conquest',
      title: 'Novo Território!',
      message: 'Você conquistou o quarteirão da Avenida Paulista',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Conquista Desbloqueada!',
      message: 'Você alcançou o nível 5 - Dominador',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
    },
  ]);

  // Mock Leaderboard
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { rank: 1, userId: 'user1', userName: 'Speed King', avatar: '', score: 15420, territories: 45, level: 8 },
    { rank: 2, userId: 'user2', userName: 'Territory Master', avatar: '', score: 12350, territories: 38, level: 7 },
    { rank: 3, userId: 'user3', userName: 'Run Emperor', avatar: '', score: 10890, territories: 32, level: 6 },
    { rank: 4, userId: 'current-user', userName: 'Corredor Pro', avatar: '', score: 8750, territories: 12, level: 5 },
    { rank: 5, userId: 'user5', userName: 'Fast Runner', avatar: '', score: 7230, territories: 28, level: 5 },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get user location
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to São Paulo
          setCurrentPosition([-23.5505, -46.6333]);
        }
      );
    } else {
      setCurrentPosition([-23.5505, -46.6333]);
    }
  }, []);

  // Energy regeneration
  useEffect(() => {
    const interval = setInterval(() => {
      setUser(prev => ({
        ...prev,
        energy: Math.min(prev.energy + ENERGY_CONFIG.regenRate, prev.maxEnergy),
      }));
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, []);

  const handleRunStart = () => {
    console.log('Run started');
  };

  const handleRunPause = () => {
    console.log('Run paused');
  };

  const handleRunStop = (session: RunSession) => {
    console.log('Run stopped:', session);
    
    // Update user stats
    setUser(prev => ({
      ...prev,
      xp: prev.xp + session.xpGained,
      stats: {
        ...prev.stats,
        totalDistance: prev.stats.totalDistance + session.distance,
        totalTime: prev.stats.totalTime + session.duration,
        totalRuns: prev.stats.totalRuns + 1,
        calories: prev.stats.calories + session.calories,
      },
    }));

    // Update missions progress
    setMissions(prev => prev.map(mission => {
      if (mission.type === 'distance' && !mission.completed) {
        const newProgress = mission.progress + session.distance;
        return {
          ...mission,
          progress: newProgress,
          completed: newProgress >= mission.target,
        };
      }
      return mission;
    }));
  };

  const handleNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleNotificationDismiss = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleEnergyUpdate = (newEnergy: number) => {
    setUser(prev => ({ ...prev, energy: newEnergy }));
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-lg inline-block mb-4">
            <Zap className="w-12 h-12 text-white animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            RUNX
          </h1>
          <p className="text-gray-400 mt-2">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-2 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                RUNX
              </h1>
              <p className="text-gray-400 text-xs">Conquiste o Mundo Correndo</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Energy Display */}
            <div className="bg-gray-900 px-4 py-2 rounded-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-yellow-400 font-bold">{user.energy}</div>
                <div className="text-gray-400 text-xs">Energia</div>
              </div>
            </div>

            {/* Notifications */}
            <NotificationCenter
              notifications={notifications}
              onNotificationRead={handleNotificationRead}
              onNotificationDismiss={handleNotificationDismiss}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4">
          {activeTab === 'map' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 h-[600px]">
                <MapView
                  territories={territories}
                  currentPosition={currentPosition}
                  activeRoute={activeRoute}
                />
              </div>
              <div>
                <RunTracker
                  onRunStart={handleRunStart}
                  onRunPause={handleRunPause}
                  onRunStop={handleRunStop}
                  energy={user.energy}
                  onEnergyUpdate={handleEnergyUpdate}
                />
              </div>
            </div>
          )}

          {activeTab === 'missions' && (
            <MissionsPanel missions={missions} />
          )}

          {activeTab === 'leaderboard' && (
            <LeaderboardPanel entries={leaderboard} currentUserId={user.id} />
          )}

          {activeTab === 'stats' && (
            <StatsPanel stats={user.stats} />
          )}

          {activeTab === 'profile' && (
            <ProfilePanel user={user} />
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
