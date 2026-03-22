"use client"

import React, { useState, useMemo, useRef, useCallback } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { saveSimulation } from "@/app/actions/simulation"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { 
  MapPin, ArrowRight, ChevronLeft, ChevronRight, Plus, Minus, 
  Loader2, Info, Users, Check, Search
} from "lucide-react"

// ── Vehicles ──────────────────────────────────────
const VEHICLES = [
  { id: "c1", nome: "Fiorino",   icon: "🚐", desc: "Pequenas entregas",  dims: "1.6×1.1×1.2m · 600kg",   m3: 3.0,  priceBase: 120 },
  { id: "c2", nome: "HR Baú",    icon: "🚚", desc: "Kit de apartamento", dims: "3.2×1.6×1.6m · 1.5t",   m3: 8.0,  priceBase: 280 },
  { id: "c3", nome: "Truck 3/4", icon: "🚛", desc: "Casa completa",      dims: "5.4×1.8×1.9m · 3.5t",   m3: 15.0, priceBase: 480 },
  { id: "c4", nome: "Baú 6m",   icon: "🕋", desc: "Grande distância",   dims: "6.0×2.0×2.2m · 7t",     m3: 25.0, priceBase: 780 },
  { id: "c5", nome: "Bitrem",    icon: "🚜", desc: "Mudança comercial",  dims: "14×2.4×3.0m · 20t",     m3: 60.0, priceBase: 1500 },
]

// ── Inventory rows (carrossel) ─────────────────────
const ITEM_ROWS = [
  [
    { id: "sofa",      nome: "Sofá",         vol: 1.5,  icon: "🛋️" },
    { id: "geladeira", nome: "Geladeira",    vol: 1.2,  icon: "🧊" },
    { id: "tv",        nome: 'TV 55"',       vol: 0.3,  icon: "📺" },
    { id: "cama_c",    nome: "Cama Casal",   vol: 1.8,  icon: "🛏️" },
  ],
  [
    { id: "micro",     nome: "Micro-ondas",  vol: 0.1,  icon: "📦" },
    { id: "armario",   nome: "Armário",      vol: 2.0,  icon: "🚪" },
    { id: "mesa",      nome: "Mesa",         vol: 0.8,  icon: "🪑" },
    { id: "maquina",   nome: "Máq. Lavar",   vol: 0.7,  icon: "🫧" },
  ],
  [
    { id: "cama_s",    nome: "Cama Solteiro",vol: 1.0,  icon: "🛏️" },
    { id: "escrivaninha", nome: "Escrivaninha", vol: 0.6, icon: "🪑" },
    { id: "bicicleta", nome: "Bicicleta",    vol: 0.5,  icon: "🚲" },
    { id: "caixa",     nome: "Caixa G",      vol: 0.2,  icon: "📦" },
  ],
  [
    { id: "estante",   nome: "Estante",      vol: 0.9,  icon: "📚" },
    { id: "fogao",     nome: "Fogão",        vol: 0.5,  icon: "🍳" },
    { id: "sideboard", nome: "Aparador",     vol: 0.7,  icon: "🪞" },
    { id: "piano",     nome: "Piano",        vol: 2.5,  icon: "🎹" },
  ],
]
const ALL_ITEMS = ITEM_ROWS.flat()

