'use client';

import React from 'react';
import { Trophy, TrendingUp, MapPin, Zap, Target, Award } from 'lucide-react';
import { UserStats } from '@/lib/types';

interface StatsPanelProps {
  stats: UserStats;
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800">
      <h2 className="text-white text-2xl font-bold mb-6">Estatísticas</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800/50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-cyan-400" />
            <span className="text-gray-400 text-sm">Distância Total</span>
          </div>
          <div className="text-white text-2xl font-bold">{(stats.totalDistance / 1000).toFixed(1)} km</div>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-400 text-sm">Territórios</span>
          </div>
          <div className="text-white text-2xl font-bold">{stats.territoriesConquered}</div>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-green-400" />
            <span className="text-gray-400 text-sm">Corridas</span>
          </div>
          <div className="text-white text-2xl font-bold">{stats.totalRuns}</div>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-orange-400" />
            <span className="text-gray-400 text-sm">Calorias</span>
          </div>
          <div className="text-white text-2xl font-bold">{stats.calories}</div>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span className="text-gray-400 text-sm">Ritmo Médio</span>
          </div>
          <div className="text-white text-2xl font-bold">{stats.avgPace.toFixed(1)}/km</div>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-pink-400" />
            <span className="text-gray-400 text-sm">Sequência</span>
          </div>
          <div className="text-white text-2xl font-bold">{stats.currentStreak} dias</div>
        </div>
      </div>
    </div>
  );
}
