"use client"

import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp,
  FileText,
  Calendar,
  ChevronRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { ViewType } from "@/app/page"

interface DashboardViewProps {
  onNavigate: (view: ViewType) => void
}

const stats = {
  completed: 5,
  inProgress: 2,
  pending: 3,
  total: 10,
}

const recentActivities = [
  {
    id: 1,
    title: "Paz y Salvo Biblioteca",
    status: "completed",
    date: "Hoy, 10:30 AM",
  },
  {
    id: 2,
    title: "Formato de Inscripción",
    status: "in-progress",
    date: "Ayer, 3:45 PM",
  },
  {
    id: 3,
    title: "Aprobación Director",
    status: "pending",
    date: "Pendiente",
  },
]

const upcomingDeadlines = [
  {
    id: 1,
    title: "Entrega de Documentos",
    date: "15 Jun 2026",
    daysLeft: 5,
  },
  {
    id: 2,
    title: "Sustentación",
    date: "28 Jun 2026",
    daysLeft: 18,
  },
]

export function DashboardView({ onNavigate }: DashboardViewProps) {
  const progressPercentage = Math.round((stats.completed / stats.total) * 100)

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Welcome Section */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-foreground">
          Hola, Carlos 👋
        </h2>
        <p className="text-sm text-muted-foreground">
          Tu proceso de grado avanza bien
        </p>
      </div>

      {/* Progress Card */}
      <Card className="bg-gradient-to-br from-primary/20 to-accent/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Progreso Total</p>
              <p className="text-3xl font-bold text-foreground">{progressPercentage}%</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </div>
          <Progress value={progressPercentage} className="h-3 bg-secondary" />
          <p className="text-xs text-muted-foreground mt-2">
            {stats.completed} de {stats.total} requisitos completados
          </p>
        </CardContent>
      </Card>

      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
            <p className="text-[10px] text-muted-foreground text-center">Aprobados</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.inProgress}</p>
            <p className="text-[10px] text-muted-foreground text-center">En Proceso</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-pending/20 flex items-center justify-center mb-2">
              <AlertCircle className="w-5 h-5 text-pending" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
            <p className="text-[10px] text-muted-foreground text-center">Pendientes</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Actividad Reciente</CardTitle>
            <button 
              onClick={() => onNavigate("checklist")}
              className="text-xs text-primary flex items-center gap-1"
            >
              Ver todo <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivities.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity.status === "completed" 
                  ? "bg-success/20" 
                  : activity.status === "in-progress"
                  ? "bg-warning/20"
                  : "bg-pending/20"
              }`}>
                {activity.status === "completed" ? (
                  <CheckCircle2 className="w-4 h-4 text-success" />
                ) : activity.status === "in-progress" ? (
                  <Clock className="w-4 h-4 text-warning" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-pending" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Próximas Fechas
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingDeadlines.map((deadline) => (
            <div 
              key={deadline.id}
              className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{deadline.title}</p>
                  <p className="text-xs text-muted-foreground">{deadline.date}</p>
                </div>
              </div>
              <div className="px-2 py-1 rounded-lg bg-destructive/10">
                <p className="text-xs font-medium text-destructive">
                  {deadline.daysLeft} días
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
