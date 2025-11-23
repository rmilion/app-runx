"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Zap, Shield, Target } from "lucide-react"

interface Territory {
  id: string
  lat: number
  lng: number
  owner: string
  strength: number
  color: string
}

interface MapViewProps {
  userLocation: { lat: number; lng: number } | null
  territories: Territory[]
  isRunning: boolean
}

export function MapView({ userLocation, territories, isRunning }: MapViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mockTerritories, setMockTerritories] = useState<Territory[]>([])

  // Gerar territórios mock para demonstração
  useEffect(() => {
    if (userLocation) {
      const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]
      const newTerritories: Territory[] = []
      
      for (let i = 0; i < 15; i++) {
        newTerritories.push({
          id: `territory-${i}`,
          lat: userLocation.lat + (Math.random() - 0.5) * 0.02,
          lng: userLocation.lng + (Math.random() - 0.5) * 0.02,
          owner: Math.random() > 0.5 ? "you" : `user-${Math.floor(Math.random() * 5)}`,
          strength: Math.floor(Math.random() * 100),
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
      
      setMockTerritories(newTerritories)
    }
  }, [userLocation])

  // Renderizar mapa tático
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !userLocation) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Limpar canvas
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Desenhar grid tático
    ctx.strokeStyle = "#1e293b"
    ctx.lineWidth = 1
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Desenhar territórios
    mockTerritories.forEach((territory) => {
      const x = ((territory.lng - userLocation.lng) * 10000) + canvas.width / 2
      const y = ((userLocation.lat - territory.lat) * 10000) + canvas.height / 2

      // Área de território
      ctx.fillStyle = territory.owner === "you" ? "#3b82f680" : territory.color + "40"
      ctx.beginPath()
      ctx.arc(x, y, 40, 0, Math.PI * 2)
      ctx.fill()

      // Borda
      ctx.strokeStyle = territory.owner === "you" ? "#3b82f6" : territory.color
      ctx.lineWidth = 2
      ctx.stroke()

      // Força do território
      ctx.fillStyle = "#fff"
      ctx.font = "12px monospace"
      ctx.textAlign = "center"
      ctx.fillText(`${territory.strength}%`, x, y + 4)
    })

    // Desenhar posição do usuário
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    
    ctx.fillStyle = "#06b6d4"
    ctx.shadowColor = "#06b6d4"
    ctx.shadowBlur = 20
    ctx.beginPath()
    ctx.arc(centerX, centerY, 8, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0

    // Pulso se estiver correndo
    if (isRunning) {
      ctx.strokeStyle = "#06b6d480"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
      ctx.stroke()
    }
  }, [userLocation, mockTerritories, isRunning])

  return (
    <div className="relative w-full h-full">
      {/* Canvas do mapa */}
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="absolute inset-0 w-full h-full"
      />

      {/* Overlay de informações */}
      <div className="absolute top-4 left-4 right-4 flex flex-col gap-3 pointer-events-none">
        {/* Stats rápidos */}
        <div className="flex gap-2">
          <div className="bg-black/60 backdrop-blur-md border border-cyan-500/30 rounded-xl px-4 py-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <div>
              <div className="text-[10px] text-cyan-400/70 uppercase font-bold">Territórios</div>
              <div className="text-lg font-black text-white">
                {mockTerritories.filter(t => t.owner === "you").length}
              </div>
            </div>
          </div>

          <div className="bg-black/60 backdrop-blur-md border border-purple-500/30 rounded-xl px-4 py-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <div>
              <div className="text-[10px] text-purple-400/70 uppercase font-bold">Força Total</div>
              <div className="text-lg font-black text-white">
                {mockTerritories
                  .filter(t => t.owner === "you")
                  .reduce((acc, t) => acc + t.strength, 0)}
              </div>
            </div>
          </div>

          <div className="bg-black/60 backdrop-blur-md border border-pink-500/30 rounded-xl px-4 py-2 flex items-center gap-2">
            <Target className="w-4 h-4 text-pink-400" />
            <div>
              <div className="text-[10px] text-pink-400/70 uppercase font-bold">Rank</div>
              <div className="text-lg font-black text-white">#12</div>
            </div>
          </div>
        </div>
      </div>

      {/* Legenda */}
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md border border-purple-500/30 rounded-xl px-4 py-3">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
            <span className="text-cyan-400 font-bold">Seus Territórios</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-purple-400 font-bold">Outros Jogadores</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-cyan-400" />
            <span className="text-white font-bold">Você</span>
          </div>
        </div>
      </div>

      {/* Indicador de modo corrida */}
      {isRunning && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl px-4 py-2 animate-pulse">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
            <span className="text-white font-black text-sm uppercase">Conquistando</span>
          </div>
        </div>
      )}
    </div>
  )
}
