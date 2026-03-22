"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="text-muted-foreground hover:text-destructive gap-2"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      <LogOut className="w-4 h-4" />
      Sair
    </Button>
  )
}
