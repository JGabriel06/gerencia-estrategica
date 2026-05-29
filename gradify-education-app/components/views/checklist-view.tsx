"use client"

import { useState } from "react"
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type RequirementStatus = "completed" | "in-progress" | "pending"

interface Requirement {
  id: number
  title: string
  description: string
  status: RequirementStatus
  category: string
  dueDate?: string
  documents?: string[]
}

const requirements: Requirement[] = [
  {
    id: 1,
    title: "Paz y Salvo Biblioteca",
    description: "Certificación de no tener deudas pendientes con la biblioteca universitaria.",
    status: "completed",
    category: "Documentos Institucionales",
    documents: ["paz_salvo_biblioteca.pdf"],
  },
  {
    id: 2,
    title: "Paz y Salvo Financiero",
    description: "Certificación de estar al día con los pagos de matrícula y otros cargos.",
    status: "completed",
    category: "Documentos Institucionales",
    documents: ["paz_salvo_financiero.pdf"],
  },
  {
    id: 3,
    title: "Formato de Inscripción a Grado",
    description: "Diligenciar el formato oficial de inscripción al proceso de grado.",
    status: "completed",
    category: "Formularios",
    dueDate: "10 Jun 2026",
  },
  {
    id: 4,
    title: "Certificado de Notas",
    description: "Solicitar certificado oficial de notas con el historial académico completo.",
    status: "completed",
    category: "Documentos Académicos",
  },
  {
    id: 5,
    title: "Documento de Identidad",
    description: "Copia del documento de identidad vigente.",
    status: "completed",
    category: "Documentos Personales",
  },
  {
    id: 6,
    title: "Trabajo de Grado - Borrador",
    description: "Entrega del borrador del trabajo de grado para revisión del director.",
    status: "in-progress",
    category: "Trabajo de Grado",
    dueDate: "15 Jun 2026",
  },
  {
    id: 7,
    title: "Aprobación del Director",
    description: "Obtener la aprobación formal del director del trabajo de grado.",
    status: "in-progress",
    category: "Trabajo de Grado",
    dueDate: "20 Jun 2026",
  },
  {
    id: 8,
    title: "Formato de Sustentación",
    description: "Diligenciar el formato de solicitud de fecha de sustentación.",
    status: "pending",
    category: "Formularios",
    dueDate: "22 Jun 2026",
  },
  {
    id: 9,
    title: "Entrega Final Trabajo de Grado",
    description: "Entrega de la versión final del trabajo de grado con correcciones.",
    status: "pending",
    category: "Trabajo de Grado",
    dueDate: "25 Jun 2026",
  },
  {
    id: 10,
    title: "Sustentación",
    description: "Presentación y defensa del trabajo de grado ante el jurado evaluador.",
    status: "pending",
    category: "Evaluación",
    dueDate: "28 Jun 2026",
  },
]

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    label: "Aprobado",
    bgColor: "bg-success/20",
    textColor: "text-success",
    borderColor: "border-success/30",
  },
  "in-progress": {
    icon: Clock,
    label: "En Proceso",
    bgColor: "bg-warning/20",
    textColor: "text-warning",
    borderColor: "border-warning/30",
  },
  pending: {
    icon: AlertCircle,
    label: "Pendiente",
    bgColor: "bg-pending/20",
    textColor: "text-pending",
    borderColor: "border-pending/30",
  },
}

const filterOptions: { value: RequirementStatus | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "completed", label: "Aprobados" },
  { value: "in-progress", label: "En Proceso" },
  { value: "pending", label: "Pendientes" },
]

export function ChecklistView() {
  const [filter, setFilter] = useState<RequirementStatus | "all">("all")
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filteredRequirements = requirements.filter(
    (req) => filter === "all" || req.status === filter
  )

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all",
              filter === option.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Mostrando {filteredRequirements.length} de {requirements.length} requisitos
        </span>
      </div>

      {/* Requirements List */}
      <div className="space-y-3">
        {filteredRequirements.map((requirement) => {
          const config = statusConfig[requirement.status]
          const Icon = config.icon
          const isExpanded = expandedId === requirement.id

          return (
            <Card 
              key={requirement.id} 
              className={cn(
                "bg-card border transition-all duration-200",
                config.borderColor
              )}
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleExpand(requirement.id)}
                  className="w-full p-4 flex items-start gap-3 text-left"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                    config.bgColor
                  )}>
                    <Icon className={cn("w-5 h-5", config.textColor)} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-foreground truncate">
                          {requirement.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {requirement.category}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={cn(
                          "px-2 py-1 rounded-lg text-[10px] font-medium",
                          config.bgColor,
                          config.textColor
                        )}>
                          {config.label}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-0 space-y-3 border-t border-border mt-2">
                    <p className="text-sm text-muted-foreground pt-3">
                      {requirement.description}
                    </p>
                    
                    {requirement.dueDate && (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">Fecha límite:</span>
                        <span className="font-medium text-foreground">{requirement.dueDate}</span>
                      </div>
                    )}

                    {requirement.documents && requirement.documents.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">Documentos:</p>
                        {requirement.documents.map((doc, index) => (
                          <button
                            key={index}
                            className="flex items-center gap-2 w-full p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-left"
                          >
                            <ExternalLink className="w-4 h-4 text-primary" />
                            <span className="text-xs text-foreground">{doc}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
