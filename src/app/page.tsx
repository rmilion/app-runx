"use client"

import { useState, useEffect } from "react"
import { MapView } from "./components/MapView"
import { StatsPanel } from "./components/StatsPanel"
import { MissionsPanel } from "./components/MissionsPanel"
import { RunTracker } from "./components/RunTracker"
import { Navigation } from "./components/Navigation"
import { NotificationCenter } from "./components/NotificationCenter"
import { ProfilePanel } from "./components/ProfilePanel"
import { LeaderboardPanel } from "./components/LeaderboardPanel"

export default function Home() {
  const [activeView, setActiveView] = useState<"map" | "stats" | "missions" | "profile" | "leaderboard">("map")
  const [isRunning, setIsRunning] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [territories, setTerritories] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])

  // Solicitar permissão de localização
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Erro ao obter localização:", error)
          // Localização padrão (São Paulo)
          setUserLocation({ lat: -23.5505, lng: -46.6333 })
        }
      )
    }
  }, [])

  // Simular notificações
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newNotification = {
          id: Date.now(),
          type: Math.random() > 0.5 ? "invasion" : "conquest",
          message: Math.random() > 0.5 
            ? "🚨 Seu território está sendo invadido!" 
            : "🎉 Você conquistou um novo distrito!",
          timestamp: new Date(),
        }
        setNotifications(prev => [newNotification, ...prev].slice(0, 5))
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 overflow-hidden">
      {/* Header com logo e notificações */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-purple-500/20">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
              <span className="text-white font-black text-xl">RX</span>
            </div>
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              RUNX
            </h1>
          </div>
          
          <NotificationCenter notifications={notifications} />
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="h-full pt-16 pb-20">
        {activeView === "map" && (
          <MapView 
            userLocation={userLocation} 
            territories={territories}
            isRunning={isRunning}
          />
        )}
        {activeView === "stats" && <StatsPanel />}
        {activeView === "missions" && <MissionsPanel />}
        {activeView === "profile" && <ProfilePanel />}
        {activeView === "leaderboard" && <LeaderboardPanel />}
      </main>

      {/* Tracker de corrida flutuante */}
      {isRunning && (
        <RunTracker 
          onStop={() => setIsRunning(false)}
          onLocationUpdate={(location) => setUserLocation(location)}
        />
      )}

      {/* Navegação inferior */}
      <Navigation 
        activeView={activeView}
        onViewChange={setActiveView}
        isRunning={isRunning}
        onStartRun={() => setIsRunning(true)}
      />
    </div>
  )
}
