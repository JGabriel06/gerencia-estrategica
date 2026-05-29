"use client"

import { useState } from "react"
import { MobileHeader } from "@/components/mobile-header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { AdminBottomNavigation } from "@/components/admin-bottom-navigation"
import { DashboardView } from "@/components/views/dashboard-view"
import { ChecklistView } from "@/components/views/checklist-view"
import { DocumentsView } from "@/components/views/documents-view"
import { NotificationsView } from "@/components/views/notifications-view"
import { ProfileView } from "@/components/views/profile-view"
import { AdminDashboardView } from "@/components/views/admin-dashboard-view"
import { AdminStudentsView } from "@/components/views/admin-students-view"
import { AdminRequestsView } from "@/components/views/admin-requests-view"
import { LoginView } from "@/components/views/login-view"

export type ViewType = "dashboard" | "checklist" | "documents" | "notifications" | "profile"
export type AdminViewType = "admin-dashboard" | "admin-students" | "admin-requests" | "admin-profile"
export type UserRole = "student" | "director"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<UserRole>("student")
  const [currentView, setCurrentView] = useState<ViewType>("dashboard")
  const [adminView, setAdminView] = useState<AdminViewType>("admin-dashboard")

  const handleLogin = (role: UserRole) => {
    setUserRole(role)
    setIsLoggedIn(true)
    if (role === "director") {
      setAdminView("admin-dashboard")
    } else {
      setCurrentView("dashboard")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole("student")
    setCurrentView("dashboard")
    setAdminView("admin-dashboard")
  }

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />
  }

  // Director/Admin View
  if (userRole === "director") {
    const renderAdminView = () => {
      switch (adminView) {
        case "admin-dashboard":
          return <AdminDashboardView />
        case "admin-students":
          return <AdminStudentsView />
        case "admin-requests":
          return <AdminRequestsView />
        case "admin-profile":
          return <ProfileView isAdmin onLogout={handleLogout} />
        default:
          return <AdminDashboardView />
      }
    }

    return (
      <div className="flex flex-col min-h-screen bg-background safe-top safe-bottom">
        <MobileHeader currentView={adminView} isAdmin />
        
        <main className="flex-1 overflow-y-auto pb-20">
          <div className="animate-slide-up">
            {renderAdminView()}
          </div>
        </main>
        
        <AdminBottomNavigation currentView={adminView} onNavigate={setAdminView} />
      </div>
    )
  }

  // Student View
  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView onNavigate={setCurrentView} />
      case "checklist":
        return <ChecklistView />
      case "documents":
        return <DocumentsView />
      case "notifications":
        return <NotificationsView />
      case "profile":
        return <ProfileView onLogout={handleLogout} />
      default:
        return <DashboardView onNavigate={setCurrentView} />
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background safe-top safe-bottom">
      <MobileHeader currentView={currentView} />
      
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="animate-slide-up">
          {renderView()}
        </div>
      </main>
      
      <BottomNavigation currentView={currentView} onNavigate={setCurrentView} />
    </div>
  )
}
