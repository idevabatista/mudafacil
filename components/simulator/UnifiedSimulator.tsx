"use client"

import React, { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { TruckSelector, TRUCKS } from "@/components/canvas/TruckSelector"
import { Button } from "@/components/ui/button"
import { saveSimulation } from "@/app/actions/simulation"
import { MapPin, Box, Plus, Minus, Trash2, Sofa, Tv, Refrigerator, Bed, Package } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const QUICK_ITEMS = [
  { id: "q1", nome: "Sofá", volume: 1.5, icone: <Sofa size={14} /> },
  { id: "q2", nome: "Geladeira", volume: 1.2, icone: <Refrigerator size={14} /> },
  { id: "q3", nome: "TV 55\"", volume: 0.3, icone: <Tv size={14} /> },
  { id: "q4", nome: "Cama Casal", volume: 1.8, icone: <Bed size={14} /> },
  { id: "q5", nome: "Caixa G", volume: 0.2, icone: <Package size={14} /> },
]

interface SelectedItem {
  id: string
  nome: string
  volume: number
  quantidade: number
}

export function UnifiedSimulator({ minimal = false }: { minimal?: boolean }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([])
  
  const [selectedTruckId, setSelectedTruckId] = useState("c3")
  const [enderecoOrigem, setEnderecoOrigem] = useState("")
  const [enderecoDestino, setEnderecoDestino] = useState("")

  const totalVolume = useMemo(() => {
    return selectedItems.reduce((acc, item) => acc + (item.volume * item.quantidade), 0)
  }, [selectedItems])

  const currentTruck = useMemo(() => {
    return TRUCKS.find(t => t.id === selectedTruckId) || TRUCKS[2]
  }, [selectedTruckId])

  const handleAddItem = (item: any) => {
    setSelectedItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i)
      }
      return [...prev, { ...item, quantidade: 1 }]
    })
  }

  const handleRemoveItem = (id: string) => {
    setSelectedItems(prev => prev.map(i => 
      i.id === id ? { ...i, quantidade: Math.max(0, i.quantidade - 1) } : i
    ).filter(i => i.quantidade > 0))
  }

  const handleSave = async () => {
    setIsProcessing(true)
    try {
      const volToSave = totalVolume > 0 ? totalVolume : currentTruck.capacidade_m3 * 0.5
      if (session) {
        await saveSimulation(selectedTruckId, volToSave, enderecoOrigem, enderecoDestino)
        router.refresh()
        if (window.location.pathname !== "/dashboard") {
          router.push("/dashboard")
        }
      } else {
        const { setCookie } = await import("cookies-next")
        setCookie("pending_simulation", JSON.stringify({ 
          truckId: selectedTruckId, 
          volume: volToSave,
          origem: enderecoOrigem,
          destino: enderecoDestino,
          timestamp: Date.now()
        }), { maxAge: 60 * 60 })
        router.push("/login")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Esquerda: Inventário e Itens - Col 7 */}
        <div className={`lg:col-span-7 flex flex-col h-full bg-zinc-900/40 rounded-[2.5rem] border border-white/5 overflow-hidden ${!minimal ? "shadow-2xl" : ""}`}>
          <div className="p-8 space-y-4 bg-white/[0.02] border-b border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <Box size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight text-white uppercase">Inventário de Mudança</h3>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Adicione os itens principais da sua casa</p>
                </div>
              </div>
              {totalVolume > 0 && (
                <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1 animate-in zoom-in duration-300">
                  {totalVolume.toFixed(1)} m³ Total
                </Badge>
              )}
            </div>
          </div>

          <div className="p-8 space-y-8 flex-1 overflow-y-auto max-h-[600px] scrollbar-hide">
            {/* Quick Add Grid */}
            <div className="space-y-4">
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Atalhos Rápidos</span>
               <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {QUICK_ITEMS.map(item => (
                    <button 
                      key={item.id}
                      onClick={() => handleAddItem(item)}
                      className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all group"
                    >
                      <div className="text-zinc-500 group-hover:text-primary transition-colors">
                        {item.icone}
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-tighter text-zinc-400 group-hover:text-white">{item.nome}</span>
                    </button>
                  ))}
               </div>
            </div>

            {/* Selected Items List */}
            <div className="space-y-4">
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Seus Itens Selecionados</span>
               {selectedItems.length > 0 ? (
                 <div className="space-y-2">
                   {selectedItems.map(item => (
                     <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 group animate-in slide-in-from-left-4 duration-300">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400">
                              <Box size={16} />
                           </div>
                           <div>
                              <p className="text-sm font-bold text-white uppercase tracking-tight">{item.nome}</p>
                              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{item.volume} m³ / un</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="flex items-center gap-3 bg-black/40 rounded-xl p-1 border border-white/10">
                              <button onClick={() => handleRemoveItem(item.id)} className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
                                 <Minus size={14} />
                              </button>
                              <span className="text-sm font-black text-white w-4 text-center">{item.quantidade}</span>
                              <button onClick={() => handleAddItem(item)} className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
                                 <Plus size={14} />
                              </button>
                           </div>
                        </div>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="py-12 text-center border-2 border-dashed border-white/5 rounded-3xl opacity-40">
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Seu inventário está vazio</p>
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* Direita: Smart Panel e Truck Selector - Col 5 */}
        <div className={`lg:col-span-5 flex flex-col h-full bg-zinc-950/40 rounded-[2.5rem] border border-white/5 overflow-hidden relative ${!minimal ? "shadow-2xl" : ""}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,92,0,0.05)_0%,transparent_50%)] pointer-events-none" />
          
          <div className="flex-1 p-8 flex flex-col gap-8 z-10">
             {/* Truck Selection Component with live volume */}
             <TruckSelector 
                currentVolume={totalVolume} 
                onTruckChange={(t) => setSelectedTruckId(t.id)} 
             />

             {/* Logistics Info */}
             <div className="space-y-4 pt-4 border-t border-white/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Rotas e Endereços</span>
                <div className="grid gap-3">
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" size={14} />
                    <Input 
                      placeholder="Origem (CEP ou Rua)" 
                      className="bg-white/5 border-white/10 pl-11 h-12 text-xs rounded-2xl focus:border-primary/50 transition-all text-white placeholder:text-zinc-700"
                      value={enderecoOrigem}
                      onChange={(e) => setEnderecoOrigem(e.target.value)}
                    />
                  </div>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors" size={14} />
                    <Input 
                      placeholder="Destino (CEP ou Rua)" 
                      className="bg-white/5 border-white/10 pl-11 h-12 text-xs rounded-2xl focus:border-primary/50 transition-all text-white placeholder:text-zinc-700"
                      value={enderecoDestino}
                      onChange={(e) => setEnderecoDestino(e.target.value)}
                    />
                  </div>
                </div>
             </div>

             <div className="mt-auto space-y-4">
                <Button 
                    size="lg" 
                    onClick={handleSave}
                    disabled={isProcessing}
                    className="w-full h-16 text-xs uppercase tracking-[0.2em] rounded-2xl font-black group shadow-2xl shadow-primary/20 bg-primary hover:bg-primary/90 text-white transition-all hover:scale-[1.02]"
                  >
                    {isProcessing ? "Processando..." : session ? "Finalizar Planejamento" : "Ver Cotações Disponíveis"}
                    {!isProcessing && <Plus size={16} className="ml-2 group-hover:rotate-90 transition-transform" />}
                  </Button>
                <p className="text-center text-[9px] font-bold uppercase tracking-widest text-zinc-600 px-4">
                  {session ? "Sincronizado com seu Dashboard" : "Crie seu inventário grátis para receber orçamentos"}
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
