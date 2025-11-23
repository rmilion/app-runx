"use client"

import { Bell, X } from "lucide-react"
import { useState } from "react"

interface Notification {
  id: number
  type: "invasion" | "conquest" | "mission" | "level"
  message: string
  timestamp: Date
}

interface NotificationCenterProps {
  notifications: Notification[]
}

export function NotificationCenter({ notifications }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      {/* Botão de notificações */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-colors border border-purple-500/30"
      >
        <Bell className="w-5 h-5 text-purple-400" />
        {notifications.length > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white text-[10px] font-black border-2 border-black">
            {notifications.length}
          </div>
        )}
      </button>

      {/* Painel de notificações */}
      {isOpen && (
        <div className="absolute top-12 right-0 w-80 max-h-96 bg-black/95 backdrop-blur-xl border border-purple-500/30 rounded-xl shadow-2xl shadow-purple-500/20 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-purple-500/20">
            <h3 className="text-white font-black uppercase text-sm">Notificações</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Lista de notificações */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">
                Nenhuma notificação
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 border-b border-purple-500/10 hover:bg-white/5 transition-colors ${
                    notification.type === "invasion"
                      ? "border-l-4 border-l-red-500"
                      : notification.type === "conquest"
                      ? "border-l-4 border-l-green-500"
                      : "border-l-4 border-l-blue-500"
                  }`}
                >
                  <p className="text-white text-sm font-medium mb-1">
                    {notification.message}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
