/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import {
  Calendar,
  Check,
  Clock,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  User,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditAgendamentoDialog } from "@/components/agendamentos/edit-agendamento-dialog"

// Dados de exemplo para agendamentos
const agendamentosData = [
  {
    id: "1",
    cliente: {
      nome: "João Silva",
      telefone: "(11) 98765-4321",
      email: "joao.silva@email.com",
    },
    veiculo: "Toyota Corolla 2022",
    data: "2023-06-15T14:30:00",
    tipo: "Test Drive",
    status: "Confirmado",
    origem: "Chatbot",
    observacoes: "Cliente interessado na versão XEi na cor prata.",
    vendedor: "Carlos Vendedor",
  },
  {
    id: "2",
    cliente: {
      nome: "Maria Oliveira",
      telefone: "(11) 91234-5678",
      email: "maria.oliveira@email.com",
    },
    veiculo: "Honda Civic 2021",
    data: "2023-06-15T16:00:00",
    tipo: "Visita",
    status: "Pendente",
    origem: "Site",
    observacoes: "Cliente quer verificar opções de financiamento.",
    vendedor: "Ana Vendedora",
  },
  {
    id: "3",
    cliente: {
      nome: "Pedro Santos",
      telefone: "(11) 99876-5432",
      email: "pedro.santos@email.com",
    },
    veiculo: "Jeep Compass",
    data: "2023-06-16T10:00:00",
    tipo: "Test Drive",
    status: "Confirmado",
    origem: "Chatbot",
    observacoes: "Cliente interessado na versão Limited com teto solar.",
    vendedor: "Carlos Vendedor",
  },
  {
    id: "4",
    cliente: {
      nome: "Ana Souza",
      telefone: "(11) 97654-3210",
      email: "ana.souza@email.com",
    },
    veiculo: "Hyundai HB20",
    data: "2023-06-16T15:30:00",
    tipo: "Visita",
    status: "Cancelado",
    origem: "Indicação",
    observacoes: "Cliente cancelou por motivos pessoais.",
    vendedor: "Ana Vendedora",
  },
  {
    id: "5",
    cliente: {
      nome: "Carlos Mendes",
      telefone: "(11) 95432-1098",
      email: "carlos.mendes@email.com",
    },
    veiculo: "Volkswagen T-Cross",
    data: "2023-06-17T11:00:00",
    tipo: "Test Drive",
    status: "Reagendado",
    origem: "Chatbot",
    observacoes: "Reagendado a pedido do cliente para o dia seguinte.",
    vendedor: "Carlos Vendedor",
    dataAnterior: "2023-06-16T11:00:00",
  },
  {
    id: "6",
    cliente: {
      nome: "Fernanda Lima",
      telefone: "(11) 98765-1234",
      email: "fernanda.lima@email.com",
    },
    veiculo: "Chevrolet Onix",
    data: "2023-06-17T14:00:00",
    tipo: "Visita",
    status: "Pendente",
    origem: "Site",
    observacoes: "Cliente quer verificar disponibilidade de cores.",
    vendedor: "Ana Vendedora",
  },
  {
    id: "7",
    cliente: {
      nome: "Roberto Almeida",
      telefone: "(11) 91234-9876",
      email: "roberto.almeida@email.com",
    },
    veiculo: "Fiat Pulse",
    data: "2023-06-18T09:30:00",
    tipo: "Test Drive",
    status: "Confirmado",
    origem: "Chatbot",
    observacoes: "Cliente interessado na versão Drive com motor turbo.",
    vendedor: "Carlos Vendedor",
  },
  {
    id: "8",
    cliente: {
      nome: "Juliana Martins",
      telefone: "(11) 99876-1234",
      email: "juliana.martins@email.com",
    },
    veiculo: "Nissan Kicks",
    data: "2023-06-18T15:00:00",
    tipo: "Visita",
    status: "Pendente",
    origem: "Indicação",
    observacoes: "Cliente quer conhecer o showroom.",
    vendedor: "Ana Vendedora",
  },
  {
    id: "9",
    cliente: {
      nome: "Marcelo Costa",
      telefone: "(11) 95432-9876",
      email: "marcelo.costa@email.com",
    },
    veiculo: "Renault Kwid",
    data: "2023-06-19T10:30:00",
    tipo: "Test Drive",
    status: "Pendente",
    origem: "Site",
    observacoes: "Cliente quer testar dirigibilidade na cidade.",
    vendedor: "Carlos Vendedor",
  },
  {
    id: "10",
    cliente: {
      nome: "Ricardo Gomes",
      telefone: "(11) 98765-5432",
      email: "ricardo.gomes@email.com",
    },
    veiculo: "Ford Ranger",
    data: "2023-06-19T14:30:00",
    tipo: "Test Drive",
    status: "Confirmado",
    origem: "Chatbot",
    observacoes: "Cliente interessado na versão Limited com tração 4x4.",
    vendedor: "Ana Vendedora",
  },
]

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState(agendamentosData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredAgendamentos, setFilteredAgendamentos] = useState(agendamentos)
  const [selectedAgendamento, setSelectedAgendamento] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [sortBy, setSortBy] = useState("proximos")
  const [filterStatus, setFilterStatus] = useState("")
  const [filterTipo, setFilterTipo] = useState("")
  const [filterVendedor, setFilterVendedor] = useState("")
  const [activeTab, setActiveTab] = useState("todos")

  // Função para filtrar agendamentos
  const filterAgendamentos = () => {
    let filtered = agendamentos

    // Filtro por tab ativa
    if (activeTab !== "todos") {
      if (activeTab === "hoje") {
        const hoje = new Date()
        hoje.setHours(0, 0, 0, 0)
        const amanha = new Date(hoje)
        amanha.setDate(amanha.getDate() + 1)

        filtered = filtered.filter((agendamento) => {
          const dataAgendamento = new Date(agendamento.data)
          return dataAgendamento >= hoje && dataAgendamento < amanha
        })
      } else if (activeTab === "pendentes") {
        filtered = filtered.filter((agendamento) => agendamento.status === "Pendente")
      } else if (activeTab === "confirmados") {
        filtered = filtered.filter((agendamento) => agendamento.status === "Confirmado")
      } else if (activeTab === "reagendados") {
        filtered = filtered.filter((agendamento) => agendamento.status === "Reagendado")
      } else if (activeTab === "cancelados") {
        filtered = filtered.filter((agendamento) => agendamento.status === "Cancelado")
      }
    }

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (agendamento) =>
          agendamento.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agendamento.cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agendamento.cliente.telefone.includes(searchTerm) ||
          agendamento.veiculo.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtro por status
    if (filterStatus && filterStatus !== "all") {
      filtered = filtered.filter((agendamento) => agendamento.status === filterStatus)
    }

    // Filtro por tipo
    if (filterTipo && filterTipo !== "all") {
      filtered = filtered.filter((agendamento) => agendamento.tipo === filterTipo)
    }

    // Filtro por vendedor
    if (filterVendedor && filterVendedor !== "all") {
      filtered = filtered.filter((agendamento) => agendamento.vendedor === filterVendedor)
    }

    // Ordenação
    switch (sortBy) {
      case "proximos":
        filtered = [...filtered].sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
        break
      case "recentes":
        filtered = [...filtered].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
        break
      case "cliente-asc":
        filtered = [...filtered].sort((a, b) => a.cliente.nome.localeCompare(b.cliente.nome))
        break
      case "cliente-desc":
        filtered = [...filtered].sort((a, b) => b.cliente.nome.localeCompare(a.cliente.nome))
        break
      default:
        break
    }

    setFilteredAgendamentos(filtered)
  }

  // Aplicar filtros quando qualquer critério mudar
  useEffect(() => {
    filterAgendamentos()
  }, [searchTerm, filterStatus, filterTipo, filterVendedor, sortBy, agendamentos, activeTab])

  // Função para atualizar um agendamento
   
  const handleUpdateAgendamento = (updatedAgendamento: any) => {
    setAgendamentos(
      agendamentos.map((agendamento) => (agendamento.id === updatedAgendamento.id ? updatedAgendamento : agendamento)),
    )
    setIsEditDialogOpen(false)
  }

  // Função para confirmar rapidamente um agendamento
  const handleConfirmarAgendamento = (id: string) => {
    setAgendamentos(
      agendamentos.map((agendamento) =>
        agendamento.id === id ? { ...agendamento, status: "Confirmado" } : agendamento,
      ),
    )
  }

  // Função para cancelar rapidamente um agendamento
  const handleCancelarAgendamento = (id: string) => {
    setAgendamentos(
      agendamentos.map((agendamento) =>
        agendamento.id === id ? { ...agendamento, status: "Cancelado" } : agendamento,
      ),
    )
  }

  // Extrair status únicos para o filtro
  const statusOptions = Array.from(new Set(agendamentos.map((a) => a.status)))

  // Extrair tipos únicos para o filtro
  const tipoOptions = Array.from(new Set(agendamentos.map((a) => a.tipo)))

  // Extrair vendedores únicos para o filtro
  const vendedorOptions = Array.from(new Set(agendamentos.map((a) => a.vendedor)))

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

  // Função para calcular estatísticas
  const getStats = () => {
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    const amanha = new Date(hoje)
    amanha.setDate(amanha.getDate() + 1)

    const total = agendamentos.length
    const pendentes = agendamentos.filter((a) => a.status === "Pendente").length
    const confirmados = agendamentos.filter((a) => a.status === "Confirmado").length
    const reagendados = agendamentos.filter((a) => a.status === "Reagendado").length
    const cancelados = agendamentos.filter((a) => a.status === "Cancelado").length
    const hoje_count = agendamentos.filter((a) => {
      const dataAgendamento = new Date(a.data)
      return dataAgendamento >= hoje && dataAgendamento < amanha
    }).length

    return { total, pendentes, confirmados, reagendados, cancelados, hoje_count }
  }

  const stats = getStats()

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Agendamentos</h1>
          <p className="text-sm text-muted-foreground">Gerencie e acompanhe agendamentos de test drives e visitas</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Novo Agendamento
          </Button>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.hoje_count}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendentes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.confirmados}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Reagendados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reagendados}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cancelados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.cancelados}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs e filtros */}
      <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="hoje">Hoje</TabsTrigger>
            <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
            <TabsTrigger value="confirmados">Confirmados</TabsTrigger>
            <TabsTrigger value="reagendados">Reagendados</TabsTrigger>
            <TabsTrigger value="cancelados">Cancelados</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar agendamentos..."
                className="pl-8 md:w-[200px] lg:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <div className="p-2">
                  <div className="mb-2">
                    <label className="text-xs font-medium">Status</label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mb-2">
                    <label className="text-xs font-medium">Tipo</label>
                    <Select value={filterTipo} onValueChange={setFilterTipo}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {tipoOptions.map((tipo) => (
                          <SelectItem key={tipo} value={tipo}>
                            {tipo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mb-2">
                    <label className="text-xs font-medium">Vendedor</label>
                    <Select value={filterVendedor} onValueChange={setFilterVendedor}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {vendedorOptions.map((vendedor) => (
                          <SelectItem key={vendedor} value={vendedor}>
                            {vendedor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full"
                    onClick={() => {
                      setFilterStatus("")
                      setFilterTipo("")
                      setFilterVendedor("")
                      setSearchTerm("")
                    }}
                  >
                    Limpar Filtros
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="proximos">Próximos primeiro</SelectItem>
                <SelectItem value="recentes">Mais recentes</SelectItem>
                <SelectItem value="cliente-asc">Cliente (A-Z)</SelectItem>
                <SelectItem value="cliente-desc">Cliente (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="todos" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Veículo</TableHead>
                  <TableHead>Data e Hora</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Vendedor</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgendamentos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Nenhum agendamento encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAgendamentos.map((agendamento) => (
                    <TableRow key={agendamento.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{agendamento.cliente.nome}</div>
                            <div className="text-xs text-muted-foreground">{agendamento.cliente.telefone}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{agendamento.veiculo}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-sm">{formatDate(agendamento.data).split(" ")[0]}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-sm">{formatDate(agendamento.data).split(" ")[1]}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{agendamento.tipo}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${
                            agendamento.status === "Confirmado"
                              ? "border-green-200 bg-green-50 text-green-700"
                              : agendamento.status === "Pendente"
                                ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                                : agendamento.status === "Reagendado"
                                  ? "border-blue-200 bg-blue-50 text-blue-700"
                                  : "border-red-200 bg-red-50 text-red-700"
                          }`}
                        >
                          {agendamento.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{agendamento.vendedor}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {agendamento.status === "Pendente" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleConfirmarAgendamento(agendamento.id)}
                                title="Confirmar"
                                className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleCancelarAgendamento(agendamento.id)}
                                title="Cancelar"
                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedAgendamento(agendamento)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                Editar
                              </DropdownMenuItem>
                              {agendamento.status !== "Confirmado" && (
                                <DropdownMenuItem onClick={() => handleConfirmarAgendamento(agendamento.id)}>
                                  Confirmar
                                </DropdownMenuItem>
                              )}
                              {agendamento.status !== "Cancelado" && (
                                <DropdownMenuItem
                                  onClick={() => handleCancelarAgendamento(agendamento.id)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  Cancelar
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Conteúdo para outras tabs (mesmo conteúdo, filtrado pelo estado activeTab) */}
        <TabsContent value="hoje" className="mt-4">
          <div className="rounded-md border">
            <Table>
              {/* Mesmo conteúdo da tabela, filtrado pelo estado activeTab */}
              {/* ... */}
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="pendentes" className="mt-4">
          <div className="rounded-md border">
            <Table>
              {/* Mesmo conteúdo da tabela, filtrado pelo estado activeTab */}
              {/* ... */}
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="confirmados" className="mt-4">
          <div className="rounded-md border">
            <Table>
              {/* Mesmo conteúdo da tabela, filtrado pelo estado activeTab */}
              {/* ... */}
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="reagendados" className="mt-4">
          <div className="rounded-md border">
            <Table>
              {/* Mesmo conteúdo da tabela, filtrado pelo estado activeTab */}
              {/* ... */}
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="cancelados" className="mt-4">
          <div className="rounded-md border">
            <Table>
              {/* Mesmo conteúdo da tabela, filtrado pelo estado activeTab */}
              {/* ... */}
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Diálogo para edição de agendamento */}
      {selectedAgendamento && (
        <EditAgendamentoDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          agendamento={selectedAgendamento}
          onSave={handleUpdateAgendamento}
        />
      )}
    </div>
  )
}

