"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Truck, Star, Shield, Clock, CheckCircle2, ArrowRight, MapPin, Zap } from "lucide-react"

interface ConcludeChangeModalProps {
  isOpen: boolean
  onClose: () => void
  mudanca: any
}

const TRANSPORTADORAS = [
  {
    id: "t1",
    nome: "Logística Express",
    motorista: "Carlos Silva",
    avaliacao: 4.9,
    viagens: 1250,
    preco: 450.00,
    tempoChegada: "15 min",
    premium: true,
    destaque: "Melhor Avaliação",
  },
  {
    id: "t2",
    nome: "Muda Já",
    motorista: "Roberto Santos",
    avaliacao: 4.7,
    viagens: 800,
    preco: 380.00,
    tempoChegada: "25 min",
    premium: false,
    destaque: "Mais Barato",
  },
  {
    id: "t3",
    nome: "Frete Prime",
    motorista: "Ana Oliveira",
    avaliacao: 5.0,
    viagens: 320,
    preco: 520.00,
    tempoChegada: "10 min",
    premium: true,
    destaque: "Mais Rápido",
  },
]

export function ConcludeChangeModal({ isOpen, onClose, mudanca }: ConcludeChangeModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isConfirming, setIsConfirming] = useState(false)

  const selectedTransp = TRANSPORTADORAS.find(t => t.id === selectedId)

  const handleConfirm = () => {
    setIsConfirming(true)
    setTimeout(() => {
      setIsConfirming(false)
      onClose()
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-xl w-full p-0 overflow-hidden rounded-2xl gap-0 sm:max-w-xl">
        <DialogTitle className="sr-only">Concluir Mudança — Selecionar Transportadora</DialogTitle>

        {/* ── Header ── */}
        <div className="px-8 pt-8 pb-6 border-b border-zinc-800/60">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Solicitação de Mudança</p>
              <h2 className="text-2xl font-bold text-white">Escolha uma Transportadora</h2>
            </div>
            <div className="shrink-0 text-right space-y-0.5">
              <p className="text-[10px] text-zinc-600 uppercase font-bold">Volume</p>
              <p className="text-lg font-black text-primary">{mudanca.volume_total?.toFixed(1) || "—"} m³</p>
            </div>
          </div>

          {/* Route summary */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 space-y-1">
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" /> Origem
              </p>
              <p className="text-sm font-semibold text-white leading-snug">
                {mudanca.endereco_origem || "Não informado"}
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 space-y-1">
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-1">
                <MapPin size={9} className="text-zinc-500" /> Destino
              </p>
              <p className="text-sm font-semibold text-white leading-snug">
                {mudanca.endereco_destino || "Não informado"}
              </p>
            </div>
          </div>
        </div>

        {/* ── Transportadoras ── */}
        <div className="px-8 py-6 space-y-3 max-h-[380px] overflow-y-auto">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">
            {TRANSPORTADORAS.length} transportadoras disponíveis
          </p>

          {TRANSPORTADORAS.map(transp => {
            const isSelected = selectedId === transp.id
            return (
              <button
                key={transp.id}
                onClick={() => setSelectedId(transp.id)}
                className={`w-full text-left rounded-xl border-2 transition-all duration-200 overflow-hidden
                  ${isSelected
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
                  }`}
              >
                <div className="flex items-center gap-4 p-5">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors
                    ${isSelected ? "bg-primary/20" : "bg-zinc-800"}`}
                  >
                    <Truck size={22} className={isSelected ? "text-primary" : "text-zinc-400"} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-white">{transp.nome}</h4>
                      {transp.destaque && (
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full
                          ${isSelected ? "bg-primary/20 text-primary" : "bg-zinc-800 text-zinc-400"}`}>
                          {transp.destaque}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5">{transp.motorista}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-xs text-zinc-400">
                        <Star size={11} className="fill-yellow-400 text-yellow-400" />
                        <strong className="text-white">{transp.avaliacao}</strong>
                      </span>
                      <span className="flex items-center gap-1 text-xs text-zinc-500">
                        <Clock size={11} />
                        {transp.tempoChegada}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-zinc-500">
                        <Shield size={11} />
                        {transp.viagens.toLocaleString()} viagens
                      </span>
                    </div>
                  </div>

                  {/* Price + Check */}
                  <div className="text-right shrink-0 space-y-1">
                    <p className={`text-xl font-black ${isSelected ? "text-primary" : "text-white"}`}>
                      R$ {transp.preco.toFixed(2).replace(".", ",")}
                    </p>
                    {transp.premium && (
                      <div className="flex items-center gap-1 justify-end">
                        <Zap size={10} className="text-yellow-500" />
                        <span className="text-[9px] font-black text-yellow-500 uppercase">Premium</span>
                      </div>
                    )}
                    {isSelected && (
                      <div className="flex justify-end">
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <CheckCircle2 size={12} className="text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* ── Footer ── */}
        <div className="px-8 pb-8 pt-4 border-t border-zinc-800/60 space-y-4">
          {/* Trust signal */}
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <CheckCircle2 size={14} className="text-green-500 shrink-0" />
            <span>Pagamento seguro. O motorista só recebe após a conclusão da entrega.</span>
          </div>

          {/* Summary if selected */}
          {selectedTransp && (
            <div className="flex items-center justify-between py-3 px-4 bg-zinc-900 rounded-xl border border-zinc-800">
              <span className="text-sm text-zinc-400">{selectedTransp.nome}</span>
              <span className="text-sm font-black text-primary">R$ {selectedTransp.preco.toFixed(2).replace(".", ",")}</span>
            </div>
          )}

          <Button
            disabled={!selectedId || isConfirming}
            onClick={handleConfirm}
            className={`w-full h-12 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
              ${selectedId
                ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              }`}
          >
            {isConfirming
              ? "Processando..."
              : selectedId
              ? <>Confirmar Contratação <ArrowRight size={16} /></>
              : "Selecione uma opção acima"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
