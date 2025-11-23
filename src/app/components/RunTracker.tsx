'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Zap, Timer, Navigation, TrendingUp } from 'lucide-react';
import { RunSession } from '@/lib/types';
import { ANTI_CHEAT, ENERGY_CONFIG } from '@/lib/constants';

interface RunTrackerProps {
  onRunStart: () => void;
  onRunPause: () => void;
  onRunStop: (session: RunSession) => void;
  energy: number;
  onEnergyUpdate: (energy: number) => void;
}

export default function RunTracker({ 
  onRunStart, 
  onRunPause, 
  onRunStop,
  energy,
  onEnergyUpdate
}: RunTrackerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pace, setPace] = useState(0);
  const [calories, setCalories] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [route, setRoute] = useState<[number, number][]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setDuration(d => d + 1);
        
        // Simulate GPS tracking
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const newPoint: [number, number] = [
                position.coords.latitude,
                position.coords.longitude
              ];
              
              // Anti-cheat validation
              if (validateMovement(position)) {
                setRoute(prev => [...prev, newPoint]);
                updateMetrics(position);
              }
            },
            (error) => console.error('GPS Error:', error),
            { enableHighAccuracy: true, maximumAge: 0 }
          );
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  const validateMovement = (position: GeolocationPosition): boolean => {
    const speed = position.coords.speed || 0;
    const speedKmh = speed * 3.6;

    // Check if speed is within valid range
    if (speedKmh > ANTI_CHEAT.maxSpeed || speedKmh < ANTI_CHEAT.minSpeed) {
      return false;
    }

    // Check GPS accuracy
    if (position.coords.accuracy > ANTI_CHEAT.minAccuracy) {
      return false;
    }

    // Check for GPS jumps
    if (route.length > 0) {
      const lastPoint = route[route.length - 1];
      const distanceJump = calculateDistance(
        lastPoint[0], lastPoint[1],
        position.coords.latitude, position.coords.longitude
      );

      if (distanceJump > ANTI_CHEAT.maxGpsJump) {
        return false;
      }
    }

    return true;
  };

  const updateMetrics = (position: GeolocationPosition) => {
    if (route.length > 0) {
      const lastPoint = route[route.length - 1];
      const distanceIncrement = calculateDistance(
        lastPoint[0], lastPoint[1],
        position.coords.latitude, position.coords.longitude
      );

      setDistance(d => d + distanceIncrement);
      setCurrentSpeed((position.coords.speed || 0) * 3.6);
      
      // Update pace (min/km)
      if (distance > 0 && duration > 0) {
        setPace((duration / 60) / (distance / 1000));
      }

      // Update calories (rough estimate)
      setCalories(Math.round(distance * 0.063));

      // Consume energy
      const energyCost = (distanceIncrement / 1000) * ENERGY_CONFIG.costPerKm;
      onEnergyUpdate(Math.max(0, energy - energyCost));
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const handleStart = () => {
    if (energy < 10) {
      alert('Energia insuficiente! Aguarde a recarga.');
      return;
    }

    setIsRunning(true);
    setIsPaused(false);
    onRunStart();
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    onRunPause();
  };

  const handleStop = () => {
    const session: RunSession = {
      id: Date.now().toString(),
      userId: 'current-user',
      startTime: new Date(Date.now() - duration * 1000),
      endTime: new Date(),
      distance,
      duration,
      pace,
      calories,
      route,
      territoriesConquered: [],
      xpGained: Math.round(distance / 100),
      active: false,
    };

    onRunStop(session);
    
    // Reset
    setIsRunning(false);
    setIsPaused(false);
    setDistance(0);
    setDuration(0);
    setPace(0);
    setCalories(0);
    setRoute([]);
  };

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDistance = (meters: number): string => {
    return (meters / 1000).toFixed(2);
  };

  const formatPace = (minPerKm: number): string => {
    const mins = Math.floor(minPerKm);
    const secs = Math.round((minPerKm - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800">
      {/* Energy Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-semibold">Energia</span>
          </div>
          <span className="text-yellow-400 font-bold">{energy}/{ENERGY_CONFIG.maxEnergy}</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all duration-300"
            style={{ width: `${(energy / ENERGY_CONFIG.maxEnergy) * 100}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800/50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <Navigation className="w-4 h-4 text-cyan-400" />
            <span className="text-gray-400 text-sm">Distância</span>
          </div>
          <div className="text-white text-2xl font-bold">{formatDistance(distance)} km</div>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <Timer className="w-4 h-4 text-purple-400" />
            <span className="text-gray-400 text-sm">Tempo</span>
          </div>
          <div className="text-white text-2xl font-bold">{formatTime(duration)}</div>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-gray-400 text-sm">Ritmo</span>
          </div>
          <div className="text-white text-2xl font-bold">{formatPace(pace)}/km</div>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-gray-400 text-sm">Calorias</span>
          </div>
          <div className="text-white text-2xl font-bold">{calories} kcal</div>
        </div>
      </div>

      {/* Speed Indicator */}
      {isRunning && (
        <div className="mb-6 bg-gray-800/50 p-4 rounded-xl">
          <div className="text-gray-400 text-sm mb-2">Velocidade Atual</div>
          <div className="flex items-baseline gap-2">
            <span className="text-white text-3xl font-bold">{currentSpeed.toFixed(1)}</span>
            <span className="text-gray-400">km/h</span>
          </div>
          {currentSpeed > ANTI_CHEAT.maxSpeed && (
            <div className="mt-2 text-red-400 text-xs">⚠️ Velocidade muito alta - movimento não será contabilizado</div>
          )}
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex gap-3">
        {!isRunning ? (
          <button
            onClick={handleStart}
            disabled={energy < 10}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Play className="w-6 h-6" />
            Iniciar Corrida
          </button>
        ) : (
          <>
            <button
              onClick={handlePause}
              className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all flex items-center justify-center gap-2"
            >
              {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
              {isPaused ? 'Retomar' : 'Pausar'}
            </button>
            <button
              onClick={handleStop}
              className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-red-500/50 transition-all flex items-center justify-center gap-2"
            >
              <Square className="w-6 h-6" />
              Finalizar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
