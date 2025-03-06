import type React from "react"
import type { Metadata } from "next"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import "../globals.css"

export const metadata: Metadata = {
  title: "Dashboard Administrativo - Revendas Automotivas",
  description: "Gerencie seu estoque de veículos e acompanhe atendimentos",
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
        <SidebarProvider>
          <div className="flex w-full min-h-screen overflow-x-hidden">
            <AppSidebar />
            <main className="w-full">{children}</main>
          </div>
        </SidebarProvider>
    </div>
  )
}

