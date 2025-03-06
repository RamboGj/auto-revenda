/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Mail, Phone, User } from "lucide-react"

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

interface EditAgendamentoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  agendamento: {
    id: string
    cliente: {
      nome: string
      telefone: string
      email: string
    }
    veiculo: string
    data: string
    tipo: string
    status: string
    origem: string
    observacoes: string
    vendedor: string
    dataAnterior?: string
  }
  onSave: (agendamento: any) => void
}

export function EditAgendamentoDialog({ open, onOpenChange, agendamento, onSave }: EditAgendamentoDialogProps) {
  const [formData, setFormData] = useState({
    id: agendamento.id,
    cliente: { ...agendamento.cliente },
    veiculo: agendamento.veiculo,
    data: agendamento.data.slice(0, 16), // Formato YYYY-MM-DDThh:mm para input datetime-local
    tipo: agendamento.tipo,
    status: agendamento.status,
    origem: agendamento.origem,
    observacoes: agendamento.observacoes,
    vendedor: agendamento.vendedor,
    dataAnterior: agendamento.dataAnterior,
  })

  // Função para formatar data para exibição
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...(formData[parent as keyof typeof formData] as Record<string, any>),
          [child]: value,
        },
      })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Se o status for alterado para "Reagendado" e a data for diferente da original
    const isReagendado = formData.status === "Reagendado" && formData.data !== agendamento.data.slice(0, 16)

    // Se for reagendamento, salvar a data anterior
    const updatedAgendamento = {
      ...formData,
      dataAnterior: isReagendado ? agendamento.data : formData.dataAnterior,
    }

    onSave(updatedAgendamento)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Agendamento</DialogTitle>
          <DialogDescription>Atualize os detalhes do agendamento ou altere seu status.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cliente.nome">Nome do Cliente</Label>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <Input id="cliente.nome" name="cliente.nome" value={formData.cliente.nome} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cliente.telefone">Telefone</Label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="cliente.telefone"
                    name="cliente.telefone"
                    value={formData.cliente.telefone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cliente.email">Email</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="cliente.email"
                    name="cliente.email"
                    type="email"
                    value={formData.cliente.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="veiculo">Veículo</Label>
                <Input id="veiculo" name="veiculo" value={formData.veiculo} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="data">Data e Hora</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Input id="data" name="data" type="datetime-local" value={formData.data} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo</Label>
                <Select value={formData.tipo} onValueChange={(value) => handleSelectChange("tipo", value)}>
                  <SelectTrigger id="tipo">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Test Drive">Test Drive</SelectItem>
                    <SelectItem value="Visita">Visita</SelectItem>
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
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Confirmado">Confirmado</SelectItem>
                    <SelectItem value="Reagendado">Reagendado</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="origem">Origem</Label>
                <Select value={formData.origem} onValueChange={(value) => handleSelectChange("origem", value)}>
                  <SelectTrigger id="origem">
                    <SelectValue placeholder="Selecione a origem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Chatbot">Chatbot</SelectItem>
                    <SelectItem value="Site">Site</SelectItem>
                    <SelectItem value="Indicação">Indicação</SelectItem>
                    <SelectItem value="Telefone">Telefone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendedor">Vendedor</Label>
                <Select value={formData.vendedor} onValueChange={(value) => handleSelectChange("vendedor", value)}>
                  <SelectTrigger id="vendedor">
                    <SelectValue placeholder="Selecione o vendedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Carlos Vendedor">Carlos Vendedor</SelectItem>
                    <SelectItem value="Ana Vendedora">Ana Vendedora</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                name="observacoes"
                value={formData.observacoes}
                onChange={handleChange}
                rows={4}
              />
            </div>

            {formData.dataAnterior && (
              <div className="rounded-md bg-muted p-3 text-sm">
                <div className="font-medium">Histórico de Reagendamento</div>
                <div className="mt-1">
                  <span className="text-muted-foreground">Data anterior: </span>
                  {formatDate(formData.dataAnterior)}
                </div>
              </div>
            )}
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

