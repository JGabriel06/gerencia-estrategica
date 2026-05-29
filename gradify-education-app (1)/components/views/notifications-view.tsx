"use client"

import { useState } from "react"
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Info,
  Trash2,
  CheckCheck,
  User
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type NotificationType = "success" | "warning" | "info" | "reminder"

interface Notification {
  id: number
  title: string
  message: string
  type: NotificationType
  timestamp: string
  read: boolean
  approvedBy?: {
    name: string
    role: string
  }
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Requisito Aprobado",
    message: "Tu Paz y Salvo de Biblioteca ha sido aprobado exitosamente.",
    type: "success",
    timestamp: "Hace 2 horas",
    read: false,
    approvedBy: {
      name: "Dr. Roberto Gonzalez",
      role: "Director de Biblioteca"
    }
  },
  {
    id: 2,
    title: "Fecha Limite Proxima",
    message: "Recuerda que la entrega del borrador del trabajo de grado vence en 5 dias.",
    type: "warning",
    timestamp: "Hace 5 horas",
    read: false,
  },
  {
    id: 3,
    title: "Documento en Revision",
    message: "Tu Formato de Inscripcion esta siendo revisado por la oficina de grados.",
    type: "info",
    timestamp: "Ayer",
    read: true,
  },
  {
    id: 4,
    title: "Recordatorio de Pago",
    message: "Tienes un pago pendiente de derechos de grado. Fecha limite: 10 Jun 2026.",
    type: "reminder",
    timestamp: "Hace 2 dias",
    read: true,
  },
  {
    id: 5,
    title: "Requisito Aprobado",
    message: "Tu Paz y Salvo Financiero ha sido verificado correctamente.",
    type: "success",
    timestamp: "Hace 3 dias",
    read: true,
    approvedBy: {
      name: "Lic. Maria Fernandez",
      role: "Coordinadora Financiera"
    }
  },
  {
    id: 6,
    title: "Anteproyecto Aprobado",
    message: "Tu anteproyecto de trabajo de grado ha sido aprobado por el director asignado.",
    type: "success",
    timestamp: "Hace 5 dias",
    read: true,
    approvedBy: {
      name: "Ing. Carlos Martinez",
      role: "Director de Trabajo de Grado"
    }
  },
  {
    id: 7,
    title: "Actualizacion del Sistema",
    message: "Se han actualizado los formatos de trabajo de grado. Descarga la nueva version.",
    type: "info",
    timestamp: "Hace 1 semana",
    read: true,
  },
]

const typeConfig = {
  success: {
    icon: CheckCircle2,
    bgColor: "bg-success/20",
    textColor: "text-success",
    borderColor: "border-success/30",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-warning/20",
    textColor: "text-warning",
    borderColor: "border-warning/30",
  },
  info: {
    icon: Info,
    bgColor: "bg-pending/20",
    textColor: "text-pending",
    borderColor: "border-pending/30",
  },
  reminder: {
    icon: Clock,
    bgColor: "bg-accent/20",
    textColor: "text-accent",
    borderColor: "border-accent/30",
  },
}

export function NotificationsView() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-foreground">
            {unreadCount > 0 ? `${unreadCount} sin leer` : "Todo al dia"}
          </span>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Marcar todo como leido
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => {
          const config = typeConfig[notification.type]
          const Icon = config.icon

          return (
            <Card
              key={notification.id}
              className={cn(
                "bg-card border transition-all duration-200",
                !notification.read && config.borderColor,
                !notification.read && "bg-card/80"
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                    config.bgColor
                  )}>
                    <Icon className={cn("w-5 h-5", config.textColor)} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium text-foreground">
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.message}
                        </p>

                        {/* Approved By Section */}
                        {notification.approvedBy && (
                          <div className="mt-3 p-2.5 rounded-lg bg-success/10 border border-success/20">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-success/20 flex items-center justify-center">
                                <User className="w-3.5 h-3.5 text-success" />
                              </div>
                              <div>
                                <p className="text-xs font-medium text-foreground">
                                  {notification.approvedBy.name}
                                </p>
                                <p className="text-[10px] text-success">
                                  {notification.approvedBy.role}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        <p className="text-[10px] text-muted-foreground mt-2">
                          {notification.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-foreground" />
                      <span className="text-xs font-medium text-foreground">Marcar leida</span>
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className={cn(
                      "flex items-center justify-center gap-1.5 py-2 rounded-lg bg-destructive/10 hover:bg-destructive/20 transition-colors",
                      notification.read ? "flex-1" : "px-4"
                    )}
                  >
                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    {notification.read && (
                      <span className="text-xs font-medium text-destructive">Eliminar</span>
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Bell className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">Sin notificaciones</p>
          <p className="text-xs text-muted-foreground mt-1">
            Aqui apareceran las actualizaciones de tu proceso
          </p>
        </div>
      )}
    </div>
  )
}
