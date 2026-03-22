"use client"

import React, { useState } from "react"
import { 
  Search, Clock, MapPin, Truck, X,
  CheckCircle, AlertCircle, Loader2, Plus
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const STATUS_STYLES: Record<string, { label: string; bg: string; text: string }> = {
  AGUARDANDO_MOTORISTA: { label: "Aguardando Motorista", bg: "bg-orange-500/10", text: "text-orange-400" },
  PENDENTE:  { label: "Rascunho",   bg: "bg-zinc-800", text: "text-zinc-400" },
  COTACAO:   { label: "Em Cotação", bg: "bg-blue-500/10", text: "text-blue-400" },
  AGENDADA:  { label: "Agendada",   bg: "bg-yellow-500/10", text: "text-yellow-400" },
  CONCLUIDA: { label: "Concluída",  bg: "bg-green-500/10", text: "text-green-400" },
}

// ── Slide-in Detail Drawer ──
function RecordDrawer({ record, onClose }: { record: any; onClose: () => void }) {
  const s = STATUS_STYLES[record.status] || STATUS_STYLES.PENDENTE
  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-zinc-900 border-l border-white/[0.06] z-50 flex flex-col shadow-2xl animate-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Pedido #{record.id.slice(-8).toUpperCase()}</p>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold ${s.bg} ${s.text}`}>
            {s.label}
          </span>
        </div>
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Progress bar (for orders waiting driver) */}
      {record.status === "AGUARDANDO_MOTORISTA" && (
        <div className="px-6 py-4 border-b border-white/[0.06] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-medium flex items-center gap-2">
              <Loader2 size={12} className="text-orange-400 animate-spin" />
              Encontrando motoristas próximos...
            </span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-orange-400 rounded-full animate-pulse" />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-1.5 text-[10px] font-bold text-zinc-300 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              + Taxa Prioritária
            </button>
            <button className="flex-1 py-1.5 text-[10px] font-bold text-zinc-300 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              Rastrear Pedido
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* ROUTE */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Rota</h4>
            <button className="text-[10px] font-bold text-primary hover:underline">Editar</button>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-1 w-3 h-3 rounded-full border-2 border-primary shrink-0" />
              <div>
                <p className="text-[10px] text-zinc-600 font-bold uppercase">Coleta</p>
                <p className="text-sm text-white">{record.endereco_origem || "A definir"}</p>
              </div>
            </div>
            <div className="ml-1.5 w-px h-4 bg-zinc-700" />
            <div className="flex items-start gap-3">
              <MapPin size={14} className="text-zinc-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] text-zinc-600 font-bold uppercase">Entrega</p>
                <p className="text-sm text-white">{record.endereco_destino || "A definir"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* DELIVERY INFO */}
        <section className="space-y-3">
          <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Informações de Entrega</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">Tipo de veículo</span>
              <span className="text-white font-medium">{record.caminhao?.nome || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Volume</span>
              <span className="text-white font-medium">{record.volume_total?.toFixed(1)} m³</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Data</span>
              <span className="text-white font-medium">{new Date(record.data_desejada || record.createdAt).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        </section>

        {/* PRICE */}
        <section className="space-y-3">
          <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Preço</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">Frete base</span>
              <span className="text-white">A calcular</span>
            </div>
            <div className="flex justify-between border-t border-white/[0.06] pt-2">
              <span className="text-white font-bold">Total</span>
              <span className="text-primary font-black">A definir</span>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      {record.status === "PENDENTE" && (
        <div className="p-6 border-t border-white/[0.06]">
          <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-10 text-sm">
            Confirmar Cotação
          </Button>
          <button className="w-full text-xs text-zinc-500 hover:text-red-400 mt-3 transition-colors font-semibold">
            Cancelar Pedido
          </button>
        </div>
      )}
    </div>
  )
}

// ── Records View ──
export function RecordsView({ mudancas }: { mudancas: any[] }) {
  const [search, setSearch] = useState("")
  const [activeRecord, setActiveRecord] = useState<any>(null)
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = mudancas.filter(m => {
    const matchSearch = !search || 
      m.id.toLowerCase().includes(search.toLowerCase()) ||
      (m.endereco_origem || "").toLowerCase().includes(search.toLowerCase()) ||
      (m.endereco_destino || "").toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || m.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Registros</h1>
          <p className="text-zinc-500 text-sm mt-1">Histórico completo das suas mudanças</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={15} />
          <Input
            placeholder="Buscar por endereço ou ID..."
            className="pl-10 h-10 bg-zinc-900 border-white/[0.08] rounded-xl text-sm text-white placeholder:text-zinc-600 focus:border-primary/50"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="h-10 px-4 bg-zinc-900 border border-white/[0.08] rounded-xl text-sm text-zinc-300 focus:outline-none focus:border-primary/50"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="all">Status: Todos</option>
          <option value="PENDENTE">Rascunho</option>
          <option value="COTACAO">Em Cotação</option>
          <option value="AGENDADA">Agendada</option>
          <option value="CONCLUIDA">Concluída</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-zinc-900 border border-white/[0.06] rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[180px_180px_1fr_1fr_80px] gap-4 px-6 py-3 bg-white/[0.02] border-b border-white/5">
          {["Status", "Horário de Coleta", "Rota", "Motorista", ""].map(h => (
            <span key={h} className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{h}</span>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center text-zinc-500 text-sm">
            <Search size={32} className="mx-auto mb-3 text-zinc-700" />
            Nenhum registro encontrado.
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {filtered.map(m => {
              const s = STATUS_STYLES[m.status] || STATUS_STYLES.PENDENTE
              const isActive = activeRecord?.id === m.id
              return (
                <div
                  key={m.id}
                  onClick={() => setActiveRecord(isActive ? null : m)}
                  className={`grid grid-cols-[180px_180px_1fr_1fr_80px] gap-4 px-6 py-4 items-center cursor-pointer transition-all hover:bg-white/[0.03] ${isActive ? "bg-primary/5 border-l-2 border-l-primary" : ""}`}
                >
                  {/* Status */}
                  <div className="space-y-0.5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold ${s.bg} ${s.text}`}>
                      {s.label}
                    </span>
                    <p className="text-[10px] text-zinc-600 font-mono pl-1">#{m.id.slice(-8).toUpperCase()}</p>
                  </div>

                  {/* Time */}
                  <div className="space-y-0.5">
                    <p className="text-sm text-white flex items-center gap-1.5">
                      <Clock size={12} className="text-zinc-500" />
                      {new Date(m.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-[10px] text-zinc-500 pl-4">
                      {new Date(m.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                    </p>
                  </div>

                  {/* Route */}
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-sm text-white flex items-center gap-1 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {m.endereco_origem || "Origem a definir"}
                    </p>
                    <p className="text-sm text-zinc-400 flex items-center gap-1 truncate">
                      <MapPin size={10} className="text-zinc-600 shrink-0" />
                      {m.endereco_destino || "Destino a definir"}
                    </p>
                  </div>

                  {/* Driver */}
                  <div className="space-y-0.5">
                    <p className="text-sm text-zinc-400">N/A</p>
                    <p className="text-[10px] text-zinc-600">{m.caminhao?.nome || "—"}</p>
                  </div>

                  {/* Actions */}
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-primary hover:underline cursor-pointer">
                      {isActive ? "Fechar" : "Ver"}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Detail Drawer */}
      {activeRecord && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setActiveRecord(null)}
          />
          <RecordDrawer record={activeRecord} onClose={() => setActiveRecord(null)} />
        </>
      )}
    </div>
  )
}
