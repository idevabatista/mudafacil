"use client"

import React, { useState } from "react"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import { DraggableItem } from "./DraggableItem"
import { DroppableCanvas } from "./DroppableCanvas"

// Mock de Itens para teste
const MOCK_ITEMS = [
  { id: "i1", nome: "Geladeira Dupla", icone_url: "", largura_cm: 80, altura_cm: 190, profundidade_cm: 75, peso_kg: 80, volume_m3: 1.1 },
  { id: "i2", nome: "Sofá 3 lugares", icone_url: "", largura_cm: 220, altura_cm: 90, profundidade_cm: 90, peso_kg: 45, volume_m3: 1.7 },
  { id: "i3", nome: "Caixa G", icone_url: "", largura_cm: 60, altura_cm: 60, profundidade_cm: 60, peso_kg: 20, volume_m3: 0.2 },
]

export function DragDropSetup() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [canvasItems, setCanvasItems] = useState<string[]>([]);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;
    setActiveId(null);
    if (over && over.id.toString().startsWith("canvas-")) {
      if (!canvasItems.includes(active.id as string)) {
        setCanvasItems([...canvasItems, active.id as string]);
      }
    }
  }

  const activeItem = MOCK_ITEMS.find(i => i.id === activeId);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-full min-h-[600px]">
        {/* Catálogo */}
        <div className="md:col-span-1 border rounded-lg bg-card p-4 shadow-sm flex flex-col gap-4 overflow-y-auto">
          <h3 className="font-semibold text-lg border-b pb-2">Catálogo</h3>
          <div className="grid grid-cols-2 gap-2">
            {MOCK_ITEMS.map(item => (
              <DraggableItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <DroppableCanvas caminhaoId="c1" larguraCm={200} comprimentoCm={400}>
             {/* Render items dropped here in real code */}
             <div className="p-4 grid grid-cols-4 gap-4">
                {canvasItems.map(id => {
                  const item = MOCK_ITEMS.find(i => i.id === id);
                  return item ? <div key={id} className="p-2 border bg-primary/20 rounded-md text-xs">{item.nome} (no caminhão)</div> : null;
                })}
             </div>
          </DroppableCanvas>
        </div>
      </div>
      
      <DragOverlay>
        {activeItem ? <DraggableItem item={activeItem} className="opacity-80 scale-105 shadow-xl" /> : null}
      </DragOverlay>
    </DndContext>
  )
}
