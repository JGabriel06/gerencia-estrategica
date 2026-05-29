"use client"

import { useState, useRef } from "react"
import { 
  FileText, 
  Download, 
  Eye,
  Search,
  FolderOpen,
  File,
  FileCheck,
  Upload,
  X,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Document {
  id: number
  name: string
  type: "pdf" | "doc" | "form"
  category: string
  size: string
  downloadable: boolean
  description: string
}

interface UploadedDoc {
  id: number
  name: string
  status: "uploading" | "uploaded" | "error"
  progress: number
}

const documents: Document[] = [
  {
    id: 1,
    name: "Formato de Inscripcion a Grado",
    type: "form",
    category: "Formularios",
    size: "125 KB",
    downloadable: true,
    description: "Formato oficial para inscribirse al proceso de grado.",
  },
  {
    id: 2,
    name: "Formato de Sustentacion",
    type: "form",
    category: "Formularios",
    size: "98 KB",
    downloadable: true,
    description: "Formato para solicitar fecha de sustentacion.",
  },
  {
    id: 3,
    name: "Guia del Proceso de Grado",
    type: "pdf",
    category: "Guias",
    size: "2.3 MB",
    downloadable: true,
    description: "Documento completo con todos los pasos del proceso de grado.",
  },
  {
    id: 4,
    name: "Reglamento de Trabajo de Grado",
    type: "pdf",
    category: "Normativas",
    size: "1.8 MB",
    downloadable: true,
    description: "Normativa oficial para la elaboracion del trabajo de grado.",
  },
  {
    id: 5,
    name: "Plantilla Trabajo de Grado",
    type: "doc",
    category: "Plantillas",
    size: "456 KB",
    downloadable: true,
    description: "Plantilla oficial con el formato requerido para el trabajo de grado.",
  },
  {
    id: 6,
    name: "Formato de Cesion de Derechos",
    type: "form",
    category: "Formularios",
    size: "87 KB",
    downloadable: true,
    description: "Formato de cesion de derechos de autor a la universidad.",
  },
]

const categories = ["Todos", "Formularios", "Guias", "Normativas", "Plantillas"]

const typeConfig = {
  pdf: {
    icon: FileText,
    bgColor: "bg-destructive/20",
    textColor: "text-destructive",
  },
  doc: {
    icon: File,
    bgColor: "bg-primary/20",
    textColor: "text-primary",
  },
  form: {
    icon: FileCheck,
    bgColor: "bg-accent/20",
    textColor: "text-accent",
  },
}

export function DocumentsView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([])
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (files: File[]) => {
    const newDocs: UploadedDoc[] = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      status: "uploading" as const,
      progress: 0,
    }))

    setUploadedDocs((prev) => [...prev, ...newDocs])

    // Simulate upload progress
    newDocs.forEach((doc) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setUploadedDocs((prev) =>
            prev.map((d) =>
              d.id === doc.id ? { ...d, status: "uploaded", progress: 100 } : d
            )
          )
        } else {
          setUploadedDocs((prev) =>
            prev.map((d) =>
              d.id === doc.id ? { ...d, progress: Math.min(progress, 100) } : d
            )
          )
        }
      }, 200)
    })
  }

  const removeUploadedDoc = (id: number) => {
    setUploadedDocs((prev) => prev.filter((d) => d.id !== id))
  }

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Upload Section */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Subir Documentos</h3>
              <p className="text-xs text-muted-foreground">Entrega tus documentos requeridos</p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Subir
            </button>
          </div>

          {/* Uploaded Documents Preview */}
          {uploadedDocs.length > 0 && (
            <div className="space-y-2 mt-3 pt-3 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground">Documentos subidos:</p>
              {uploadedDocs.map((doc) => (
                <div key={doc.id} className="flex items-center gap-3 p-2 rounded-lg bg-card">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    doc.status === "uploaded" ? "bg-success/20" : "bg-primary/20"
                  )}>
                    {doc.status === "uploaded" ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : doc.status === "error" ? (
                      <AlertCircle className="w-4 h-4 text-destructive" />
                    ) : (
                      <FileText className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{doc.name}</p>
                    {doc.status === "uploading" && (
                      <div className="w-full h-1 bg-secondary rounded-full mt-1 overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-200"
                          style={{ width: `${doc.progress}%` }}
                        />
                      </div>
                    )}
                    {doc.status === "uploaded" && (
                      <p className="text-[10px] text-success">Subido exitosamente</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeUploadedDoc(doc.id)}
                    className="p-1 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <Card className="w-full max-w-sm bg-card border-border shadow-2xl animate-slide-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Subir Documentos</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-1 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Drop Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
                  dragActive
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 hover:bg-secondary/50"
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Arrastra tus archivos aqui
                </p>
                <p className="text-xs text-muted-foreground">
                  o haz clic para seleccionar
                </p>
                <p className="text-[10px] text-muted-foreground mt-3">
                  Formatos permitidos: PDF, DOC, DOCX
                </p>
              </div>

              {/* Document Types */}
              <div className="mt-4 p-3 rounded-lg bg-secondary/50">
                <p className="text-xs font-medium text-foreground mb-2">Documentos requeridos:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>- Formato de inscripcion firmado</li>
                  <li>- Copia del documento de identidad</li>
                  <li>- Paz y salvo de biblioteca</li>
                  <li>- Paz y salvo financiero</li>
                </ul>
              </div>

              <button
                onClick={() => setShowUploadModal(false)}
                className="w-full mt-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Listo
              </button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar documentos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5",
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            )}
          >
            {category === "Todos" && <FolderOpen className="w-3 h-3" />}
            {category}
          </button>
        ))}
      </div>

      {/* Documents Count */}
      <p className="text-sm text-muted-foreground">
        {filteredDocuments.length} documentos disponibles
      </p>

      {/* Documents List */}
      <div className="space-y-3">
        {filteredDocuments.map((document) => {
          const config = typeConfig[document.type]
          const Icon = config.icon

          return (
            <Card key={document.id} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                    config.bgColor
                  )}>
                    <Icon className={cn("w-6 h-6", config.textColor)} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground line-clamp-2">
                      {document.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {document.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {document.size}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {document.description}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
                    <Eye className="w-4 h-4 text-foreground" />
                    <span className="text-xs font-medium text-foreground">Ver</span>
                  </button>
                  {document.downloadable && (
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary hover:bg-primary/90 transition-colors">
                      <Download className="w-4 h-4 text-primary-foreground" />
                      <span className="text-xs font-medium text-primary-foreground">Descargar</span>
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FolderOpen className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground">
            No se encontraron documentos
          </p>
        </div>
      )}
    </div>
  )
}
