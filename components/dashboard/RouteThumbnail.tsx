"use client"

import React from "react"
import { MapPin, Navigation } from "lucide-react"

export function RouteThumbnail() {
  return (
    <div className="w-full h-full bg-slate-950 relative overflow-hidden group">
      {/* City/Road Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px]" />
      </div>

      {/* Illustrative Route Line */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 92, 0, 0.2)" />
            <stop offset="50%" stopColor="rgba(255, 92, 0, 1)" />
            <stop offset="100%" stopColor="rgba(255, 92, 0, 0.2)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* The Path */}
        <path 
          d="M 40 120 Q 110 40 180 120" 
          fill="none" 
          stroke="url(#routeGradient)" 
          strokeWidth="3" 
          strokeLinecap="round"
          filter="url(#glow)"
          className="animate-[dash_3s_linear_infinite]"
          style={{ strokeDasharray: 10, strokeDashoffset: 100 }}
        />
      </svg>

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      {/* Start Point */}
      <div className="absolute left-[35px] top-[115px] z-10">
        <div className="relative">
          <div className="absolute -inset-2 bg-primary/20 rounded-full blur-sm animate-pulse" />
          <div className="w-3 h-3 bg-primary rounded-full border-2 border-white shadow-lg" />
        </div>
      </div>

      {/* End Point */}
      <div className="absolute right-[35px] top-[115px] z-10 text-primary">
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/10 rounded-full blur-md" />
          <Navigation size={18} className="rotate-45 drop-shadow-[0_0_8px_rgba(255,92,0,0.8)]" />
        </div>
      </div>

      {/* Overlay Text */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/5 flex items-center gap-2">
         <span className="text-[8px] font-black text-white/60 tracking-widest uppercase">Rota Estimada</span>
         <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
      </div>
    </div>
  )
}
