"use client"

import React from "react"
import { useDroppable } from "@dnd-kit/core"

interface CanvasProps {
  children?: React.ReactNode;
  caminhaoId: string;
  larguraCm: number;
  comprimentoCm: number;
}

export function DroppableCanvas({ children, caminhaoId, larguraCm, comprimentoCm }: CanvasProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `canvas-${caminhaoId}`,
  });

  // Scale de cm para pixels para visualização (ex: 1cm = 2px, mas dependerá da tela)
  // Utilizaremos flex/grid e position absolute para os elementos internos
  
  return (
    <div 
      ref={setNodeRef}
      className={`relative w-full aspect-[2/3] border-4 border-dashed rounded-lg bg-secondary/30 transition-colors overflow-hidden ${
        isOver ? "border-primary bg-primary/10" : "border-border"
      }`}
    >
      {/* Grade de fundo */}
      <div className="absolute inset-0 pattern-grid-lg text-border/40" />

      {/* Conteúdo arrastado */}
      <div className="relative w-full h-full z-10">
        {children}
      </div>

      <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-md text-sm text-muted-foreground select-none">
        Área útil: {comprimentoCm / 100}m x {larguraCm / 100}m
      </div>
    </div>
  )
}
