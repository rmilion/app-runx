'use client';

import React from 'react';
import { Map, Trophy, Target, Users, User, Settings } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'map', label: 'Mapa', icon: Map },
    { id: 'missions', label: 'Missões', icon: Target },
    { id: 'leaderboard', label: 'Ranking', icon: Trophy },
    { id: 'stats', label: 'Stats', icon: Users },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="bg-gray-900 border-t border-gray-800">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-all ${
                isActive
                  ? 'text-cyan-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-xs font-semibold">{tab.label}</span>
              {isActive && (
                <div className="w-8 h-1 bg-cyan-400 rounded-full mt-1" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
