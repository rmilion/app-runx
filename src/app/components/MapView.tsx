'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Zap, Shield, Swords } from 'lucide-react';
import { Territory } from '@/lib/types';
import { COLORS } from '@/lib/constants';

interface MapViewProps {
  territories: Territory[];
  currentPosition: [number, number] | null;
  activeRoute: [number, number][];
  onTerritoryClick?: (territory: Territory) => void;
}

export default function MapView({ 
  territories, 
  currentPosition, 
  activeRoute,
  onTerritoryClick 
}: MapViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(15);
  const [center, setCenter] = useState<[number, number]>(currentPosition || [-23.5505, -46.6333]);

  useEffect(() => {
    if (currentPosition) {
      setCenter(currentPosition);
    }
  }, [currentPosition]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Set canvas size to match container
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawGrid(ctx, canvas.width, canvas.height);

    // Draw territories
    territories.forEach(territory => {
      drawTerritory(ctx, territory);
    });

    // Draw active route
    if (activeRoute.length > 0) {
      drawRoute(ctx, activeRoute);
    }

    // Draw current position
    if (currentPosition) {
      drawCurrentPosition(ctx, currentPosition);
    }
  }, [territories, currentPosition, activeRoute, zoom, center]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;

    for (let x = 0; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y < height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawTerritory = (ctx: CanvasRenderingContext2D, territory: Territory) => {
    if (territory.coordinates.length < 3) return;

    ctx.fillStyle = territory.color + '40';
    ctx.strokeStyle = territory.color;
    ctx.lineWidth = 2;

    ctx.beginPath();
    const [startX, startY] = latLngToCanvas(territory.coordinates[0]);
    ctx.moveTo(startX, startY);

    territory.coordinates.forEach(coord => {
      const [x, y] = latLngToCanvas(coord);
      ctx.lineTo(x, y);
    });

    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw strength indicator
    const centerX = territory.coordinates.reduce((sum, c) => sum + c[0], 0) / territory.coordinates.length;
    const centerY = territory.coordinates.reduce((sum, c) => sum + c[1], 0) / territory.coordinates.length;
    const [cx, cy] = latLngToCanvas([centerX, centerY]);

    ctx.fillStyle = territory.color;
    ctx.font = 'bold 14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${territory.strength}`, cx, cy);
  };

  const drawRoute = (ctx: CanvasRenderingContext2D, route: [number, number][]) => {
    if (route.length < 2) return;

    ctx.strokeStyle = COLORS.primary;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Add glow effect
    ctx.shadowColor = COLORS.primary;
    ctx.shadowBlur = 10;

    ctx.beginPath();
    const [startX, startY] = latLngToCanvas(route[0]);
    ctx.moveTo(startX, startY);

    route.forEach(coord => {
      const [x, y] = latLngToCanvas(coord);
      ctx.lineTo(x, y);
    });

    ctx.stroke();
    ctx.shadowBlur = 0;
  };

  const drawCurrentPosition = (ctx: CanvasRenderingContext2D, position: [number, number]) => {
    const [x, y] = latLngToCanvas(position);

    // Outer pulse
    ctx.fillStyle = COLORS.primary + '40';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Inner circle
    ctx.fillStyle = COLORS.primary;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();

    // Center dot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  };

  const latLngToCanvas = (coord: [number, number]): [number, number] => {
    const canvas = canvasRef.current;
    if (!canvas) return [0, 0];

    const scale = Math.pow(2, zoom);
    const offsetX = (coord[1] - center[1]) * scale * 1000 + canvas.width / 2;
    const offsetY = (center[0] - coord[0]) * scale * 1000 + canvas.height / 2;

    return [offsetX, offsetY];
  };

  return (
    <div ref={containerRef} className="relative w-full h-[600px] bg-black rounded-2xl overflow-hidden border border-gray-800">
      {/* Canvas Map */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setZoom(z => Math.min(z + 1, 20))}
          className="bg-gray-900/90 backdrop-blur-sm text-white p-3 rounded-lg hover:bg-gray-800 transition-all shadow-lg"
        >
          <span className="text-xl font-bold">+</span>
        </button>
        <button
          onClick={() => setZoom(z => Math.max(z - 1, 10))}
          className="bg-gray-900/90 backdrop-blur-sm text-white p-3 rounded-lg hover:bg-gray-800 transition-all shadow-lg"
        >
          <span className="text-xl font-bold">−</span>
        </button>
        <button
          onClick={() => currentPosition && setCenter(currentPosition)}
          className="bg-gray-900/90 backdrop-blur-sm text-white p-3 rounded-lg hover:bg-gray-800 transition-all shadow-lg"
        >
          <Navigation className="w-5 h-5" />
        </button>
      </div>

      {/* Territory Stats Overlay */}
      <div className="absolute top-4 left-4 flex flex-wrap gap-3">
        <div className="bg-gray-900/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-green-400 text-2xl font-bold">
                {territories.filter(t => t.ownerId === 'current-user').length}
              </div>
              <div className="text-gray-400 text-xs">Seus Territórios</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-orange-400" />
            <div>
              <div className="text-orange-400 text-2xl font-bold">
                {territories.filter(t => t.strength < 50).length}
              </div>
              <div className="text-gray-400 text-xs">Em Disputa</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-400" />
            <div>
              <div className="text-red-400 text-2xl font-bold">
                {territories.filter(t => t.ownerId !== 'current-user').length}
              </div>
              <div className="text-gray-400 text-xs">Inimigos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <div className="text-white text-sm font-semibold mb-2">Legenda</div>
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.territories.owned }} />
            <span className="text-gray-300">Seus Territórios</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.territories.contested }} />
            <span className="text-gray-300">Em Disputa</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.territories.enemy }} />
            <span className="text-gray-300">Inimigos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
