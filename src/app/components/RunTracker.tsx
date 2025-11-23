"use client"

import { Play, Square, MapPin, Timer, Zap } from "lucide-react"
import { useState, useEffect } from "react"

interface RunTrackerProps {
  onStop: () => void
  onLocationUpdate: (location: { lat: number; lng: number }) => void
}

export function RunTracker({ onStop, onLocationUpdate }: RunTrackerProps) {
  const [duration, setDuration] = useState(0)
  const [distance, setDistance] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [calories, setCalories] = useState(0)
  const [territoriesConquered, setTerritoriesConquered] = useState(0)

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(prev => prev + 1)
      
      // Simular progresso
      setDistance(prev => prev + (Math.random() * 0.01))
      setSpeed(5 + Math.random() * 3)
      setCalories(prev => prev + (Math.random() * 0.5))
      
      // Simular conquista de territórios
      if (Math.random() > 0.95) {
        setTerritoriesConquered(prev => prev + 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Rastrear localização
  useEffect(() => {
    const watchId = navigator.geolocation?.watchPosition(
      (position) => {
        onLocationUpdate({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => console.error("Erro ao rastrear localização:", error),
      { enableHighAccuracy: true }
    )

    return () => {
      if (watchId) navigator.geolocation?.clearWatch(watchId)
    }
  }, [onLocationUpdate])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md">
      <div className="bg-gradient-to-br from-black/90 to-purple-900/90 backdrop-blur-xl border-2 border-cyan-500/50 rounded-2xl shadow-2xl shadow-cyan-500/20 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              <span className="text-white font-black text-sm uppercase tracking-wider">Corrida Ativa</span>
            </div>
            <div className="flex items-center gap-1 text-white text-xs font-bold">
              <Zap className="w-3 h-3" />
              <span>+{territoriesConquered} territórios</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-4 grid grid-cols-2 gap-3">
          {/* Tempo */}
          <div className="bg-black/40 rounded-xl p-3 border border-cyan-500/20">
            <div className="flex items-center gap-2 mb-1">
              <Timer className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400/70 text-xs font-bold uppercase">Tempo</span>
            </div>
            <div className="text-2xl font-black text-white font-mono">{formatTime(duration)}</div>
          </div>

          {/* Distância */}
          <div className="bg-black/40 rounded-xl p-3 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400/70 text-xs font-bold uppercase">Distância</span>
            </div>
            <div className="text-2xl font-black text-white">{distance.toFixed(2)} <span className="text-sm">km</span></div>
          </div>

          {/* Velocidade */}
          <div className="bg-black/40 rounded-xl p-3 border border-pink-500/20">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-pink-400" />
              <span className="text-pink-400/70 text-xs font-bold uppercase">Velocidade</span>
            </div>
            <div className="text-2xl font-black text-white">{speed.toFixed(1)} <span className="text-sm">km/h</span></div>
          </div>

          {/* Calorias */}
          <div className="bg-black/40 rounded-xl p-3 border border-orange-500/20">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400/70 text-xs font-bold uppercase">Calorias</span>
            </div>
            <div className="text-2xl font-black text-white">{Math.floor(calories)} <span className="text-sm">kcal</span></div>
          </div>
        </div>

        {/* Botão de parar */}
        <div className="p-4 pt-0">
          <button
            onClick={onStop}
            className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-[1.02]"
          >
            <Square className="w-5 h-5 fill-white" />
            <span className="uppercase tracking-wider">Finalizar Corrida</span>
          </button>
        </div>
      </div>
    </div>
  )
}
