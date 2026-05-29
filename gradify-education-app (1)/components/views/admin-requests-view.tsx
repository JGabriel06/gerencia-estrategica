"use client"

import { useState } from "react"
import { 
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  User,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  AlertTriangle
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type RequestStatus = "pending" | "approved" | "rejected"

interface Request {
  id: number
  studentName: string
  studentCode: string
  type: string
  description: string
  submittedAt: string
  status: RequestStatus
  documents: string[]
  comments?: string
}

const initialRequests: Request[] = [
  {
    id: 1,
    studentName: "Maria Garcia Lopez",
    studentCode: "2019-1-002",
    type: "Paz y Salvo Biblioteca",
    description: "Solicitud de verificacion de paz y salvo con la biblioteca central.",
    submittedAt: "Hace 30 min",
    status: "pending",
    documents: ["paz_salvo_biblioteca.pdf"],
  },
  {
    id: 2,
    studentName: "Juan Rodriguez Perez",
    studentCode: "2019-1-003",
    type: "Formato de Inscripcion",
    description: "Inscripcion oficial al proceso de grado para el periodo 2026-1.",
    submittedAt: "Hace 1 hora",
    status: "pending",
    documents: ["formato_inscripcion.pdf", "cedula.pdf"],
  },
  {
    id: 3,
    studentName: "Ana Martinez Silva",
    studentCode: "2019-2-001",
    type: "Aprobacion de Director",
    description: "Solicitud de aprobacion del anteproyecto de trabajo de grado.",
    submittedAt: "Hace 2 horas",
    status: "pending",
    documents: ["anteproyecto.pdf", "formato_director.pdf"],
  },
  {
    id: 4,
    studentName: "Carlos Andres Mendoza",
    studentCode: "2019-1-001",
    type: "Paz y Salvo Financiero",
    description: "Verificacion de estado financiero con la universidad.",
    submittedAt: "Ayer",
    status: "approved",
    documents: ["paz_salvo_financiero.pdf"],
    comments: "Todo en orden. Aprobado.",
  },
  {
    id: 5,
    studentName: "Laura Sanchez Gomez",
    studentCode: "2019-2-002",
    type: "Cesion de Derechos",
    description: "Formato de cesion de derechos de autor del trabajo de grado.",
    submittedAt: "Hace 2 dias",
    status: "rejected",
    documents: ["cesion_derechos.pdf"],
    comments: "Falta firma del autor. Corregir y volver a enviar.",
  },
]

const filters = ["Todos", "Pendientes", "Aprobados", "Rechazados"]

const statusConfig = {
  pending: {
    label: "Pendiente",
    icon: Clock,
    bgColor: "bg-warning/20",
    textColor: "text-warning",
  },
  approved: {
    label: "Aprobado",
    icon: CheckCircle2,
    bgColor: "bg-success/20",
    textColor: "text-success",
  },
  rejected: {
    label: "Rechazado",
    icon: XCircle,
    bgColor: "bg-destructive/20",
    textColor: "text-destructive",
  },
}

export function AdminRequestsView() {
  const [requests, setRequests] = useState(initialRequests)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("Todos")
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [comment, setComment] = useState("")

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = 
      request.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = 
      selectedFilter === "Todos" || 
      (selectedFilter === "Pendientes" && request.status === "pending") ||
      (selectedFilter === "Aprobados" && request.status === "approved") ||
      (selectedFilter === "Rechazados" && request.status === "rejected")
    return matchesSearch && matchesFilter
  })

  const handleApprove = (id: number) => {
    setRequests(requests.map((r) =>
      r.id === id ? { ...r, status: "approved" as RequestStatus, comments: comment || "Aprobado por el Director." } : r
    ))
    setComment("")
    setExpandedId(null)
  }

  const handleReject = (id: number) => {
    if (!comment) {
      alert("Por favor, ingrese un motivo de rechazo.")
      return
    }
    setRequests(requests.map((r) =>
      r.id === id ? { ...r, status: "rejected" as RequestStatus, comments: comment } : r
    ))
    setComment("")
    setExpandedId(null)
  }

  const pendingCount = requests.filter(r => r.status === "pending").length

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header with Alert */}
      {pendingCount > 0 && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-warning/10 border border-warning/20">
          <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
          <p className="text-sm text-foreground">
            Tienes <span className="font-bold text-warning">{pendingCount}</span> solicitudes pendientes por revisar
          </p>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar solicitud..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all",
              selectedFilter === filter
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {filteredRequests.map((request) => {
          const config = statusConfig[request.status]
          const StatusIcon = config.icon
          const isExpanded = expandedId === request.id

          return (
            <Card key={request.id} className="bg-card border-border overflow-hidden">
              <CardContent className="p-0">
                {/* Header */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : request.id)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", config.bgColor)}>
                      <StatusIcon className={cn("w-5 h-5", config.textColor)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-foreground truncate pr-2">
                          {request.type}
                        </h3>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <User className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{request.studentName}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", config.bgColor, config.textColor)}>
                          {config.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{request.submittedAt}</span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-0 border-t border-border animate-fade-in">
                    <div className="pt-4 space-y-4">
                      {/* Description */}
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Descripcion</p>
                        <p className="text-sm text-foreground">{request.description}</p>
                      </div>

                      {/* Student Info */}
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Estudiante</p>
                        <p className="text-sm text-foreground">{request.studentName}</p>
                        <p className="text-xs text-primary">{request.studentCode}</p>
                      </div>

                      {/* Documents */}
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">Documentos Adjuntos</p>
                        <div className="space-y-2">
                          {request.documents.map((doc, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
                              <FileText className="w-4 h-4 text-primary" />
                              <span className="text-xs text-foreground">{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Existing Comments */}
                      {request.comments && (
                        <div className="p-3 rounded-lg bg-secondary/50">
                          <p className="text-xs font-medium text-muted-foreground mb-1">Comentario del Director</p>
                          <p className="text-sm text-foreground">{request.comments}</p>
                        </div>
                      )}

                      {/* Action Buttons for Pending */}
                      {request.status === "pending" && (
                        <div className="space-y-3 pt-2">
                          {/* Comment Input */}
                          <div>
                            <label className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              Comentario (opcional para aprobar, obligatorio para rechazar)
                            </label>
                            <textarea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Escriba un comentario..."
                              className="w-full p-3 rounded-xl bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground resize-none h-20"
                            />
                          </div>

                          {/* Buttons */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleReject(request.id)}
                              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-destructive/10 hover:bg-destructive/20 transition-colors"
                            >
                              <XCircle className="w-4 h-4 text-destructive" />
                              <span className="text-sm font-medium text-destructive">Rechazar</span>
                            </button>
                            <button
                              onClick={() => handleApprove(request.id)}
                              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-success hover:bg-success/90 transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                              <span className="text-sm font-medium text-primary-foreground">Aprobar</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredRequests.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">Sin solicitudes</p>
          <p className="text-xs text-muted-foreground mt-1">
            No hay solicitudes que coincidan con tu busqueda
          </p>
        </div>
      )}
    </div>
  )
}
