"use client"

import { useState } from "react"
import { GraduationCap, User, Lock, Eye, EyeOff, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/app/page"

interface LoginViewProps {
  onLogin: (role: UserRole) => void
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole>("student")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Por favor completa todos los campos")
      return
    }

    // Demo login - in real app this would be validated against a backend
    if (selectedRole === "director") {
      if (email === "director@universidad.edu" && password === "director123") {
        onLogin("director")
      } else {
        setError("Credenciales de director incorrectas")
      }
    } else {
      if (email && password.length >= 6) {
        onLogin("student")
      } else {
        setError("Credenciales incorrectas")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/5 flex flex-col items-center justify-center px-4 py-8">
      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-lg">
          <GraduationCap className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Gradify</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gestión del Proceso de Grado
        </p>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-sm bg-card border-border shadow-xl">
        <CardContent className="pt-6 pb-8 px-6">
          {/* Role Selector */}
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setSelectedRole("student")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all",
                selectedRole === "student"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}
            >
              <User className="w-4 h-4" />
              Estudiante
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("director")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all",
                selectedRole === "director"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}
            >
              <Shield className="w-4 h-4" />
              Director
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Correo Institucional
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder={selectedRole === "director" ? "director@universidad.edu" : "estudiante@universidad.edu"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Contrasena
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-xs text-destructive text-center">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Iniciar Sesion
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-3 rounded-xl bg-secondary/50 border border-border">
            <p className="text-xs text-muted-foreground text-center font-medium mb-2">
              Credenciales de prueba:
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><span className="text-foreground font-medium">Estudiante:</span> cualquier email + 6+ caracteres</p>
              <p><span className="text-foreground font-medium">Director:</span> director@universidad.edu / director123</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <p className="text-xs text-muted-foreground mt-8 text-center">
        Universidad - Sistema de Grados
      </p>
    </div>
  )
}
