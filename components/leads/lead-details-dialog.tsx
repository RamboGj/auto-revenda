"use client"

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
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface LeadDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead: {
    id: string
    nome: string
    telefone: string
    email: string
    veiculo_interesse: string
    data_criacao: string
    origem: string
    status: string
    prioridade: string
    atribuido_para: string
    ultima_interacao: string
    conversas: {
      data: string
      mensagem: string
      remetente: string
    }[]
  }
  onStatusChange: (status: string) => void
}

export function LeadDetailsDialog({ open, onOpenChange, lead, onStatusChange }: LeadDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("info")
  const [newMessage, setNewMessage] = useState("")
  const [newStatus, setNewStatus] = useState(lead.status)

  // Função para formatar data
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

  // Função para enviar nova mensagem (simulação)
  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // Em um sistema real, isso enviaria a mensagem para o backend
    console.log(`Enviando mensagem para ${lead.nome}: ${newMessage}`)

    // Limpar campo após envio
    setNewMessage("")
  }

  // Função para atualizar status
  const handleStatusChange = () => {
    if (newStatus !== lead.status) {
      onStatusChange(newStatus)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes do Lead</DialogTitle>
          <DialogDescription>Informações detalhadas e histórico de conversas do lead.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="conversas">Conversas</TabsTrigger>
            <TabsTrigger value="acoes">Ações</TabsTrigger>
          </TabsList>

          {/* Tab de Informações */}
          <TabsContent value="info" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dados do Lead</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Nome</div>
                      <div>{lead.nome}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Telefone</div>
                      <div>{lead.telefone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Email</div>
                      <div>{lead.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Data de Criação</div>
                      <div>{formatDate(lead.data_criacao)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informações Adicionais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium">Veículo de Interesse</div>
                    <div>{lead.veiculo_interesse}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Origem</div>
                    <Badge variant="outline">{lead.origem}</Badge>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Status</div>
                    <Badge
                      variant="outline"
                      className={`${
                        lead.status === "Novo"
                          ? "border-blue-200 bg-blue-50 text-blue-700"
                          : lead.status === "Em Contato"
                            ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                            : lead.status === "Agendado"
                              ? "border-purple-200 bg-purple-50 text-purple-700"
                              : lead.status === "Convertido"
                                ? "border-green-200 bg-green-50 text-green-700"
                                : "border-gray-200 bg-gray-50 text-gray-700"
                      }`}
                    >
                      {lead.status}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Prioridade</div>
                    <Badge
                      variant="outline"
                      className={`${
                        lead.prioridade === "Alta"
                          ? "border-red-200 bg-red-50 text-red-700"
                          : lead.prioridade === "Média"
                            ? "border-orange-200 bg-orange-50 text-orange-700"
                            : "border-green-200 bg-green-50 text-green-700"
                      }`}
                    >
                      {lead.prioridade}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Atribuído para</div>
                    <div>{lead.atribuido_para}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Última Interação</div>
                    <div>{formatDate(lead.ultima_interacao)}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab de Conversas */}
          <TabsContent value="conversas" className="space-y-4 pt-4">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-4 overflow-y-auto max-h-[400px] p-4 border rounded-md">
                {lead.conversas.map((conversa, index) => (
                  <div
                    key={index}
                    className={`flex ${conversa.remetente === "cliente" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        conversa.remetente === "cliente" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <div className="text-sm">{conversa.mensagem}</div>
                      <div className="mt-1 text-xs opacity-70">{formatDate(conversa.data)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Textarea
                    placeholder="Digite uma mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows={3}
                  />
                </div>
                <Button onClick={handleSendMessage}>Enviar</Button>
              </div>
            </div>
          </TabsContent>

          {/* Tab de Ações */}
          <TabsContent value="acoes" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Atualizar Status</CardTitle>
                <CardDescription>Altere o status do lead conforme o progresso do atendimento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Novo">Novo</SelectItem>
                      <SelectItem value="Em Contato">Em Contato</SelectItem>
                      <SelectItem value="Agendado">Agendado</SelectItem>
                      <SelectItem value="Convertido">Convertido</SelectItem>
                      <SelectItem value="Perdido">Perdido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleStatusChange}>Atualizar Status</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Agendar Atendimento</CardTitle>
                <CardDescription>Agende um atendimento presencial ou por telefone</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="data">Data e Hora</Label>
                  <input
                    type="datetime-local"
                    id="data"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Atendimento</Label>
                  <Select>
                    <SelectTrigger id="tipo">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="telefone">Telefone</SelectItem>
                      <SelectItem value="video">Videoconferência</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea id="observacoes" placeholder="Observações sobre o agendamento" />
                </div>
                <Button>Agendar</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

