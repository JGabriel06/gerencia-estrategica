"use client"

import { 
  Users, 
  FileCheck, 
  Clock, 
  CheckCircle2,
  XCircle,
  TrendingUp,
  Calendar,
  AlertTriangle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const stats = {
  totalStudents: 45,
  pendingRequests: 12,
  approvedToday: 8,
  rejectedToday: 2,
}

const recentRequests = [
  {
    id: 1,
    student: "Maria Garcia",
    type: "Paz y Salvo Biblioteca",
    status: "pending",
    date: "Hace 30 min",
  },
  {
    id: 2,
    student: "Juan Rodriguez",
    type: "Formato de Inscripcion",
    status: "pending",
    date: "Hace 1 hora",
  },
  {
    id: 3,
    student: "Ana Martinez",
    type: "Aprobacion de Director",
    status: "pending",
    date: "Hace 2 horas",
  },
]

const upcomingSustentations = [
  {
    id: 1,
    student: "Carlos Perez",
    topic: "Sistema de Gestion Academica",
    date: "5 Jun 2026",
    time: "10:00 AM",
  },
  {
    id: 2,
    student: "Laura Sanchez",
    topic: "App Movil de Salud",
    date: "8 Jun 2026",
    time: "2:00 PM",
  },
]

export function AdminDashboardView() {
  return (
    <div className="px-4 py-4 space-y-6">
      {/* Welcome Section */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-foreground">
          Bienvenido, Director
        </h2>
        <p className="text-sm text-muted-foreground">
          Panel de administracion del proceso de grado
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalStudents}</p>
                <p className="text-xs text-muted-foreground">Estudiantes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.pendingRequests}</p>
                <p className="text-xs text-muted-foreground">Pendientes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.approvedToday}</p>
                <p className="text-xs text-muted-foreground">Aprobados Hoy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.rejectedToday}</p>
                <p className="text-xs text-muted-foreground">Rechazados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Progreso Semanal</p>
              <p className="text-2xl font-bold text-foreground">78%</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
          <Progress value={78} className="h-2 bg-secondary" />
          <p className="text-xs text-muted-foreground mt-2">
            35 de 45 estudiantes en proceso activo
          </p>
        </CardContent>
      </Card>

      {/* Recent Pending Requests */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              Solicitudes Pendientes
            </CardTitle>
            <span className="px-2 py-1 rounded-lg bg-warning/20 text-xs font-medium text-warning">
              {stats.pendingRequests} nuevas
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentRequests.map((request) => (
            <div 
              key={request.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50"
            >
              <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-warning" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {request.student}
                </p>
                <p className="text-xs text-muted-foreground">{request.type}</p>
                <p className="text-[10px] text-muted-foreground">{request.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Sustentations */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Proximas Sustentaciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingSustentations.map((sustentation) => (
            <div 
              key={sustentation.id}
              className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{sustentation.student}</p>
                <p className="text-xs text-muted-foreground truncate">{sustentation.topic}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-primary">{sustentation.date}</p>
                <p className="text-[10px] text-muted-foreground">{sustentation.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
