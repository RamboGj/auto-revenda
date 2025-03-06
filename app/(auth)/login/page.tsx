"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Car } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulação de autenticação - em produção, conectaria com uma API real
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirecionar para o dashboard após login bem-sucedido
      router.push("/")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.error(err)
        setError("Falha na autenticação. Verifique suas credenciais.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <Car className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Auto Revenda</h1>
          <p className="text-sm text-muted-foreground">Faça login para acessar o painel administrativo</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Entre com seu email e senha para acessar sua conta</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link href="/recuperar-senha" className="text-xs text-primary hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full block mt-8" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
              <div className="text-center text-sm">
                Não tem uma conta?{" "}
                <Link href="/cadastro" className="text-primary hover:underline">
                  Cadastre-se
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}


