"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ArrowRight, Calendar, Truck, CheckCircle2, ChevronRight, Hash, Ruler } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConcludeChangeModal } from "./ConcludeChangeModal"
import { RouteThumbnail } from "./RouteThumbnail"

interface MudancaCardProps {
  mudanca: any
}

export function MudancaCard({ mudanca }: MudancaCardProps) {
  const [isConcludeOpen, setIsConcludeOpen] = useState(false)

  const isPendente = mudanca.status === 'PENDENTE'
  
  // Mock data for new UI elements
  const mockKm = Math.floor(Math.random() * 50) + 5
  const mockItemsCount = mudanca.itens?.length || Math.floor(mudanca.volume_total / 0.5) || 12

  return (
    <Card className="group overflow-hidden bg-white/[0.02] backdrop-blur-3xl border-white/5 hover:border-primary/40 transition-all duration-500 hover:translate-y-[-4px] flex flex-col h-full">
      {/* Visual Header: Route Thumbnail */}
      <div className="h-44 relative overflow-hidden">
        <RouteThumbnail />
        
        {/* Status Overlay */}
        <div className="absolute top-4 left-4 z-20">
          <Badge className={`
            ${mudanca.status === 'CONCLUIDA' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 
              mudanca.status === 'CONFIRMADA' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 
              'bg-orange-500/10 text-orange-400 border-orange-500/20'}
            backdrop-blur-md px-3 py-1 font-bold text-[10px] uppercase border
          `}>
            {mudanca.status === 'PENDENTE' ? 'Rascunho' : mudanca.status}
          </Badge>
        </div>

        {/* Info Pills */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
           <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-2 py-1 flex items-center gap-1.5">
              <Ruler size={10} className="text-primary" />
              <span className="text-[9px] font-black text-white">{mockKm}km</span>
           </div>
        </div>
      </div>

      <CardContent className="p-6 flex-1 flex flex-col space-y-6">
        <div className="space-y-4 flex-1">
          {/* Addresses */}
          <div className="space-y-4 relative">
            <div className="absolute left-[11px] top-[26px] bottom-[22px] w-[2px] bg-gradient-to-b from-primary to-transparent opacity-30" />
            
            <div className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <MapPin size={12} className="text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none">Origem</p>
                <p className="text-sm font-medium text-white/90 truncate max-w-[200px]">{mudanca.endereco_origem || "Endereço não definido"}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                <ArrowRight size={12} className="text-white/40" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none">Destino</p>
                <p className="text-sm font-medium text-white/90 truncate max-w-[200px]">{mudanca.endereco_destino || "Endereço não definido"}</p>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-4 pt-4">
             <div className="bg-white/[0.03] rounded-2xl p-3 border border-white/5 space-y-1">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                   <Hash size={10} className="text-primary" /> Itens
                </p>
                <p className="text-sm font-black text-white">{mockItemsCount} Unidades</p>
             </div>
             <div className="bg-white/[0.03] rounded-2xl p-3 border border-white/5 space-y-1">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                   <Truck size={10} className="text-primary" /> Volume
                </p>
                <p className="text-sm font-black text-white">{mudanca.volume_total}m³</p>
             </div>
          </div>
        </div>

        {/* Details Footer & Action */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 tracking-wide uppercase">
             <div className="flex items-center gap-2">
                <Calendar size={12} className="text-primary/60" />
                {new Date(mudanca.data_desejada).toLocaleDateString('pt-BR')}
             </div>
             <div className="text-white/40">
                {mudanca.caminhao?.nome || "Caminhão Estimado"}
             </div>
          </div>

          {isPendente && (
            <Button 
              onClick={() => setIsConcludeOpen(true)}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-widest rounded-xl shadow-xl shadow-primary/10 group overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Ver Orçamentos Disponíveis <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
          )}
        </div>
      </CardContent>

      <ConcludeChangeModal 
        isOpen={isConcludeOpen} 
        onClose={() => setIsConcludeOpen(false)} 
        mudanca={mudanca}
      />
    </Card>
  )
}
