"use client"

import { 
  User,
  Mail,
  Phone,
  BookOpen,
  Building2,
  GraduationCap,
  Calendar,
  Settings,
  LogOut,
  ChevronRight,
  Shield,
  HelpCircle,
  FileText
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ProfileViewProps {
  isAdmin?: boolean
  onLogout?: () => void
}

const studentProfile = {
  name: "Carlos Andres Mendoza",
  email: "carlos.mendoza@universidad.edu",
  phone: "+57 300 123 4567",
  studentId: "2019-1-001",
  program: "Ingenieria de Sistemas",
  faculty: "Facultad de Ingenieria",
  semester: "10 Semestre",
  expectedGraduation: "Julio 2026",
}

const directorProfile = {
  name: "Ing. Roberto Gonzalez",
  email: "roberto.gonzalez@universidad.edu",
  phone: "+57 301 987 6543",
  employeeId: "DIR-2015-001",
  department: "Ingenieria de Sistemas",
  faculty: "Facultad de Ingenieria",
  role: "Director de Programa",
  yearsOfService: "11 anos",
}

const menuItems = [
  {
    id: "account",
    title: "Cuenta",
    items: [
      { icon: Settings, label: "Configuracion", action: "settings" },
      { icon: Shield, label: "Privacidad y Seguridad", action: "privacy" },
    ],
  },
  {
    id: "support",
    title: "Soporte",
    items: [
      { icon: HelpCircle, label: "Centro de Ayuda", action: "help" },
      { icon: FileText, label: "Terminos y Condiciones", action: "terms" },
    ],
  },
]

export function ProfileView({ isAdmin, onLogout }: ProfileViewProps) {
  const profile = isAdmin ? directorProfile : studentProfile

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Profile Header */}
      <Card className={isAdmin 
        ? "bg-gradient-to-br from-accent/20 to-primary/10 border-accent/20" 
        : "bg-gradient-to-br from-primary/20 to-accent/10 border-primary/20"
      }>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
              isAdmin ? "bg-accent/30" : "bg-primary/30"
            }`}>
              <User className={`w-10 h-10 ${isAdmin ? "text-accent" : "text-primary"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-foreground truncate">
                {profile.name}
              </h2>
              <p className="text-sm text-muted-foreground truncate">
                {isAdmin ? (profile as typeof directorProfile).department : (profile as typeof studentProfile).program}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  isAdmin 
                    ? "bg-accent/20 text-accent" 
                    : "bg-primary/20 text-primary"
                }`}>
                  {isAdmin ? (profile as typeof directorProfile).role : (profile as typeof studentProfile).semester}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-card border-border">
        <CardContent className="p-4 space-y-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <GraduationCap className={`w-4 h-4 ${isAdmin ? "text-accent" : "text-primary"}`} />
            {isAdmin ? "Informacion Laboral" : "Informacion Academica"}
          </h3>
          
          <div className="space-y-3">
            {isAdmin ? (
              <>
                <InfoRow 
                  icon={BookOpen} 
                  label="Departamento" 
                  value={(profile as typeof directorProfile).department} 
                />
                <InfoRow 
                  icon={Building2} 
                  label="Facultad" 
                  value={profile.faculty} 
                />
                <InfoRow 
                  icon={Calendar} 
                  label="Antiguedad" 
                  value={(profile as typeof directorProfile).yearsOfService} 
                />
              </>
            ) : (
              <>
                <InfoRow 
                  icon={BookOpen} 
                  label="Programa" 
                  value={(profile as typeof studentProfile).program} 
                />
                <InfoRow 
                  icon={Building2} 
                  label="Facultad" 
                  value={profile.faculty} 
                />
                <InfoRow 
                  icon={Calendar} 
                  label="Graduacion Esperada" 
                  value={(profile as typeof studentProfile).expectedGraduation} 
                />
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="bg-card border-border">
        <CardContent className="p-4 space-y-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <User className={`w-4 h-4 ${isAdmin ? "text-accent" : "text-primary"}`} />
            Informacion de Contacto
          </h3>
          
          <div className="space-y-3">
            <InfoRow 
              icon={Mail} 
              label="Correo" 
              value={profile.email} 
            />
            <InfoRow 
              icon={Phone} 
              label="Telefono" 
              value={profile.phone} 
            />
          </div>
        </CardContent>
      </Card>

      {/* Menu Sections */}
      {menuItems.map((section) => (
        <Card key={section.id} className="bg-card border-border">
          <CardContent className="p-4 space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {section.title}
            </h3>
            
            <div className="space-y-1">
              {section.items.map((item) => (
                <button
                  key={item.action}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Logout Button */}
      <button 
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-destructive/10 hover:bg-destructive/20 transition-colors"
      >
        <LogOut className="w-5 h-5 text-destructive" />
        <span className="text-sm font-medium text-destructive">Cerrar Sesion</span>
      </button>

      {/* App Version */}
      <p className="text-center text-xs text-muted-foreground">
        Gradify v1.0.0 - Universidad
      </p>
    </div>
  )
}

function InfoRow({ 
  icon: Icon, 
  label, 
  value 
}: { 
  icon: React.ElementType
  label: string
  value: string 
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-sm text-foreground truncate">{value}</p>
      </div>
    </div>
  )
}
