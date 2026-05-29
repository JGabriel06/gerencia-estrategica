"use client"

import { useState } from "react"
import { 
  Search, 
  User,
  Mail,
  Phone,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  GraduationCap
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface Student {
  id: number
  name: string
  code: string
  email: string
  phone: string
  program: string
  progress: number
  completed: number
  inProgress: number
  pending: number
}

const students: Student[] = [
  {
    id: 1,
    name: "Carlos Andres Mendoza",
    code: "2019-1-001",
    email: "carlos.mendoza@universidad.edu",
    phone: "+57 300 123 4567",
    program: "Ingenieria de Sistemas",
    progress: 50,
    completed: 5,
    inProgress: 2,
    pending: 3,
  },
  {
    id: 2,
    name: "Maria Garcia Lopez",
    code: "2019-1-002",
    email: "maria.garcia@universidad.edu",
    phone: "+57 301 234 5678",
    program: "Ingenieria de Sistemas",
    progress: 70,
    completed: 7,
    inProgress: 1,
    pending: 2,
  },
  {
    id: 3,
    name: "Juan Rodriguez Perez",
    code: "2019-1-003",
    email: "juan.rodriguez@universidad.edu",
    phone: "+57 302 345 6789",
    program: "Ingenieria Industrial",
    progress: 30,
    completed: 3,
    inProgress: 2,
    pending: 5,
  },
  {
    id: 4,
    name: "Ana Martinez Silva",
    code: "2019-2-001",
    email: "ana.martinez@universidad.edu",
    phone: "+57 303 456 7890",
    program: "Administracion de Empresas",
    progress: 90,
    completed: 9,
    inProgress: 1,
    pending: 0,
  },
  {
    id: 5,
    name: "Laura Sanchez Gomez",
    code: "2019-2-002",
    email: "laura.sanchez@universidad.edu",
    phone: "+57 304 567 8901",
    program: "Ingenieria de Sistemas",
    progress: 60,
    completed: 6,
    inProgress: 2,
    pending: 2,
  },
]

const filters = ["Todos", "Ing. Sistemas", "Ing. Industrial", "Administracion"]

export function AdminStudentsView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("Todos")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const filteredStudents = students.filter((student) => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = 
      selectedFilter === "Todos" || 
      student.program.toLowerCase().includes(selectedFilter.toLowerCase().replace("ing. ", "ingenieria "))
    return matchesSearch && matchesFilter
  })

  if (selectedStudent) {
    return (
      <div className="px-4 py-4 space-y-4">
        {/* Back Button */}
        <button
          onClick={() => setSelectedStudent(null)}
          className="flex items-center gap-2 text-sm text-primary"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Volver a la lista
        </button>

        {/* Student Header */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-foreground">{selectedStudent.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedStudent.code}</p>
                <p className="text-xs text-primary mt-1">{selectedStudent.program}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="bg-card border-border">
          <CardContent className="py-4 space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{selectedStudent.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{selectedStudent.phone}</span>
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        <Card className="bg-card border-border">
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-foreground">Progreso del Proceso</p>
              <p className="text-lg font-bold text-primary">{selectedStudent.progress}%</p>
            </div>
            <Progress value={selectedStudent.progress} className="h-2 bg-secondary" />
            
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="text-center p-2 rounded-lg bg-success/10">
                <CheckCircle2 className="w-5 h-5 text-success mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">{selectedStudent.completed}</p>
                <p className="text-[10px] text-muted-foreground">Aprobados</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-warning/10">
                <Clock className="w-5 h-5 text-warning mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">{selectedStudent.inProgress}</p>
                <p className="text-[10px] text-muted-foreground">En Proceso</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-pending/10">
                <AlertCircle className="w-5 h-5 text-pending mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">{selectedStudent.pending}</p>
                <p className="text-[10px] text-muted-foreground">Pendientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar estudiante..."
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

      {/* Count */}
      <p className="text-sm text-muted-foreground">
        {filteredStudents.length} estudiantes encontrados
      </p>

      {/* Students List */}
      <div className="space-y-3">
        {filteredStudents.map((student) => (
          <Card 
            key={student.id} 
            className="bg-card border-border cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => setSelectedStudent(student)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground truncate">
                    {student.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{student.code}</p>
                  <p className="text-xs text-primary mt-1">{student.program}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{student.progress}%</p>
                  <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                </div>
              </div>
              <Progress value={student.progress} className="h-1.5 bg-secondary mt-3" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
