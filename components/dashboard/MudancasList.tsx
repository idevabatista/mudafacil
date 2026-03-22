"use client"

import React, { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  MapPin, Calendar, Truck, Package, ChevronRight, 
  ArrowLeft, RefreshCw, MoreVertical, ChevronDown, 
  Pencil, Trash2, X, Check, Loader2
} from "lucide-react"
import { ConcludeChangeModal } from "./ConcludeChangeModal"
import { deleteMudanca, updateMudancaEnderecos } from "@/app/actions/simulation"

const STATUS_MAP: Record<string, { label: string; dot: string; text: string; bg: string }> = {
  PENDENTE:  { label: "Rascunho",   dot: "bg-zinc-500", text: "text-zinc-400",   bg: "bg-zinc-800" },
  COTACAO:   { label: "Em Cotação", dot: "bg-blue-400",  text: "text-blue-400",  bg: "bg-blue-500/10" },
  AGENDADA:  { label: "Agendada",   dot: "bg-orange-400",text: "text-orange-400",bg: "bg-orange-500/10" },
  CONCLUIDA: { label: "Concluída",  dot: "bg-green-400", text: "text-green-400", bg: "bg-green-500/10" },
}

// ────────────────────────────────────────────────
// Edit Addresses Modal (inline)
// ────────────────────────────────────────────────
function EditAddressModal({ mudanca, onClose }: { mudanca: any; onClose: () => void }) {
  const [origem, setOrigem] = useState(mudanca.endereco_origem || "")
  const [destino, setDestino] = useState(mudanca.endereco_destino || "")
  const [isPending, startTransition] = useTransition()

  const handleSave = () => {
    startTransition(async () => {
      await updateMudancaEnderecos(mudanca.id, origem, destino)
      onClose()
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-full max-w-md shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Editar Endereços</h3>
            <p className="text-xs text-zinc-500 mt-0.5">Pedido #{mudanca.id.slice(-6).toUpperCase()}</p>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
              <span className="w-2 h-2 bg-primary rounded-full" /> Endereço de Coleta (Origem)
            </label>
            <Input
              value={origem}
              onChange={e => setOrigem(e.target.value)}
              placeholder="Ex: Rua das Flores, 123, São Paulo - SP"
              className="h-11 bg-zinc-800 border-zinc-700 focus:border-primary/60 text-white placeholder:text-zinc-600 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
              <MapPin size={10} className="text-zinc-500" /> Endereço de Entrega (Destino)
            </label>
            <Input
              value={destino}
              onChange={e => setDestino(e.target.value)}
              placeholder="Ex: Av. Paulista, 1000, São Paulo - SP"
              className="h-11 bg-zinc-800 border-zinc-700 focus:border-primary/60 text-white placeholder:text-zinc-600 rounded-xl"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-zinc-700 text-zinc-400 hover:text-white bg-transparent"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={isPending}
            className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold"
          >
            {isPending ? <Loader2 size={14} className="animate-spin" /> : <><Check size={14} className="mr-1" /> Salvar</>}
          </Button>
        </div>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────
// Row actions menu
// ────────────────────────────────────────────────
function RowActions({ mudanca, onEdit, onDelete }: { mudanca: any; onEdit: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative" onClick={e => e.stopPropagation()}>
      <button 
        onClick={() => setOpen(v => !v)}
        className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
      >
        <MoreVertical size={16} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-9 z-20 bg-zinc-800 border border-zinc-700 rounded-xl shadow-2xl py-1 w-44 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => { setOpen(false); onEdit() }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              <Pencil size={13} /> Editar Endereços
            </button>
            <div className="border-t border-zinc-700 my-1" />
            <button
              onClick={() => { setOpen(false); onDelete() }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 size={13} /> Apagar Cotação
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// ────────────────────────────────────────────────
// Google Maps route thumbnail
// ────────────────────────────────────────────────
function RouteMapThumb({ origem, destino }: { origem?: string; destino?: string }) {
  const hasAddresses = origem && destino && origem !== "A definir" && destino !== "A definir"

  if (!hasAddresses) {
    return (
      <div className="mx-6 h-36 rounded-xl bg-zinc-800 border border-white/[0.04] flex flex-col items-center justify-center gap-2 text-zinc-600">
        <MapPin size={24} />
        <p className="text-xs font-semibold text-center leading-snug px-4">
          Adicione origem e destino para ver o mapa
        </p>
      </div>
    )
  }

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origem!)}&destination=${encodeURIComponent(destino!)}&travelmode=driving`

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mx-6 h-36 rounded-xl overflow-hidden border border-white/[0.04] block relative group"
    >
      <iframe
        src={`https://maps.google.com/maps?q=${encodeURIComponent(destino!)}&output=embed&z=13`}
        className="w-full h-full pointer-events-none scale-110"
        loading="lazy"
        title="Mapa da rota"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-between p-3">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/90 truncate flex-1">
          <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
          <span className="truncate">{origem?.split(",")[0]}</span>
          <span className="text-zinc-500 shrink-0">→</span>
          <span className="truncate">{destino?.split(",")[0]}</span>
        </div>
        <span className="text-[9px] font-bold text-zinc-300 group-hover:text-white transition-colors shrink-0 ml-2 bg-black/30 px-1.5 py-0.5 rounded">
          Ver rota ↗
        </span>
      </div>
    </a>
  )
}

// ────────────────────────────────────────────────
// Detail View
// ────────────────────────────────────────────────
function MudancaDetail({ mudanca, onBack }: { mudanca: any; onBack: () => void }) {
  const [concludeOpen, setConcludeOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const s = STATUS_MAP[mudanca.status] || STATUS_MAP.PENDENTE

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft size={16} /> Voltar
        </button>
        <div className="flex items-center gap-3">
          <span className={`flex items-center gap-1.5 text-xs font-semibold ${s.text}`}>
            <span className={`w-2 h-2 rounded-full ${s.dot}`} /> {s.label}
          </span>
          <button 
            onClick={() => setEditOpen(true)}
            className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white text-xs font-semibold transition-all"
          >
            <Pencil size={12} /> Editar Endereços
          </button>
          {mudanca.status === "PENDENTE" && (
            <Button onClick={() => setConcludeOpen(true)} className="h-8 px-4 bg-primary hover:bg-primary/90 text-white text-xs font-bold">
              Ver Orçamentos
            </Button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-zinc-900 border border-white/[0.06] rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Coleta (Pick-up)</h3>
            <InfoRow icon={<MapPin size={14} />} label="Endereço" value={mudanca.endereco_origem || "A definir"} />
          </div>
          <div className="bg-zinc-900 border border-white/[0.06] rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Entrega (Drop-off)</h3>
            <InfoRow icon={<MapPin size={14} />} label="Endereço" value={mudanca.endereco_destino || "A definir"} />
          </div>
          <div className="bg-zinc-900 border border-white/[0.06] rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Informações de Entrega</h3>
            <InfoRow icon={<Truck size={14} />} label="Veículo" value={mudanca.caminhao?.nome || "A definir"} />
            <InfoRow icon={<Package size={14} />} label="Volume" value={`${mudanca.volume_total?.toFixed(1) || "—"} m³`} />
            <InfoRow icon={<Calendar size={14} />} label="Data" value={new Date(mudanca.data_desejada).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} />
          </div>
          {mudanca.itens?.length > 0 && (
            <div className="bg-zinc-900 border border-white/[0.06] rounded-2xl p-6 space-y-3">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Itens ({mudanca.itens.length})</h3>
              {mudanca.itens.map((mi: any, i: number) => (
                <div key={i} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-sm text-white">{mi.item?.nome || 'Item'}</span>
                  <span className="text-xs text-zinc-500">x{mi.quantidade} · {((mi.item?.volume_m3 || 0) * mi.quantidade).toFixed(1)} m³</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-zinc-900 border border-white/[0.06] rounded-2xl overflow-hidden sticky top-24">
            <div className="px-6 pt-6 pb-3">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Resumo</h3>
            </div>

            {/* Map thumbnail */}
            <RouteMapThumb origem={mudanca.endereco_origem} destino={mudanca.endereco_destino} />

            {/* Fields */}
            <div className="px-6 pb-6 pt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Order ID</span>
                <span className="text-white font-mono text-xs font-bold">#{mudanca.id.slice(-8).toUpperCase()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Status</span>
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg ${s.bg} ${s.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{s.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Criado em</span>
                <span className="text-white text-xs">{new Date(mudanca.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Veículo</span>
                <span className="text-white font-medium">{mudanca.caminhao?.nome || "—"}</span>
              </div>
            </div>

            {mudanca.status === "PENDENTE" && (
              <div className="px-6 pb-6 pt-2 border-t border-white/5">
                <Button onClick={() => setConcludeOpen(true)} className="w-full h-10 bg-primary hover:bg-primary/90 text-white font-bold text-sm">
                  Ver Orçamentos Disponíveis
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConcludeChangeModal isOpen={concludeOpen} onClose={() => setConcludeOpen(false)} mudanca={mudanca} />
      {editOpen && <EditAddressModal mudanca={mudanca} onClose={() => setEditOpen(false)} />}
    </div>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-zinc-500 mt-0.5">{icon}</span>
      <div>
        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{label}</p>
        <p className="text-sm text-white font-medium mt-0.5">{value}</p>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────
// Confirm Delete Dialog
// ────────────────────────────────────────────────
function DeleteConfirmDialog({ mudanca, onClose }: { mudanca: any; onClose: () => void }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      await deleteMudanca(mudanca.id)
      onClose()
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-full max-w-sm shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200 text-center">
        <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto">
          <Trash2 size={24} className="text-red-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Apagar Cotação?</h3>
          <p className="text-sm text-zinc-400 mt-1">
            O pedido <span className="text-white font-mono font-bold">#{mudanca.id.slice(-6).toUpperCase()}</span> será removido permanentemente.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 border-zinc-700 text-zinc-400 hover:text-white bg-transparent">
            Cancelar
          </Button>
          <Button onClick={handleDelete} disabled={isPending} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold">
            {isPending ? <Loader2 size={14} className="animate-spin" /> : "Apagar"}
          </Button>
        </div>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────
// Main List
// ────────────────────────────────────────────────
export function MudancasList({ mudancas }: { mudancas: any[] }) {
  const [detail, setDetail] = useState<any>(null)
  const [selected, setSelected] = useState<string[]>([])
  const [editTarget, setEditTarget] = useState<any>(null)
  const [deleteTarget, setDeleteTarget] = useState<any>(null)

  if (detail) {
    return <MudancaDetail mudanca={detail} onBack={() => setDetail(null)} />
  }

  const allSelected = selected.length === mudancas.length && mudancas.length > 0
  const toggleAll = () => setSelected(allSelected ? [] : mudancas.map(m => m.id))
  const toggleOne = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const handleBulkDelete = async () => {
    for (const id of selected) await deleteMudanca(id)
    setSelected([])
  }

  if (mudancas.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Minhas Mudanças</h1>
          <p className="text-zinc-500 text-sm mt-1">Nenhuma solicitação ainda.</p>
        </div>
        <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed border-white/5 rounded-2xl">
          <div className="w-20 h-20 rounded-3xl bg-white/[0.03] flex items-center justify-center mb-6 border border-white/5">
            <Truck size={36} className="text-zinc-600" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Nenhuma mudança encontrada</h3>
          <p className="text-zinc-500 max-w-sm text-sm">
            Clique em <strong className="text-primary">+ Nova Mudança</strong> no topo para começar.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Minhas Mudanças</h1>
          <p className="text-zinc-500 text-sm mt-1">{mudancas.length} {mudancas.length === 1 ? "solicitação" : "solicitações"}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-zinc-500 hover:text-white transition-colors">
            <RefreshCw size={15} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white text-sm font-semibold transition-all">
            Ordenar <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 border border-white/[0.06] rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[40px_130px_170px_1fr_160px_80px_48px] gap-4 px-6 py-3 border-b border-white/5 bg-white/[0.02] items-center">
          <input type="checkbox" checked={allSelected} onChange={toggleAll} className="w-4 h-4 accent-primary" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Order ID</span>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Data</span>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Rota</span>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Veículo</span>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Itens</span>
          <span />
        </div>

        <div className="divide-y divide-white/[0.04]">
          {mudancas.map(m => {
            const s = STATUS_MAP[m.status] || STATUS_MAP.PENDENTE
            const isSelected = selected.includes(m.id)

            return (
              <div
                key={m.id}
                onClick={() => setDetail(m)}
                className={`grid grid-cols-[40px_130px_170px_1fr_160px_80px_48px] gap-4 px-6 py-4 items-center cursor-pointer group transition-all
                  hover:bg-white/[0.03] ${isSelected ? "bg-primary/5" : ""}`}
              >
                {/* Checkbox */}
                <div onClick={e => { e.stopPropagation(); toggleOne(m.id) }}>
                  <input type="checkbox" checked={isSelected} onChange={() => {}} className="w-4 h-4 accent-primary" />
                </div>

                {/* Order ID + Status */}
                <div className="space-y-1">
                  <span className="text-sm font-mono font-bold text-white group-hover:text-primary transition-colors">
                    #{m.id.slice(-6).toUpperCase()}
                  </span>
                  <div className={`flex items-center gap-1 text-[10px] font-bold ${s.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} /> {s.label}
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-0.5">
                  <p className="text-sm text-white">{new Date(m.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  <p className="text-[10px] text-zinc-500">{new Date(m.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>

                {/* Route */}
                <div className="min-w-0 space-y-0.5">
                  <p className="text-sm text-white truncate flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {m.endereco_origem || <span className="text-zinc-600 italic">Origem a definir</span>}
                  </p>
                  <p className="text-sm text-zinc-500 truncate flex items-center gap-1.5">
                    <MapPin size={10} className="shrink-0 text-zinc-600" />
                    {m.endereco_destino || (
                      <button onClick={e => { e.stopPropagation(); setEditTarget(m) }} className="text-primary hover:underline font-semibold">
                        + Definir destino
                      </button>
                    )}
                  </p>
                </div>

                {/* Vehicle */}
                <div>
                  {m.caminhao ? (
                    <div className="flex items-center gap-2">
                      <Truck size={14} className="text-zinc-500" />
                      <span className="text-sm text-white">{m.caminhao.nome}</span>
                    </div>
                  ) : <span className="text-sm text-zinc-600">—</span>}
                </div>

                {/* Items */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white font-semibold">{m.itens?.length || 0}</span>
                  {m.itens?.length > 0 && <ChevronDown size={14} className="text-zinc-500" />}
                </div>

                {/* Actions */}
                <div onClick={e => e.stopPropagation()} className="flex items-center justify-center">
                  <RowActions
                    mudanca={m}
                    onEdit={() => setEditTarget(m)}
                    onDelete={() => setDeleteTarget(m)}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bulk action bar */}
      {selected.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-zinc-800 border border-white/10 rounded-2xl px-6 py-3 flex items-center gap-6 shadow-2xl animate-in slide-in-from-bottom-4 duration-300 z-50">
          <span className="text-sm font-bold text-white">{selected.length} selecionadas</span>
          <button
            onClick={handleBulkDelete}
            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors font-semibold"
          >
            <Trash2 size={13} /> Apagar selecionadas
          </button>
          <button onClick={() => setSelected([])} className="text-xs text-zinc-500 hover:text-white transition-colors font-semibold">
            Desmarcar
          </button>
        </div>
      )}

      {/* Edit modal */}
      {editTarget && <EditAddressModal mudanca={editTarget} onClose={() => setEditTarget(null)} />}

      {/* Delete confirm */}
      {deleteTarget && <DeleteConfirmDialog mudanca={deleteTarget} onClose={() => setDeleteTarget(null)} />}
    </div>
  )
}