// ── CEP Hook ─────────────────────────────────────
function useViaCep() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchCep = useCallback(async (cep: string): Promise<{ logradouro: string; bairro: string; localidade: string; uf: string } | null> => {
    const clean = cep.replace(/\D/g, "")
    if (clean.length !== 8) return null
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`)
      const data = await res.json()
      if (data.erro) { setError("CEP não encontrado"); return null }
      return data
    } catch {
      setError("Erro ao buscar CEP")
      return null
    } finally { setLoading(false) }
  }, [])

  return { fetchCep, loading, error }
}

// ── CEP + Address block ─────────────────────────
function AddressBlock({
  label,
  colorClass,
  cep, setCep,
  rua, setRua,
  numero, setNumero,
  complemento, setComplemento,
  bairro, setBairro,
  cidade, setCidade,
}: any) {
  const { fetchCep, loading, error } = useViaCep()
  const lastSearched = useRef("")

  const handleCepChange = async (val: string) => {
    // Format: 00000-000
    const formatted = val.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2").slice(0, 9)
    setCep(formatted)
    const clean = formatted.replace(/\D/g, "")
    if (clean.length === 8 && clean !== lastSearched.current) {
      lastSearched.current = clean
      const data = await fetchCep(clean)
      if (data) {
        setRua(data.logradouro || "")
        setBairro(data.bairro || "")
        setCidade(`${data.localidade} - ${data.uf}`)
      }
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${colorClass}`} />
        {label}
      </h3>

      {/* CEP row */}
      <div className="flex gap-2 items-start">
        <div className="relative w-36 shrink-0">
          <Input
            placeholder="00000-000"
            value={cep}
            onChange={e => handleCepChange(e.target.value)}
            className="h-10 bg-zinc-900 border-white/[0.08] focus:border-primary/50 rounded-xl text-sm text-white placeholder:text-zinc-600 pr-8"
            maxLength={9}
          />
          {loading && <Loader2 className="absolute right-2.5 top-2.5 text-zinc-500 animate-spin" size={14} />}
          {!loading && rua && <Check className="absolute right-2.5 top-2.5 text-green-500" size={14} />}
        </div>
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={13} />
          <Input
            placeholder="Rua / Avenida"
            value={rua}
            onChange={e => setRua(e.target.value)}
            className="pl-9 h-10 bg-zinc-900 border-white/[0.08] focus:border-primary/50 rounded-xl text-sm text-white placeholder:text-zinc-600"
          />
        </div>
      </div>
      {error && <p className="text-[10px] text-red-400 font-semibold -mt-1">{error}</p>}

      {/* Number + Complement + City */}
      <div className="grid grid-cols-3 gap-2">
        <Input
          placeholder="Número"
          value={numero}
          onChange={e => setNumero(e.target.value)}
          className="h-10 bg-zinc-900 border-white/[0.08] focus:border-primary/50 rounded-xl text-sm text-white placeholder:text-zinc-600"
        />
        <Input
          placeholder="Complemento"
          value={complemento}
          onChange={e => setComplemento(e.target.value)}
          className="h-10 bg-zinc-900 border-white/[0.08] focus:border-primary/50 rounded-xl text-sm text-white placeholder:text-zinc-600"
        />
        <Input
          value={cidade}
          onChange={e => setCidade(e.target.value)}
          placeholder="Cidade - UF"
          className="h-10 bg-zinc-900 border-white/[0.08] focus:border-primary/50 rounded-xl text-sm text-white placeholder:text-zinc-600"
        />
      </div>
    </div>
  )
}

// ── Main Modal ─────────────────────────────────────
interface NewChangeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NewChangeModal({ isOpen, onClose }: NewChangeModalProps) {
  const { data: session } = useSession()
  const router = useRouter()

  // Vehicle carousel
  const [selectedVehicleId, setSelectedVehicleId] = useState("c3")
  const [carouselOffset, setCarouselOffset] = useState(0)
  const VISIBLE = 3

  // Address origin
  const [origemCep, setOrigemCep] = useState("")
  const [origemRua, setOrigemRua] = useState("")
  const [origemNum, setOrigemNum] = useState("")
  const [origemComp, setOrigemComp] = useState("")
  const [origemBairro, setOrigemBairro] = useState("")
  const [origemCidade, setOrigemCidade] = useState("")

  // Address destination
  const [destinoCep, setDestinoCep] = useState("")
  const [destinoRua, setDestinoRua] = useState("")
  const [destinoNum, setDestinoNum] = useState("")
  const [destinoComp, setDestinoComp] = useState("")
  const [destinoBairro, setDestinoBairro] = useState("")
  const [destinoCidade, setDestinoCidade] = useState("")

  // Inventory carousel
  const [itemPageIdx, setItemPageIdx] = useState(0)
  const [items, setItems] = useState<Record<string, number>>({})

  // Helpers
  const [needsHelpers, setNeedsHelpers] = useState<boolean | null>(null)
  const [helpersCount, setHelpersCount] = useState(1)
  const HELPER_PRICE = 120

