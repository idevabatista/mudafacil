"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { NewChangeModal } from "@/components/simulator/NewChangeModal"

export function DashboardActions() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button 
        size="sm" 
        onClick={() => setIsModalOpen(true)}
        className="bg-primary hover:bg-primary/80 text-white font-bold rounded-xl gap-2 shadow-lg shadow-primary/20"
      >
        <span className="text-lg">+</span> Nova Mudança
      </Button>

      <NewChangeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
