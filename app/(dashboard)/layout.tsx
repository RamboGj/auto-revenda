import type React from "react"
import type { Metadata } from "next"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import "../globals.css"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import SidebarMobile from "@/components/mobile/Sidebar"

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

            <div className="md:hidden fixed top-4 left-4 z-40">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 rounded-md bg-primary text-white">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
              <SidebarProvider>

                <SidebarMobile />
              </SidebarProvider>
              </SheetContent>
            </Sheet>
          </div>

            <main className="w-full mt-12">{children}</main>
          </div>
        </SidebarProvider>
    </div>
  )
}