  const [isSaving, setIsSaving] = useState(false)

  const selectedVehicle = VEHICLES.find(v => v.id === selectedVehicleId) || VEHICLES[2]
  const visibleVehicles = VEHICLES.slice(carouselOffset, carouselOffset + VISIBLE)

  const totalVolume = useMemo(() =>
    Object.entries(items).reduce((acc, [id, qty]) => {
      const item = ALL_ITEMS.find(i => i.id === id)
      return acc + (item?.vol || 0) * qty
    }, 0), [items])

  const totalItems = Object.values(items).reduce((a, b) => a + b, 0)
  
  // Price calc
  const freightBase = selectedVehicle.priceBase + (totalVolume * 12)
  const helpersFee = needsHelpers ? helpersCount * HELPER_PRICE : 0
  const totalPrice = freightBase + helpersFee

  const addItem = (id: string) => setItems(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  const removeItem = (id: string) => setItems(prev => {
    const next = { ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) }
    if (next[id] === 0) delete next[id]
    return next
  })

  const buildAddress = (rua: string, num: string, comp: string, bairro: string, cidade: string) => {
    return [rua, num, comp, bairro, cidade].filter(Boolean).join(", ")
  }

  const handleSave = async () => {
    setIsSaving(true)
    const origem = buildAddress(origemRua, origemNum, origemComp, origemBairro, origemCidade)
    const destino = buildAddress(destinoRua, destinoNum, destinoComp, destinoBairro, destinoCidade)
    try {
      if (session) {
        await saveSimulation(selectedVehicleId, totalVolume || selectedVehicle.m3 * 0.5, origem, destino)
        router.refresh()
        onClose()
      } else {
        const { setCookie } = await import("cookies-next")
        setCookie("pending_simulation", JSON.stringify({ truckId: selectedVehicleId, volume: totalVolume, origem, destino }), { maxAge: 3600 })
        router.push("/login")
      }
    } finally { setIsSaving(false) }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[92vw] lg:max-w-[1000px] w-full bg-zinc-950 border-white/10 p-0 overflow-hidden text-white rounded-2xl sm:max-w-none">
        <DialogTitle className="sr-only">Nova Mudança</DialogTitle>

        <div className="flex flex-col lg:flex-row max-h-[88vh]">
          
          {/* ── LEFT: Form ── */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 border-r border-white/[0.06]">
            <div>
              <button onClick={onClose} className="flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors mb-6">
                <ChevronLeft size={14} /> Fechar
              </button>
              <h2 className="text-2xl font-bold text-white">Detalhes da Mudança</h2>
              <p className="text-zinc-500 text-sm mt-1">Preencha as informações para calcular sua cotação</p>
            </div>

            {/* ── Vehicle Carousel ── */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Tipo de Veículo</h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCarouselOffset(Math.max(0, carouselOffset - 1))}
                  disabled={carouselOffset === 0}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white disabled:opacity-20 transition-all shrink-0"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex gap-3 flex-1">
                  {visibleVehicles.map(v => {
                    const isSelected = v.id === selectedVehicleId
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVehicleId(v.id)}
                        className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 flex-1 relative
                          ${isSelected ? "border-primary bg-primary/5" : "border-white/[0.06] bg-zinc-900 hover:border-white/20"}`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center text-white text-[10px]">✓</div>
                        )}
                        <span className="text-3xl mb-2">{v.icon}</span>
                        <p className={`text-xs font-bold ${isSelected ? "text-primary" : "text-zinc-300"}`}>{v.nome}</p>
                        <p className="text-[9px] text-zinc-600 mt-0.5 text-center leading-snug">{v.dims}</p>
                      </button>
                    )
                  })}
                </div>
                <button 
                  onClick={() => setCarouselOffset(Math.min(VEHICLES.length - VISIBLE, carouselOffset + 1))}
                  disabled={carouselOffset >= VEHICLES.length - VISIBLE}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white disabled:opacity-20 transition-all shrink-0"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* ── Addresses ── */}
            <div className="space-y-6">
              <AddressBlock
                label="Endereço de Coleta (Origem)"
                colorClass="bg-primary"
                cep={origemCep} setCep={setOrigemCep}
                rua={origemRua} setRua={setOrigemRua}
                numero={origemNum} setNumero={setOrigemNum}
                complemento={origemComp} setComplemento={setOrigemComp}
                bairro={origemBairro} setBairro={setOrigemBairro}
                cidade={origemCidade} setCidade={setOrigemCidade}
              />
              <AddressBlock
                label="Endereço de Entrega (Destino)"
                colorClass="bg-zinc-500"
                cep={destinoCep} setCep={setDestinoCep}
                rua={destinoRua} setRua={setDestinoRua}
                numero={destinoNum} setNumero={setDestinoNum}
                complemento={destinoComp} setComplemento={setDestinoComp}
                bairro={destinoBairro} setBairro={setDestinoBairro}
                cidade={destinoCidade} setCidade={setDestinoCidade}
              />
            </div>

            {/* ── Inventory Carousel ── */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Inventário de Mudança</h3>
                {totalVolume > 0 && (
                  <span className="text-xs text-zinc-400 font-semibold">{totalVolume.toFixed(1)} m³ · {totalItems} {totalItems === 1 ? "item" : "itens"}</span>
                )}
              </div>

              {/* Carousel page indicator */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {ITEM_ROWS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setItemPageIdx(i)}
                      className={`h-1.5 rounded-full transition-all duration-200 ${itemPageIdx === i ? "w-6 bg-primary" : "w-1.5 bg-zinc-700 hover:bg-zinc-500"}`}
                    />
                  ))}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setItemPageIdx(Math.max(0, itemPageIdx - 1))} disabled={itemPageIdx === 0} className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white disabled:opacity-20 transition-all">
                    <ChevronLeft size={12} />
                  </button>
                  <button onClick={() => setItemPageIdx(Math.min(ITEM_ROWS.length - 1, itemPageIdx + 1))} disabled={itemPageIdx >= ITEM_ROWS.length - 1} className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white disabled:opacity-20 transition-all">
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>

              {/* Items grid (current page) */}
              <div className="grid grid-cols-4 gap-2">
                {ITEM_ROWS[itemPageIdx].map(item => {
                  const qty = items[item.id] || 0
                  const hasQty = qty > 0
                  return (
                    <div key={item.id} className={`rounded-xl p-3 text-center space-y-2 border transition-all duration-200 ${hasQty ? "bg-primary/5 border-primary/40" : "bg-zinc-900 border-white/[0.06]"}`}>
                      <div className="text-2xl">{item.icon}</div>
                      <p className="text-[11px] font-semibold text-zinc-300 leading-tight">{item.nome}</p>
                      <p className="text-[9px] text-zinc-600">{item.vol} m³</p>
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => removeItem(item.id)} disabled={qty === 0} className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white disabled:opacity-20 transition-colors">
                          <Minus size={9} />
                        </button>
                        <span className={`text-xs font-bold w-3 text-center ${hasQty ? "text-primary" : "text-white"}`}>{qty}</span>
                        <button onClick={() => addItem(item.id)} className="w-5 h-5 rounded-md bg-primary/20 hover:bg-primary/40 flex items-center justify-center text-primary transition-colors">
                          <Plus size={9} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Selected items summary */}
              {Object.keys(items).length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {Object.entries(items).filter(([,qty]) => qty > 0).map(([id, qty]) => {
                    const item = ALL_ITEMS.find(i => i.id === id)
                    return (
                      <span key={id} className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold text-primary">
                        {item?.icon} {item?.nome} ×{qty}
                      </span>
                    )
                  })}
                </div>
              )}
            </div>

            {/* ── Helpers ── */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <Users size={13} className="text-zinc-500" /> Vai precisar de ajudantes?
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setNeedsHelpers(false)}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all
                    ${needsHelpers === false ? "border-primary bg-primary/5 text-primary" : "border-white/[0.06] bg-zinc-900 text-zinc-400 hover:border-white/20"}`}
                >
                  Não preciso
                </button>
                <button
                  onClick={() => setNeedsHelpers(true)}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all
                    ${needsHelpers === true ? "border-primary bg-primary/5 text-primary" : "border-white/[0.06] bg-zinc-900 text-zinc-400 hover:border-white/20"}`}
                >
                  Sim, quero ajuda
                </button>
              </div>

              {needsHelpers === true && (
                <div className="bg-zinc-900 border border-white/[0.06] rounded-xl p-4 space-y-3 animate-in fade-in duration-200">
                  <p className="text-xs text-zinc-400">Quantos ajudantes você precisa?</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setHelpersCount(Math.max(1, helpersCount - 1))}
                      disabled={helpersCount <= 1}
                      className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-20 transition-all"
                    >
                      <Minus size={14} />
                    </button>
                    <div className="flex-1 text-center">
                      <span className="text-3xl font-black text-primary">{helpersCount}</span>
                      <p className="text-[10px] text-zinc-500 mt-0.5">{helpersCount === 1 ? "ajudante" : "ajudantes"} · R$ {(helpersCount * HELPER_PRICE).toFixed(0)}</p>
                    </div>
                    <button
                      onClick={() => setHelpersCount(Math.min(6, helpersCount + 1))}
                      disabled={helpersCount >= 6}
                      className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/40 disabled:opacity-20 transition-all"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="text-[10px] text-zinc-600">Cada ajudante: R$ {HELPER_PRICE}/hora estimada</p>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Observações (opcional)</h3>
              <textarea
                placeholder="Ex: Tem escada, piano no 3º andar, apartamento com elevador..."
                className="w-full h-16 bg-zinc-900 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 resize-none focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          {/* ── RIGHT: Price panel ── */}
          <div className="w-full lg:w-80 shrink-0 bg-zinc-900/60 flex flex-col">
            <div className="p-6 border-b border-white/[0.06]">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Detalhes do Preço</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Frete ({selectedVehicle.nome})</span>
                  <span className="text-white font-semibold">R$ {selectedVehicle.priceBase.toFixed(2)}</span>
                </div>
                {totalVolume > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Vol. adicional ({totalVolume.toFixed(1)}m³)</span>
                    <span className="text-white font-semibold">R$ {(totalVolume * 12).toFixed(2)}</span>
                  </div>
                )}
                {needsHelpers && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">{helpersCount} {helpersCount === 1 ? "ajudante" : "ajudantes"}</span>
                    <span className="text-white font-semibold">R$ {helpersFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-white/[0.06] pt-3 flex justify-between items-end">
                  <span className="text-sm font-bold text-white">Estimativa</span>
                  <span className="text-2xl font-black text-primary">R$ {totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-zinc-600 flex items-start gap-1">
                  <Info size={10} className="mt-0.5 shrink-0" />
                  Preço final confirmado após aceite do motorista.
                </p>
              </div>
            </div>

            {/* Route summary */}
            <div className="p-6 border-b border-white/[0.06] flex-1 space-y-4">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Rota</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-[9px] text-zinc-600 font-bold uppercase">Coleta</p>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    <p className="text-xs text-white leading-snug">
                      {[origemRua, origemNum, origemBairro, origemCidade].filter(Boolean).join(", ") || <span className="text-zinc-600 italic">CEP não informado</span>}
                    </p>
                  </div>
                </div>
                <div className="w-px h-3 bg-zinc-700 ml-1" />
                <div className="space-y-1">
                  <p className="text-[9px] text-zinc-600 font-bold uppercase">Entrega</p>
                  <div className="flex items-start gap-2">
                    <MapPin size={12} className="text-zinc-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-white leading-snug">
                      {[destinoRua, destinoNum, destinoBairro, destinoCidade].filter(Boolean).join(", ") || <span className="text-zinc-600 italic">CEP não informado</span>}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 space-y-3">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2"
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <>Enviar Pedido <ArrowRight size={16} /></>}
              </Button>
              <p className="text-[10px] text-zinc-600 text-center">
                {session ? "Motoristas disponíveis em até 15 min" : "Crie uma conta grátis para confirmar"}
              </p>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}
