"use client"

import React, { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const TRUCKS = [
  { id: "c1", nome: "Fiorino", capacidade_m3: 3.0, ocupacaoAtual: 1.5, icon: "🚐" },
  { id: "c2", nome: "HR", capacidade_m3: 8.0, ocupacaoAtual: 1.5, icon: "🚚" },
  { id: "c3", nome: "3/4", capacidade_m3: 15.0, ocupacaoAtual: 1.5, icon: "🚛" },
  { id: "c4", nome: "Baú", capacidade_m3: 25.0, ocupacaoAtual: 1.5, icon: "🕋" },
]

export function TruckSelector() {
  const [selectedTruck, setSelectedTruck] = useState(TRUCKS[1]) // Inicia com HR

  const ocupacaoPercentual = Math.min(100, Math.max(0, (selectedTruck.ocupacaoAtual / selectedTruck.capacidade_m3) * 100));
  const isOverCapacity = ocupacaoPercentual > 90;

  return (
    <div className="w-full mx-auto space-y-8">
      {/* Título interno do widget (opcional, para dar contexto) */}
      <div className="flex items-center justify-between px-1">
        <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Tamanho Ideal</h4>
        <Badge variant={isOverCapacity ? "destructive" : "secondary"} className="font-mono">
          {selectedTruck.capacidade_m3}m³ Total
        </Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        {TRUCKS.map((truck) => {
          const isSelected = selectedTruck.id === truck.id;
          return (
            <div
              key={truck.id}
              onClick={() => setSelectedTruck(truck)}
              className={`group relative flex flex-col items-center p-4 md:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ease-out 
              ${isSelected 
                ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(255,92,0,0.15)] -translate-y-1" 
                : "border-border/50 bg-card hover:border-primary/40 hover:bg-secondary/40 hover:-translate-y-1 hover:shadow-lg"
              }`}
            >
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm">
                  ✓
                </div>
              )}
              <div className={`text-4xl mb-3 transition-transform duration-300 ${isSelected ? "scale-110" : "group-hover:scale-110"}`}>
                {truck.icon}
              </div>
              <div className={`font-bold text-center ${isSelected ? "text-primary" : "text-foreground"}`}>
                {truck.nome}
              </div>
              <div className="text-xs font-medium text-muted-foreground mt-1">
                Até {truck.capacidade_m3} m³
              </div>
            </div>
          )
        })}
      </div>

      <div className="relative overflow-hidden p-6 rounded-2xl border border-border/50 bg-card shadow-sm space-y-4">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              Status da Carga <span className="text-muted-foreground font-normal">({selectedTruck.nome})</span>
            </h4>
            <p className="text-sm font-medium text-muted-foreground">
              <strong className="text-foreground">{selectedTruck.ocupacaoAtual} m³</strong> ocupados de {selectedTruck.capacidade_m3} m³
            </p>
          </div>
          <div className="text-right">
            <span className={`text-3xl font-black tabular-nums tracking-tighter ${
              isOverCapacity ? "text-destructive" : "text-primary"
            }`}>
              {ocupacaoPercentual.toFixed(1)}%
            </span>
          </div>
        </div>
        
        <div className="pt-2">
          <Progress 
            value={ocupacaoPercentual} 
            className={`h-3 ${isOverCapacity ? "bg-destructive/20" : "bg-primary/20"}`}
            // Note: Custom indicator color needs to be applied via CSS or a wrapped component if shadcn Progress doesn't support it directly.
            // In shadcn, the indicator usually takes the bg-primary class by default. We can leave it as is, and it will be primary (Orange).
          />
        </div>
        
        {isOverCapacity && (
          <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20 mt-4 font-medium animate-pulse">
            <span>⚠️</span> Atenção: O espaço deste veículo está no limite ou excedido. Considere um caminhão maior.
          </div>
        )}
      </div>
    </div>
  )
}
