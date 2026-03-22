"use client"

import React, { useState } from "react"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

interface ItemProps {
  item: {
    id: string;
    nome: string;
    icone_url: string;
    largura_cm: number;
    altura_cm: number;
    profundidade_cm: number;
  };
  className?: string;
}

export function DraggableItem({ item, className }: ItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: item,
  });

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`relative flex flex-col items-center justify-center p-2 border-2 border-border bg-card rounded-md cursor-grab active:cursor-grabbing hover:border-primary shadow-sm transition-colors ${className}`}
    >
      <div className="w-10 h-10 bg-secondary rounded-md mb-2 flex items-center justify-center text-muted-foreground">
        {/* Placeholder para ícone */}
        <span className="text-xs">{item.nome.charAt(0)}</span>
      </div>
      <span className="text-xs font-medium text-center truncate w-full">{item.nome}</span>
      <span className="text-[10px] text-muted-foreground">{item.largura_cm}x{item.profundidade_cm}cm</span>
    </div>
  )
}
