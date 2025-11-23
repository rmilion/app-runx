"use client"

import { Target, CheckCircle2, Clock, Zap, Trophy, Flame } from "lucide-react"

export function MissionsPanel() {
  const dailyMissions = [
    {
      id: 1,
      title: "Corrida Matinal",
      description: "Corra 3 km antes das 10h",
      progress: 2.1,
      goal: 3,
      reward: 150,
      type: "distance",
      completed: false,
    },
    {
      id: 2,
      title: "Conquistador",
      description: "Conquiste 2 novos territórios",
      progress: 1,
      goal: 2,
      reward: 200,
      type: "territory",
      completed: false,
    },
    {
      id: 3,
      title: "Defensor",
      description: "Reforce 3 territórios existentes",
      progress: 3,
      goal: 3,
      reward: 100,
      type: "defense",
      completed: true,
    },
  ]

  const weeklyMissions = [
    {
      id: 4,
      title: "Maratonista",
      description: "Corra 25 km esta semana",
      progress: 18.5,
      goal: 25,
      reward: 500,
      type: "distance",
      completed: false,
    },
    {
      id: 5,
      title: "Dominador",
      description: "Mantenha 15 territórios ativos",
      progress: 12,
      goal: 15,
      reward: 750,
      type: "territory",
      completed: false,
    },
  ]

  const specialMissions = [
    {
      id: 6,
      title: "Rei do Bairro",
      description: "Domine completamente um bairro",
      progress: 65,
      goal: 100,
      reward: 1000,
      type: "special",
      completed: false,
    },
  ]

  const renderMissionCard = (mission: any) => {
    const progressPercent = (mission.progress / mission.goal) * 100
    const isCompleted = mission.completed

    return (
      <div
        key={mission.id}
        className={`bg-black/40 backdrop-blur-md border rounded-xl p-4 transition-all duration-300 ${
          isCompleted
            ? "border-green-500/50 bg-green-500/10"
            : "border-purple-500/30 hover:border-purple-500/50"
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {mission.type === "distance" && <Zap className="w-4 h-4 text-cyan-400" />}
              {mission.type === "territory" && <Target className="w-4 h-4 text-purple-400" />}
              {mission.type === "defense" && <Trophy className="w-4 h-4 text-orange-400" />}
              {mission.type === "special" && <Flame className="w-4 h-4 text-pink-400" />}
              <h3 className="text-white font-bold">{mission.title}</h3>
            </div>
            <p className="text-gray-400 text-sm">{mission.description}</p>
          </div>
          
          {isCompleted && (
            <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
          )}
        </div>

        {/* Barra de progresso */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-cyan-400 font-bold">
              {mission.progress} / {mission.goal}
            </span>
            <span className="text-yellow-400 font-bold">+{mission.reward} XP</span>
          </div>
          <div className="h-2 bg-black/40 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isCompleted
                  ? "bg-gradient-to-r from-green-500 to-emerald-600"
                  : "bg-gradient-to-r from-cyan-500 to-purple-600"
              }`}
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
          Missões
        </h2>
        <p className="text-gray-400 text-sm">Complete missões para ganhar XP e recompensas</p>
      </div>

      {/* Missões Diárias */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-cyan-400" />
          <h3 className="text-white font-black text-lg">Missões Diárias</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
        </div>
        <div className="space-y-3">
          {dailyMissions.map(renderMissionCard)}
        </div>
      </div>

      {/* Missões Semanais */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-purple-400" />
          <h3 className="text-white font-black text-lg">Missões Semanais</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
        </div>
        <div className="space-y-3">
          {weeklyMissions.map(renderMissionCard)}
        </div>
      </div>

      {/* Missões Especiais */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-pink-400" />
          <h3 className="text-white font-black text-lg">Missões Especiais</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-pink-500/50 to-transparent"></div>
        </div>
        <div className="space-y-3">
          {specialMissions.map(renderMissionCard)}
        </div>
      </div>

      {/* Recompensas disponíveis */}
      <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 backdrop-blur-md border border-yellow-500/30 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-black text-lg mb-1">Recompensas Disponíveis</h3>
            <p className="text-yellow-400 text-sm">Complete missões para desbloquear</p>
          </div>
          <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            850 XP
          </div>
        </div>
      </div>
    </div>
  )
}
