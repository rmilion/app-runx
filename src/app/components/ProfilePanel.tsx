"use client"

import { User, Settings, Trophy, Target, Zap, Crown, Edit, LogOut } from "lucide-react"

export function ProfilePanel() {
  const profile = {
    name: "Corredor Elite",
    username: "@runnerx_2024",
    avatar: "CE",
    level: 12,
    xp: 2450,
    xpToNext: 3000,
    rank: 12,
    totalDistance: 127.5,
    totalRuns: 34,
    territories: 23,
    achievements: 18,
    joinDate: "Janeiro 2024",
  }

  const achievements = [
    { id: 1, name: "Primeiro Território", icon: Target, color: "from-blue-500 to-cyan-600", unlocked: true },
    { id: 2, name: "Maratonista", icon: Zap, color: "from-purple-500 to-pink-600", unlocked: true },
    { id: 3, name: "Dominador", icon: Crown, color: "from-yellow-400 to-orange-500", unlocked: true },
    { id: 4, name: "Conquistador", icon: Trophy, color: "from-green-500 to-emerald-600", unlocked: true },
    { id: 5, name: "Lenda Urbana", icon: Crown, color: "from-red-500 to-pink-600", unlocked: false },
    { id: 6, name: "Rei do Bairro", icon: Crown, color: "from-purple-500 to-purple-700", unlocked: false },
  ]

  const stats = [
    { label: "Distância Total", value: `${profile.totalDistance} km`, color: "text-cyan-400" },
    { label: "Corridas", value: profile.totalRuns, color: "text-purple-400" },
    { label: "Territórios", value: profile.territories, color: "text-pink-400" },
    { label: "Conquistas", value: profile.achievements, color: "text-orange-400" },
  ]

  return (
    <div className="h-full overflow-y-auto px-4 py-6 space-y-6">
      {/* Header do Perfil */}
      <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6">
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-black text-white ring-4 ring-purple-500/30">
              {profile.avatar}
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-black text-white border-2 border-black">
              {profile.level}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-black text-white mb-1">{profile.name}</h2>
            <p className="text-purple-400 text-sm mb-2">{profile.username}</p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>Membro desde {profile.joinDate}</span>
              <span>•</span>
              <span className="text-cyan-400 font-bold">Rank #{profile.rank}</span>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-2">
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              <Edit className="w-4 h-4 text-white" />
            </button>
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              <Settings className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Barra de XP */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-cyan-400 font-bold">Nível {profile.level}</span>
            <span className="text-gray-400">{profile.xp} / {profile.xpToNext} XP</span>
          </div>
          <div className="h-3 bg-black/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${(profile.xp / profile.xpToNext) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-4 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="text-gray-400 text-xs font-bold uppercase mb-1">{stat.label}</div>
            <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Conquistas */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <h3 className="text-white font-black text-lg">Conquistas</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-yellow-500/50 to-transparent"></div>
          <span className="text-gray-400 text-sm">{achievements.filter(a => a.unlocked).length}/{achievements.length}</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <div
                key={achievement.id}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                  achievement.unlocked
                    ? `bg-gradient-to-br ${achievement.color} hover:scale-105 cursor-pointer`
                    : "bg-black/40 border border-purple-500/20 opacity-40"
                }`}
              >
                <Icon className={`w-8 h-8 ${achievement.unlocked ? "text-white" : "text-gray-600"}`} />
                <span className={`text-[10px] font-bold text-center px-2 ${achievement.unlocked ? "text-white" : "text-gray-600"}`}>
                  {achievement.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Configurações Rápidas */}
      <div className="space-y-2">
        <button className="w-full bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-4 flex items-center justify-between hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-purple-400" />
            <span className="text-white font-bold">Configurações</span>
          </div>
          <div className="text-gray-400">›</div>
        </button>

        <button className="w-full bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-4 flex items-center justify-between hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-cyan-400" />
            <span className="text-white font-bold">Editar Perfil</span>
          </div>
          <div className="text-gray-400">›</div>
        </button>

        <button className="w-full bg-black/40 backdrop-blur-md border border-red-500/30 rounded-xl p-4 flex items-center justify-between hover:border-red-500/50 transition-all duration-300">
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5 text-red-400" />
            <span className="text-white font-bold">Sair</span>
          </div>
          <div className="text-gray-400">›</div>
        </button>
      </div>
    </div>
  )
}
