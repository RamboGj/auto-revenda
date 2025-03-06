'use client'

import { Home, Car, CalendarClock, Users, Settings } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { SheetClose } from "../ui/sheet"

const navItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Veículos",
    href: "/veiculos",
    icon: Car,
  },
  {
    name: "Agendamentos",
    href: "/agendamentos",
    icon: CalendarClock,
  },
  {
    name: "Leads",
    href: "/leads",
    icon: Users,
  },
  {
    name: "Configurações",
    href: "/configuracoes",
    icon: Settings,
  },
]

export default function SidebarMobile() {
  const pathname = usePathname()

  return (
    <div className="h-full py-8 flex flex-col bg-background">
      <div className="px-6 mb-8">
        <h1 className="text-xl font-bold">Revendas Auto</h1>
      </div>
      <nav className="space-y-1 px-2 flex-1">
        {navItems.map((item) => (
         <SheetClose asChild key={item.href}>
          <Link
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              pathname === item.href
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        </SheetClose>
        ))}
      </nav>
      <div className="px-6 mt-auto">
        <div className="flex items-center gap-3 py-4">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Usuário</p>
            <p className="text-xs text-muted-foreground">admin@revendas.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}