'use client';

import React from 'react';
import { User, Trophy, Zap, Settings, Edit, Crown } from 'lucide-react';
import { User as UserType } from '@/lib/types';
import { XP_LEVELS } from '@/lib/constants';

interface ProfilePanelProps {
  user: UserType;
  onEditProfile?: () => void;
}

export default function ProfilePanel({ user, onEditProfile }: ProfilePanelProps) {
  const currentLevel = XP_LEVELS.find(l => l.level === user.level);
  const nextLevel = XP_LEVELS.find(l => l.level === user.level + 1);
  const xpProgress = nextLevel ? ((user.xp - (currentLevel?.xpRequired || 0)) / (nextLevel.xpRequired - (currentLevel?.xpRequired || 0))) * 100 : 100;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800">
      {/* Profile Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
            {user.avatar || user.name.charAt(0).toUpperCase()}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full p-2">
            <Crown className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-white text-2xl font-bold">{user.name}</h2>
            <button
              onClick={onEditProfile}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full text-white text-sm font-semibold">
              Nível {user.level}
            </div>
            <span className="text-gray-400 text-sm">{currentLevel?.title}</span>
          </div>

          {/* XP Progress */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-400 text-xs">Experiência</span>
              <span className="text-white text-xs font-semibold">
                {user.xp} / {nextLevel?.xpRequired || user.xp} XP
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gray-800/50 p-3 rounded-xl text-center">
          <Trophy className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
          <div className="text-white text-lg font-bold">{user.territories.length}</div>
          <div className="text-gray-400 text-xs">Territórios</div>
        </div>

        <div className="bg-gray-800/50 p-3 rounded-xl text-center">
          <Zap className="w-5 h-5 text-orange-400 mx-auto mb-1" />
          <div className="text-white text-lg font-bold">{user.energy}</div>
          <div className="text-gray-400 text-xs">Energia</div>
        </div>

        <div className="bg-gray-800/50 p-3 rounded-xl text-center">
          <Crown className="w-5 h-5 text-purple-400 mx-auto mb-1" />
          <div className="text-white text-lg font-bold">{user.stats.battlesWon}</div>
          <div className="text-gray-400 text-xs">Vitórias</div>
        </div>
      </div>

      {/* Inventory */}
      <div className="mb-6">
        <h3 className="text-white font-bold mb-3">Inventário</h3>
        <div className="grid grid-cols-4 gap-2">
          {user.inventory.boosts.map((boost, index) => (
            <div
              key={index}
              className="bg-gray-800/50 p-3 rounded-lg text-center border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer"
            >
              <Zap className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
              <div className="text-white text-xs font-semibold">{boost.quantity}x</div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Button */}
      <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all">
        <Settings className="w-5 h-5" />
        Configurações
      </button>
    </div>
  );
}
