"use client"

import { Map, BarChart3, Target, User, Trophy, Play } from "lucide-react"

interface NavigationProps {
  activeView: "map" | "stats" | "missions" | "profile" | "leaderboard"
  onViewChange: (view: "map" | "stats" | "missions" | "profile" | "leaderboard") => void
  isRunning: boolean
  onStartRun: () => void
}

export function Navigation({ activeView, onViewChange, isRunning, onStartRun }: NavigationProps) {
  const navItems = [
    { id: "map" as const, icon: Map, label: "Mapa" },
    { id: "stats" as const, icon: BarChart3, label: "Stats" },
    { id: "missions" as const, icon: Target, label: "Missões" },
    { id: "leaderboard" as const, icon: Trophy, label: "Ranking" },
    { id: "profile" as const, icon: User, label: "Perfil" },
  ]

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-t border-purple-500/20">
      <div className="relative flex items-center justify-around px-2 py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeView === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/50"
                  : "hover:bg-white/5"
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? "text-cyan-400" : "text-gray-400"
                }`}
              />
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  isActive ? "text-cyan-400" : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400"></div>
              )}
            </button>
          )
        })}
      </div>

      {/* Botão de iniciar corrida (flutuante) */}
      {!isRunning && (
        <button
          onClick={onStartRun}
          className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50 hover:scale-110 transition-transform duration-300 border-4 border-black"
        >
          <Play className="w-7 h-7 text-white fill-white ml-1" />
        </button>
      )}
    </nav>
  )
}
