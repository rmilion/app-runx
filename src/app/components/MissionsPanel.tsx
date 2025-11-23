'use client';

import React from 'react';
import { Target, Trophy, Clock, Flame } from 'lucide-react';
import { Mission } from '@/lib/types';

interface MissionsPanelProps {
  missions: Mission[];
  onMissionClick?: (mission: Mission) => void;
}

export default function MissionsPanel({ missions, onMissionClick }: MissionsPanelProps) {
  const getMissionIcon = (type: string) => {
    switch (type) {
      case 'distance':
        return <Target className="w-5 h-5" />;
      case 'conquest':
        return <Trophy className="w-5 h-5" />;
      case 'defense':
        return <Flame className="w-5 h-5" />;
      case 'time':
        return <Clock className="w-5 h-5" />;
      default:
        return <Target className="w-5 h-5" />;
    }
  };

  const getMissionColor = (type: string) => {
    switch (type) {
      case 'distance':
        return 'from-cyan-500 to-blue-600';
      case 'conquest':
        return 'from-purple-500 to-pink-600';
      case 'defense':
        return 'from-orange-500 to-red-600';
      case 'time':
        return 'from-green-500 to-emerald-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getTimeRemaining = (expiresAt: Date): string => {
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-bold">Missões Diárias</h2>
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1 rounded-full text-white text-sm font-semibold">
          {missions.filter(m => m.completed).length}/{missions.length}
        </div>
      </div>

      <div className="space-y-4">
        {missions.map((mission) => (
          <div
            key={mission.id}
            onClick={() => onMissionClick?.(mission)}
            className={`relative overflow-hidden rounded-xl border transition-all cursor-pointer ${
              mission.completed
                ? 'bg-gray-800/50 border-gray-700 opacity-60'
                : 'bg-gradient-to-r ' + getMissionColor(mission.type) + ' bg-opacity-10 border-gray-700 hover:border-gray-600 hover:shadow-lg'
            }`}
          >
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${getMissionColor(mission.type)}`}>
                  {getMissionIcon(mission.type)}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-white font-bold text-lg">{mission.title}</h3>
                      <p className="text-gray-400 text-sm">{mission.description}</p>
                    </div>
                    {!mission.completed && (
                      <div className="text-right">
                        <div className="text-orange-400 text-xs font-semibold">
                          ⏱️ {getTimeRemaining(mission.expiresAt)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-400 text-xs">Progresso</span>
                      <span className="text-white text-xs font-semibold">
                        {mission.progress}/{mission.target}
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r ${getMissionColor(mission.type)} h-full transition-all duration-300`}
                        style={{ width: `${Math.min((mission.progress / mission.target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Rewards */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm font-semibold">+{mission.reward.xp} XP</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span className="text-orange-400 text-sm font-semibold">+{mission.reward.energy} Energia</span>
                    </div>
                    {mission.reward.items && mission.reward.items.length > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-purple-400 text-sm font-semibold">+{mission.reward.items.length} Items</span>
                      </div>
                    )}
                  </div>

                  {mission.completed && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        ✓ COMPLETA
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {missions.length === 0 && (
        <div className="text-center py-12">
          <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Nenhuma missão disponível no momento</p>
        </div>
      )}
    </div>
  );
}
