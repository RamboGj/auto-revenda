"use client"

import type React from "react"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "@/components/veiculos/image-upload"

// Lista de marcas de veículos
const marcas = [
  "Toyota",
  "Honda",
  "Volkswagen",
  "Jeep",
  "Hyundai",
  "Fiat",
  "Chevrolet",
  "Renault",
  "Nissan",
  "Ford",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Mitsubishi",
  "Kia",
  "Peugeot",
  "Citroën",
  "Volvo",
  "Land Rover",
  "Subaru",
]

// Lista de combustíveis
const combustiveis = ["Flex", "Gasolina", "Etanol", "Diesel", "Elétrico", "Híbrido"]

// Lista de cores comuns
const cores = ["Preto", "Branco", "Prata", "Cinza", "Vermelho", "Azul", "Verde", "Amarelo", "Marrom", "Bege"]

// Lista de status
const statusOptions = ["Disponível", "Reservado", "Vendido", "Em manutenção"]

interface EditVeiculoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  veiculo: {
    id: string
    marca: string
    modelo: string
    ano: number
    preco: number
    quilometragem: number
    combustivel: string
    cor: string
    status: string
    descricao?: string
    imagens?: string[]
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (veiculo: any) => void
}

export function EditVeiculoDialog({ open, onOpenChange, veiculo, onSave }: EditVeiculoDialogProps) {
  const [formData, setFormData] = useState({
    id: "",
    marca: "",
    modelo: "",
    ano: 0,
    preco: 0,
    quilometragem: 0,
    combustivel: "",
    cor: "",
    status: "",
    descricao: "",
    imagens: [] as string[],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Carregar dados do veículo quando o diálogo for aberto
  useEffect(() => {
    if (open && veiculo) {
      setFormData({
        id: veiculo.id,
        marca: veiculo.marca,
        modelo: veiculo.modelo,
        ano: veiculo.ano,
        preco: veiculo.preco,
        quilometragem: veiculo.quilometragem,
        combustivel: veiculo.combustivel,
        cor: veiculo.cor,
        status: veiculo.status,
        descricao: veiculo.descricao || "",
        imagens: veiculo.imagens || [],
      })
      setErrors({})
    }
  }, [open, veiculo])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Validação específica para campos numéricos
    if (name === "preco" || name === "quilometragem" || name === "ano") {
      const numValue = Number.parseFloat(value)
      if (isNaN(numValue)) return

      setFormData((prev) => ({ ...prev, [name]: numValue }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Limpar erro do campo quando ele for alterado
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpar erro do campo quando ele for alterado
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleImagesChange = (images: string[]) => {
    setFormData((prev) => ({ ...prev, imagens: images }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.marca) newErrors.marca = "Marca é obrigatória"
    if (!formData.modelo) newErrors.modelo = "Modelo é obrigatório"
    if (!formData.ano) newErrors.ano = "Ano é obrigatório"
    if (formData.ano < 1900 || formData.ano > new Date().getFullYear() + 1) {
      newErrors.ano = "Ano inválido"
    }
    if (!formData.preco) newErrors.preco = "Preço é obrigatório"
    if (formData.preco <= 0) newErrors.preco = "Preço deve ser maior que zero"
    if (formData.quilometragem < 0) newErrors.quilometragem = "Quilometragem não pode ser negativa"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSave(formData)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Veículo</DialogTitle>
          <DialogDescription>Atualize os detalhes do veículo.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="marca">Marca</Label>
                <Select value={formData.marca} onValueChange={(value) => handleSelectChange("marca", value)}>
                  <SelectTrigger id="marca" className={errors.marca ? "border-destructive" : ""}>
                    <SelectValue placeholder="Selecione a marca" />
                  </SelectTrigger>
                  <SelectContent>
                    {marcas.map((marca) => (
                      <SelectItem key={marca} value={marca}>
                        {marca}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.marca && <p className="text-xs text-destructive">{errors.marca}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="modelo">Modelo</Label>
                <Input
                  id="modelo"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  className={errors.modelo ? "border-destructive" : ""}
                />
                {errors.modelo && <p className="text-xs text-destructive">{errors.modelo}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="ano">Ano</Label>
                <Input
                  id="ano"
                  name="ano"
                  type="number"
                  value={formData.ano}
                  onChange={handleChange}
                  className={errors.ano ? "border-destructive" : ""}
                />
                {errors.ano && <p className="text-xs text-destructive">{errors.ano}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="preco">Preço (R$)</Label>
                <Input
                  id="preco"
                  name="preco"
                  type="number"
                  value={formData.preco}
                  onChange={handleChange}
                  className={errors.preco ? "border-destructive" : ""}
                />
                {errors.preco && <p className="text-xs text-destructive">{errors.preco}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="quilometragem">Quilometragem</Label>
                <Input
                  id="quilometragem"
                  name="quilometragem"
                  type="number"
                  value={formData.quilometragem}
                  onChange={handleChange}
                  className={errors.quilometragem ? "border-destructive" : ""}
                />
                {errors.quilometragem && <p className="text-xs text-destructive">{errors.quilometragem}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="combustivel">Combustível</Label>
                <Select
                  value={formData.combustivel}
                  onValueChange={(value) => handleSelectChange("combustivel", value)}
                >
                  <SelectTrigger id="combustivel">
                    <SelectValue placeholder="Selecione o combustível" />
                  </SelectTrigger>
                  <SelectContent>
                    {combustiveis.map((combustivel) => (
                      <SelectItem key={combustivel} value={combustivel}>
                        {combustivel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cor">Cor</Label>
                <Select value={formData.cor} onValueChange={(value) => handleSelectChange("cor", value)}>
                  <SelectTrigger id="cor">
                    <SelectValue placeholder="Selecione a cor" />
                  </SelectTrigger>
                  <SelectContent>
                    {cores.map((cor) => (
                      <SelectItem key={cor} value={cor}>
                        {cor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} rows={4} />
            </div>

            <div className="space-y-2">
              <Label>Imagens</Label>
              <ImageUpload images={formData.imagens} onChange={handleImagesChange} maxImages={5} />
              <p className="text-xs text-muted-foreground">
                Adicione até 5 imagens do veículo. A primeira imagem será usada como capa.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

