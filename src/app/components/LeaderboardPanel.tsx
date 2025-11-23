'use client';

import React from 'react';
import { Trophy, Medal, Award, Crown } from 'lucide-react';
import { LeaderboardEntry } from '@/lib/types';

interface LeaderboardPanelProps {
  entries: LeaderboardEntry[];
  currentUserId: string;
}

export default function LeaderboardPanel({ entries, currentUserId }: LeaderboardPanelProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-400" />;
      default:
        return <Trophy className="w-5 h-5 text-gray-500" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500 to-orange-500';
      case 2:
        return 'from-gray-400 to-gray-600';
      case 3:
        return 'from-orange-500 to-red-500';
      default:
        return 'from-gray-700 to-gray-800';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800">
      <h2 className="text-white text-2xl font-bold mb-6">Ranking Global</h2>

      <div className="space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.userId}
            className={`relative overflow-hidden rounded-xl border transition-all ${
              entry.userId === currentUserId
                ? 'border-cyan-500 bg-cyan-500/10'
                : 'border-gray-700 bg-gray-800/30'
            }`}
          >
            <div className="p-4 flex items-center gap-4">
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${getRankColor(entry.rank)}`}>
                {getRankIcon(entry.rank)}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-bold">{entry.userName}</span>
                  {entry.userId === currentUserId && (
                    <span className="bg-cyan-500 text-white text-xs px-2 py-0.5 rounded-full">Você</span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-400">Nível {entry.level}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-cyan-400">{entry.territories} territórios</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-white text-2xl font-bold">{entry.score.toLocaleString()}</div>
                <div className="text-gray-400 text-xs">pontos</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
