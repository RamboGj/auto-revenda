"use client"

import { Calendar, Car, Home, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

// Menu items
const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/",
    isActive: true,
  },
  {
    title: "Veículos",
    icon: Car,
    url: "/veiculos",
  },
  {
    title: "Leads",
    icon: Users,
    url: "/leads",
  },
  {
    title: "Agendamentos",
    icon: Calendar,
    url: "/agendamentos",
  },
  // {
  //   title: "Atendimentos",
  //   icon: MessageSquare,
  //   url: "/atendimentos",
  // },
  // {
  //   title: "Vendas",
  //   icon: ShoppingCart,
  //   url: "/vendas",
  // },
  // {
  //   title: "Configurações",
  //   icon: Settings,
  //   url: "/configuracoes",
  // },
]

export function AppSidebar() {
  return (
    <Sidebar className="hidden lg:block">
      <SidebarHeader className="flex h-14 items-center border-b px-4">
        <h1 className="text-lg font-bold">Auto Revenda</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary"></div>
          <div>
            <p className="text-sm font-medium">Revenda Auto</p>
            <p className="text-xs text-muted-foreground">Administrador</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

