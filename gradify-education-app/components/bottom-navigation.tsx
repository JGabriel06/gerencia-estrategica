"use client"

import { LayoutDashboard, ClipboardCheck, FileText, Bell, User } from "lucide-react"
import type { ViewType } from "@/app/page"
import { cn } from "@/lib/utils"

interface BottomNavigationProps {
  currentView: ViewType
  onNavigate: (view: ViewType) => void
}

const navItems: { id: ViewType; icon: React.ElementType; label: string }[] = [
  { id: "dashboard", icon: LayoutDashboard, label: "Inicio" },
  { id: "checklist", icon: ClipboardCheck, label: "Requisitos" },
  { id: "documents", icon: FileText, label: "Docs" },
  { id: "notifications", icon: Bell, label: "Alertas" },
  { id: "profile", icon: User, label: "Perfil" },
]

export function BottomNavigation({ currentView, onNavigate }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border safe-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id
          const Icon = item.icon
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                <Icon className={cn("w-5 h-5", isActive && "scale-110")} />
                {item.id === "notifications" && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                )}
              </div>
              <span className={cn(
                "text-[10px] font-medium",
                isActive && "text-primary"
              )}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
