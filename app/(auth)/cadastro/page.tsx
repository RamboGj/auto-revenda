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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CadastroPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Dados da revenda
    nome: "",
    email: "",
    telefone: "",

    // Endereço
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",

    // Credenciais
    senha: "",
    confirmarSenha: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      return
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulação de cadastro - em produção, conectaria com uma API real
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirecionar para o login após cadastro bem-sucedido
      router.push("/login?cadastro=sucesso")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.log("err", err)
      setError("Falha ao criar conta. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Lista de estados brasileiros
  const estados = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <Car className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Auto Revenda</h1>
          <p className="text-sm text-muted-foreground">Cadastre sua revenda para começar a usar o sistema</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Cadastro de Revenda</CardTitle>
            <CardDescription>
              {currentStep === 1 && "Informe os dados da sua revenda"}
              {currentStep === 2 && "Informe o endereço da sua revenda"}
              {currentStep === 3 && "Crie suas credenciais de acesso"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>}

              {/* Etapa 1: Dados da revenda */}
              {currentStep === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome da Revenda</Label>
                    <Input
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Auto Revenda Exemplo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contato@revenda.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                </>
              )}

              {/* Etapa 2: Endereço */}
              {currentStep === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input
                      id="cep"
                      name="cep"
                      value={formData.cep}
                      onChange={handleChange}
                      placeholder="00000-000"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="rua">Rua</Label>
                      <Input
                        id="rua"
                        name="rua"
                        value={formData.rua}
                        onChange={handleChange}
                        placeholder="Rua Exemplo"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numero">Número</Label>
                      <Input
                        id="numero"
                        name="numero"
                        value={formData.numero}
                        onChange={handleChange}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="complemento">Complemento</Label>
                    <Input
                      id="complemento"
                      name="complemento"
                      value={formData.complemento}
                      onChange={handleChange}
                      placeholder="Sala 101 (opcional)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bairro">Bairro</Label>
                    <Input
                      id="bairro"
                      name="bairro"
                      value={formData.bairro}
                      onChange={handleChange}
                      placeholder="Centro"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input
                        id="cidade"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleChange}
                        placeholder="São Paulo"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estado">Estado</Label>
                      <Select value={formData.estado} onValueChange={(value) => handleSelectChange("estado", value)}>
                        <SelectTrigger id="estado">
                          <SelectValue placeholder="UF" />
                        </SelectTrigger>
                        <SelectContent>
                          {estados.map((estado) => (
                            <SelectItem key={estado} value={estado}>
                              {estado}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              {/* Etapa 3: Credenciais */}
              {currentStep === 3 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="senha">Senha</Label>
                    <Input
                      id="senha"
                      name="senha"
                      type="password"
                      value={formData.senha}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                    />
                    <p className="text-xs text-muted-foreground">Mínimo de 8 caracteres</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                    <Input
                      id="confirmarSenha"
                      name="confirmarSenha"
                      type="password"
                      value={formData.confirmarSenha}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex w-full gap-4 mt-8">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={handlePrevStep} className="flex-1">
                    Voltar
                  </Button>
                )}
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {currentStep < 3 ? "Próximo" : isLoading ? "Cadastrando..." : "Finalizar Cadastro"}
                </Button>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className={`h-2 w-2 rounded-full ${currentStep === 1 ? "bg-primary" : "bg-muted"}`}></div>
                <div className={`h-2 w-2 rounded-full ${currentStep === 2 ? "bg-primary" : "bg-muted"}`}></div>
                <div className={`h-2 w-2 rounded-full ${currentStep === 3 ? "bg-primary" : "bg-muted"}`}></div>
              </div>
              <div className="text-center text-sm">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Faça login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

