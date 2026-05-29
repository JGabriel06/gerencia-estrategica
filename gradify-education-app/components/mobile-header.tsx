"use client"

import { Bell, GraduationCap, Shield } from "lucide-react"
import type { ViewType, AdminViewType } from "@/app/page"

interface MobileHeaderProps {
  currentView: ViewType | AdminViewType
  isAdmin?: boolean
}

const viewTitles: Record<ViewType | AdminViewType, string> = {
  dashboard: "Dashboard",
  checklist: "Requisitos",
  documents: "Documentos",
  notifications: "Notificaciones",
  profile: "Mi Perfil",
  "admin-dashboard": "Panel Director",
  "admin-students": "Estudiantes",
  "admin-requests": "Solicitudes",
  "admin-profile": "Mi Perfil",
}

export function MobileHeader({ currentView, isAdmin }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex items-center justify-center w-10 h-10 rounded-xl",
            isAdmin ? "bg-accent" : "bg-primary"
          )}>
            {isAdmin ? (
              <Shield className="w-6 h-6 text-accent-foreground" />
            ) : (
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            )}
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              {viewTitles[currentView]}
            </h1>
            <p className="text-xs text-muted-foreground">
              {isAdmin ? "Director - Gradify" : "Gradify"}
            </p>
          </div>
        </div>
        
        <button className="relative p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
        </button>
      </div>
    </header>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
