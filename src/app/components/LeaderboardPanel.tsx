"use client"

import { Trophy, Medal, Crown, TrendingUp, Users } from "lucide-react"

export function LeaderboardPanel() {
  const leaderboard = [
    {
      rank: 1,
      name: "Thunder Runner",
      avatar: "TR",
      territories: 156,
      distance: 342.5,
      level: 28,
      color: "from-yellow-400 to-orange-500",
    },
    {
      rank: 2,
      name: "Speed Demon",
      avatar: "SD",
      territories: 142,
      distance: 318.2,
      level: 26,
      color: "from-gray-300 to-gray-400",
    },
    {
      rank: 3,
      name: "Urban Warrior",
      avatar: "UW",
      territories: 128,
      distance: 295.8,
      level: 24,
      color: "from-orange-400 to-orange-600",
    },
    {
      rank: 4,
      name: "Night Runner",
      avatar: "NR",
      territories: 115,
      distance: 276.3,
      level: 23,
      color: "from-purple-400 to-purple-600",
    },
    {
      rank: 5,
      name: "City Conqueror",
      avatar: "CC",
      territories: 98,
      distance: 245.7,
      level: 21,
      color: "from-blue-400 to-blue-600",
    },
    {
      rank: 12,
      name: "Você",
      avatar: "VC",
      territories: 23,
      distance: 127.5,
      level: 12,
      color: "from-cyan-400 to-purple-600",
      isYou: true,
    },
  ]

  const teams = [
    { name: "Equipe Alpha", members: 45, territories: 523, color: "from-red-500 to-pink-600" },
    { name: "Equipe Beta", members: 38, territories: 487, color: "from-blue-500 to-cyan-600" },
    { name: "Equipe Gamma", members: 42, territories: 456, color: "from-green-500 to-emerald-600" },
  ]

  return (
    <div className="h-full overflow-y-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
          Ranking Global
        </h2>
        <p className="text-gray-400 text-sm">Compete com corredores do mundo todo</p>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg text-sm whitespace-nowrap">
          Global
        </button>
        <button className="px-4 py-2 bg-black/40 text-gray-400 font-bold rounded-lg text-sm whitespace-nowrap hover:bg-black/60 transition-colors border border-purple-500/30">
          Região
        </button>
        <button className="px-4 py-2 bg-black/40 text-gray-400 font-bold rounded-lg text-sm whitespace-nowrap hover:bg-black/60 transition-colors border border-purple-500/30">
          Amigos
        </button>
        <button className="px-4 py-2 bg-black/40 text-gray-400 font-bold rounded-lg text-sm whitespace-nowrap hover:bg-black/60 transition-colors border border-purple-500/30">
          Semanal
        </button>
      </div>

      {/* Top 3 Pódio */}
      <div className="flex items-end justify-center gap-4 mb-6">
        {/* 2º Lugar */}
        <div className="flex flex-col items-center">
          <Medal className="w-8 h-8 text-gray-400 mb-2" />
          <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-xl font-black text-white mb-2">
            {leaderboard[1].avatar}
          </div>
          <div className="text-white font-bold text-sm text-center">{leaderboard[1].name}</div>
          <div className="text-gray-400 text-xs">{leaderboard[1].territories} territórios</div>
          <div className="mt-2 bg-gradient-to-t from-gray-400 to-gray-300 w-20 h-24 rounded-t-xl flex items-center justify-center">
            <span className="text-2xl font-black text-white">2</span>
          </div>
        </div>

        {/* 1º Lugar */}
        <div className="flex flex-col items-center -mt-4">
          <Crown className="w-10 h-10 text-yellow-400 mb-2 animate-pulse" />
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl font-black text-white mb-2 ring-4 ring-yellow-400/30">
            {leaderboard[0].avatar}
          </div>
          <div className="text-white font-bold text-sm text-center">{leaderboard[0].name}</div>
          <div className="text-yellow-400 text-xs font-bold">{leaderboard[0].territories} territórios</div>
          <div className="mt-2 bg-gradient-to-t from-yellow-500 to-yellow-400 w-24 h-32 rounded-t-xl flex items-center justify-center">
            <span className="text-3xl font-black text-white">1</span>
          </div>
        </div>

        {/* 3º Lugar */}
        <div className="flex flex-col items-center">
          <Medal className="w-8 h-8 text-orange-400 mb-2" />
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-xl font-black text-white mb-2">
            {leaderboard[2].avatar}
          </div>
          <div className="text-white font-bold text-sm text-center">{leaderboard[2].name}</div>
          <div className="text-gray-400 text-xs">{leaderboard[2].territories} territórios</div>
          <div className="mt-2 bg-gradient-to-t from-orange-500 to-orange-400 w-20 h-20 rounded-t-xl flex items-center justify-center">
            <span className="text-2xl font-black text-white">3</span>
          </div>
        </div>
      </div>

      {/* Lista completa */}
      <div className="space-y-2">
        {leaderboard.slice(3).map((player) => (
          <div
            key={player.rank}
            className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
              player.isYou
                ? "bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border-2 border-cyan-500/50"
                : "bg-black/40 border border-purple-500/20 hover:border-purple-500/40"
            }`}
          >
            {/* Rank */}
            <div className="w-8 text-center">
              <span className={`text-lg font-black ${player.isYou ? "text-cyan-400" : "text-gray-400"}`}>
                #{player.rank}
              </span>
            </div>

            {/* Avatar */}
            <div className={`w-12 h-12 bg-gradient-to-br ${player.color} rounded-full flex items-center justify-center text-white font-black`}>
              {player.avatar}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className={`font-bold ${player.isYou ? "text-cyan-400" : "text-white"}`}>
                {player.name}
              </div>
              <div className="text-gray-400 text-xs">Nível {player.level}</div>
            </div>

            {/* Stats */}
            <div className="text-right">
              <div className="text-white font-bold">{player.territories}</div>
              <div className="text-gray-400 text-xs">territórios</div>
            </div>

            <div className="text-right">
              <div className="text-white font-bold">{player.distance}</div>
              <div className="text-gray-400 text-xs">km</div>
            </div>
          </div>
        ))}
      </div>

      {/* Ranking de Equipes */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-purple-400" />
          <h3 className="text-white font-black text-lg">Ranking de Equipes</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
        </div>

        <div className="space-y-3">
          {teams.map((team, index) => (
            <div
              key={team.name}
              className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-4 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl font-black text-gray-400">#{index + 1}</div>
                <div className={`w-12 h-12 bg-gradient-to-br ${team.color} rounded-lg flex items-center justify-center`}>
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-bold">{team.name}</div>
                  <div className="text-gray-400 text-sm">{team.members} membros</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-xl">{team.territories}</div>
                  <div className="text-gray-400 text-xs">territórios</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
