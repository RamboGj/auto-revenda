import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Revendas Automotivas",
  description: "Gerencie seu estoque de veículos e acompanhe atendimentos",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
          <div className="flex min-h-screen overflow-x-hidden">
            <div className="flex-1">
              {children}
            </div>
          </div>
      </body>
    </html>
  )
}

