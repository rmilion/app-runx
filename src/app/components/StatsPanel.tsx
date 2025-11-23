"use client"

import { TrendingUp, Activity, Flame, Target, Calendar, Award } from "lucide-react"

export function StatsPanel() {
  const stats = {
    totalDistance: 127.5,
    totalRuns: 34,
    totalTime: "42h 15m",
    avgSpeed: 8.5,
    calories: 12450,
    territories: 23,
    level: 12,
    xp: 2450,
    xpToNext: 3000,
  }

  const weeklyData = [
    { day: "Seg", distance: 5.2, territories: 2 },
    { day: "Ter", distance: 8.1, territories: 3 },
    { day: "Qua", distance: 6.5, territories: 2 },
    { day: "Qui", distance: 10.2, territories: 5 },
    { day: "Sex", distance: 7.8, territories: 3 },
    { day: "Sáb", distance: 12.5, territories: 6 },
    { day: "Dom", distance: 9.3, territories: 4 },
  ]

  const maxDistance = Math.max(...weeklyData.map(d => d.distance))

  return (
    <div className="h-full overflow-y-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
          Suas Estatísticas
        </h2>
        <p className="text-gray-400 text-sm">Acompanhe seu progresso e conquistas</p>
      </div>

      {/* Level e XP */}
      <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-black text-white">
              {stats.level}
            </div>
            <div>
              <div className="text-white font-black text-xl">Nível {stats.level}</div>
              <div className="text-gray-400 text-sm">Corredor Elite</div>
            </div>
          </div>
          <Award className="w-8 h-8 text-yellow-400" />
        </div>
        
        {/* Barra de XP */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-cyan-400 font-bold">{stats.xp} XP</span>
            <span className="text-gray-400">{stats.xpToNext} XP</span>
          </div>
          <div className="h-3 bg-black/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${(stats.xp / stats.xpToNext) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Stats principais */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400/70 text-xs font-bold uppercase">Distância Total</span>
          </div>
          <div className="text-3xl font-black text-white">{stats.totalDistance}</div>
          <div className="text-gray-400 text-sm">km percorridos</div>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400/70 text-xs font-bold uppercase">Corridas</span>
          </div>
          <div className="text-3xl font-black text-white">{stats.totalRuns}</div>
          <div className="text-gray-400 text-sm">corridas completas</div>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-pink-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-pink-400" />
            <span className="text-pink-400/70 text-xs font-bold uppercase">Velocidade Média</span>
          </div>
          <div className="text-3xl font-black text-white">{stats.avgSpeed}</div>
          <div className="text-gray-400 text-sm">km/h</div>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-orange-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400/70 text-xs font-bold uppercase">Calorias</span>
          </div>
          <div className="text-3xl font-black text-white">{stats.calories}</div>
          <div className="text-gray-400 text-sm">kcal queimadas</div>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-green-400" />
            <span className="text-green-400/70 text-xs font-bold uppercase">Territórios</span>
          </div>
          <div className="text-3xl font-black text-white">{stats.territories}</div>
          <div className="text-gray-400 text-sm">conquistados</div>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400/70 text-xs font-bold uppercase">Tempo Total</span>
          </div>
          <div className="text-2xl font-black text-white">{stats.totalTime}</div>
          <div className="text-gray-400 text-sm">em movimento</div>
        </div>
      </div>

      {/* Gráfico semanal */}
      <div className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6">
        <h3 className="text-white font-black text-lg mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          Atividade Semanal
        </h3>
        
        <div className="flex items-end justify-between gap-2 h-40">
          {weeklyData.map((day) => (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col items-center gap-1">
                <div className="text-xs text-cyan-400 font-bold">{day.territories}</div>
                <div
                  className="w-full bg-gradient-to-t from-cyan-500 to-purple-600 rounded-t-lg transition-all duration-500 hover:opacity-80"
                  style={{ height: `${(day.distance / maxDistance) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-400 font-bold">{day.day}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded"></div>
            <span className="text-gray-400">Distância (km)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">Territórios conquistados</span>
          </div>
        </div>
      </div>
    </div>
  )
}
