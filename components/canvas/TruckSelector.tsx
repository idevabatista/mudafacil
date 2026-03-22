"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"

export interface Truck {
  id: string
  nome: string
  capacidade_m3: number
  capacidade_kg: number
  ocupacaoAtual: number
  icon: string
  description: string
  dimensions: string
}

export const TRUCKS: Truck[] = [
  { 
    id: "c1", nome: "Fiorino", capacidade_m3: 3.0, capacidade_kg: 600, ocupacaoAtual: 1.5, icon: "🚐",
    description: "Ideal para pequenas mudanças e itens avulsos.",
    dimensions: "1.6 x 1.2 x 1.1m"
  },
  { 
    id: "c2", nome: "HR / Baú Pequeno", capacidade_m3: 8.0, capacidade_kg: 1500, ocupacaoAtual: 3.2, icon: "🚚",
    description: "Perfeito para apartamentos pequenos ou conjuntos de mobília.", 
    dimensions: "3.2 x 1.6 x 1.6m"
  },
  { 
    id: "c3", nome: "3/4 Truck", capacidade_m3: 15.0, capacidade_kg: 3500, ocupacaoAtual: 6.8, icon: "🚛",
    description: "Recommended para mudanças de casa completa com todos os móveis.",
    dimensions: "5.4 x 1.8 x 1.9m"
  },
  { 
    id: "c4", nome: "Baú 6 Metros", capacidade_m3: 25.0, capacidade_kg: 7000, ocupacaoAtual: 18.5, icon: "🕋",
    description: "Ideal para mudanças de longa distância ou residências grandes.",
    dimensions: "6.0 x 2.0 x 2.2m"
  },
]

interface TruckSelectorProps {
  onTruckChange?: (truck: Truck) => void
  currentVolume?: number
}

export function TruckSelector({ onTruckChange, currentVolume }: TruckSelectorProps) {
  const [selectedId, setSelectedId] = useState<string>("c3")
  const selectedTruck = TRUCKS.find(t => t.id === selectedId) || TRUCKS[2]

  const handleSelect = (truck: Truck) => {
    setSelectedId(truck.id)
    onTruckChange?.({ ...truck, ocupacaoAtual: currentVolume ?? truck.ocupacaoAtual })
  }

  const displayVolume = currentVolume ?? selectedTruck.ocupacaoAtual
  const ocupacaoPercentual = Math.min(100, (displayVolume / selectedTruck.capacidade_m3) * 100)
  const isTooBig = displayVolume > selectedTruck.capacidade_m3

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Tipo de Veículo</h4>
        {currentVolume !== undefined && currentVolume > 0 && (
          <Badge variant="outline" className="text-[10px] font-bold border-white/10 bg-white/5 text-zinc-300">
            {currentVolume.toFixed(1)} m³ a transportar
          </Badge>
        )}
      </div>

      {/* Cards grid — Lalamove style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TRUCKS.map(truck => {
          const isSelected = selectedId === truck.id
          const fits = (currentVolume ?? truck.ocupacaoAtual) <= truck.capacidade_m3
          const notFit = typeof currentVolume === "number" && currentVolume > 0 && !fits

          return (
            <button
              key={truck.id}
              onClick={() => handleSelect(truck)}
              className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 w-full
                ${isSelected 
                  ? "border-primary bg-primary/5" 
                  : "border-white/[0.06] bg-zinc-900 hover:border-white/20"
                } ${notFit ? "opacity-40" : ""}`}
            >
              {/* Icon / illustration */}
              <div className="text-4xl shrink-0 mt-0.5 drop-shadow">{truck.icon}</div>

              {/* Info */}
              <div className="min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-sm font-bold ${isSelected ? "text-primary" : "text-white"}`}>{truck.nome}</p>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-black shrink-0">✓</div>
                  )}
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug">{truck.description}</p>
                <div className="flex items-center gap-1 text-[10px] text-zinc-600 font-mono">
                  📦 {truck.dimensions} · Até {truck.capacidade_kg.toLocaleString()} kg
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Occupation bar */}
      {displayVolume > 0 && (
        <div className="bg-zinc-900 border border-white/[0.06] rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-end text-sm">
            <span className="text-zinc-400 text-xs font-medium">Ocupação do {selectedTruck.nome}</span>
            <span className={`font-black text-base ${isTooBig ? "text-red-400" : "text-primary"}`}>
              {ocupacaoPercentual.toFixed(0)}%
            </span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-700 ${isTooBig ? "bg-red-400" : "bg-primary"}`}
              style={{ width: `${Math.min(100, ocupacaoPercentual)}%` }}
            />
          </div>
          {isTooBig && (
            <p className="text-xs text-red-400 font-semibold flex items-center gap-1">
              ⚠️ Volume excede a capacidade. Selecione um caminhão maior.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
