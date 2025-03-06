/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import {  Download, Filter, MoreHorizontal, Search, SlidersHorizontal,  StarOff, User } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { LeadDetailsDialog } from "@/components/leads/lead-details-dialog"
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dados de exemplo para leads
const leadsData = [
  {
    id: "1",
    nome: "João Silva",
    telefone: "(11) 98765-4321",
    email: "joao.silva@email.com",
    veiculo_interesse: "Toyota Corolla 2022",
    data_criacao: "2023-06-10T14:30:00",
    origem: "Chatbot",
    status: "Novo",
    prioridade: "Alta",
    atribuido_para: "Carlos Vendedor",
    ultima_interacao: "2023-06-10T14:45:00",
    conversas: [
      {
        data: "2023-06-10T14:30:00",
        mensagem: "Olá, gostaria de saber mais sobre o Toyota Corolla 2022.",
        remetente: "cliente"
      },
      {
        data: "2023-06-10T14:32:00",
        mensagem: "Olá João! Temos o Toyota Corolla 2022 disponível em várias cores e configurações. Você tem alguma preferência específica?",
        remetente: "chatbot"
      },
      {
        data: "2023-06-10T14:35:00",
        mensagem: "Estou interessado na versão XEi na cor prata. Qual o preço e condições de financiamento?",
        remetente: "cliente"
      },
      {
        data: "2023-06-10T14:38:00",
        mensagem: "O Corolla XEi 2022 na cor prata está por R$ 120.000,00. Temos condições especiais de financiamento com entrada de 30% e o restante em até 60x. Posso agendar uma visita para você conhecer o veículo?",
        remetente: "chatbot"
      },
      {
        data: "2023-06-10T14:45:00",
        mensagem: "Sim, gostaria de agendar para o próximo sábado pela manhã.",
        remetente: "cliente"
      }
    ]
  },
  {
    id: "2",
    nome: "Maria Oliveira",
    telefone: "(11) 91234-5678",
    email: "maria.oliveira@email.com",
    veiculo_interesse: "Honda Civic 2021",
    data_criacao: "2023-06-09T10:15:00",
    origem: "Site",
    status: "Em Contato",
    prioridade: "Média",
    atribuido_para: "Ana Vendedora",
    ultima_interacao: "2023-06-09T16:20:00",
    conversas: [
      {
        data: "2023-06-09T10:15:00",
        mensagem: "Estou procurando um Honda Civic 2021 usado em bom estado.",
        remetente: "cliente"
      },
      {
        data: "2023-06-09T10:20:00",
        mensagem: "Olá Maria! Temos alguns modelos de Honda Civic 2021 em nosso estoque. Você prefere alguma cor específica?",
        remetente: "chatbot"
      },
      {
        data: "2023-06-09T16:20:00",
        mensagem: "Prefiro na cor preta ou azul. Qual a quilometragem dos veículos disponíveis?",
        remetente: "cliente"
      }
    ]
  },
  {
    id: "3",
    nome: "Pedro Santos",
    telefone: "(11) 99876-5432",
    email: "pedro.santos@email.com",
    veiculo_interesse: "Jeep Compass",
    data_criacao: "2023-06-08T09:45:00",
    origem: "Chatbot",
    status: "Agendado",
    prioridade: "Alta",
    atribuido_para: "Carlos Vendedor",
    ultima_interacao: "2023-06-09T11:30:00",
    conversas: [
      {
        data: "2023-06-08T09:45:00",
        mensagem: "Bom dia, gostaria de informações sobre o Jeep Compass.",
        remetente: "cliente"
      },
      {
        data: "2023-06-08T09:50:00",
        mensagem: "Bom dia Pedro! Temos o Jeep Compass em várias versões. Você está procurando alguma versão específica?",
        remetente: "chatbot"
      },
      {
        data: "2023-06-08T10:00:00",
        mensagem: "Estou interessado na versão Limited com teto solar.",
        remetente: "cliente"
      },
      {
        data: "2023-06-08T10:05:00",
        mensagem: "Temos a versão Limited com teto solar disponível. Gostaria de agendar uma visita para conhecer o veículo?",
        remetente: "chatbot"
      },
      {
        data: "2023-06-09T11:30:00",
        mensagem: "Sim, posso ir amanhã às 14h.",
        remetente: "cliente"
      }
    ]
  },
  {
    id: "4",
    nome: "Ana Souza",
    telefone: "(11) 97654-3210",
    email: "ana.souza@email.com",
    veiculo_interesse: "Hyundai HB20",
    data_criacao: "2023-06-07T16:20:00",
    origem: "Indicação",
    status: "Convertido",
    prioridade: "Baixa",
    atribuido_para: "Ana Vendedora",
    ultima_interacao: "2023-06-08T14:15:00",
    conversas: [
      {
        data: "2023-06-07T16:20:00",
        mensagem: "Olá, fui indicada por um amigo. Estou interessada no Hyundai HB20.",
        remetente: "cliente"
      },
      {
        data: "2023-06-07T16:25:00",
        mensagem: "Olá Ana! Que ótimo que você foi indicada. Temos vários modelos do HB20 disponíveis. Você prefere hatch ou sedan?",
        remetente: "chatbot"
      },
      {
        data: "2023-06-07T16:30:00",
        mensagem: "Prefiro o hatch. Quais cores vocês têm disponíveis?",
        remetente: "cliente"
      },
      {
        data: "2023-06-08T14:15:00",
        mensagem: "Acabei de comprar o HB20 hatch na cor branca. Obrigada pela atenção!",
        remetente: "cliente"
      }
    ]
  },
  {
    id: "5",
    nome: "Carlos Mendes",
    telefone: "(11) 95432-1098",
    email: "carlos.mendes@email.com",
    veiculo_interesse: "Volkswagen T-Cross",
    data_criacao: "2023-06-06T11:30:00",
    origem: "Chatbot",
    status: "Perdido",
    prioridade: "Média",
    atribuido_para: "Carlos Vendedor",
    ultima_interacao: "2023-06-07T09:45:00",
    conversas: [
      {
        data: "2023-06-06T11:30:00",
        mensagem: "Estou procurando um SUV compacto e me interessei pelo T-Cross.",
        remetente: "cliente"
      },
      {
        data: "2023-06-06T11:35:00",
        mensagem: "Olá Carlos! O T-Cross é uma excelente escolha. Temos modelos disponíveis para pronta entrega. Você gostaria de agendar um test drive?",
        remetente: "chatbot"
      },
      {
        data: "2023-06-07T09:45:00",
        mensagem: "Obrigado, mas acabei optando por outra marca.",
        remetente: "cliente"
      }
    ]
  },
  {
    id: "6",
    nome: "Fernanda Lima",
    telefone: "(11) 98765-1234",
    email: "fernanda.lima@email.com",
    veiculo_interesse: "Chevrolet Onix",
    data_criacao: "2023-06-05T14:00:00",
    origem: "Site",
    status: "Novo",
    prioridade: "Baixa",
    atribuido_para: "Ana Vendedora",
    ultima_interacao: "2023-06-05T14:10:00",
    conversas: [
      {
        data: "2023-06-05T14:00:00",
        mensagem: "Gostaria de saber o preço do Chevrolet Onix 2022.",
        remetente: "cliente"
      },
      {
        data: "2023-06-05T14:10:00",
        mensagem: "Olá Fernanda! O Chevrolet Onix 2022 está com preço a partir de R$ 75.000,00. Temos condições especiais para pagamento à vista. Posso te ajudar com mais informações?",
        remetente: "chatbot"
      }
    ]
  },
  {
    id: "7",
    nome: "Roberto Almeida",
    telefone: "(11) 91234-9876",
    email: "roberto.almeida@email.com",
    veiculo_interesse: "Fiat Pulse",
    data_criacao: "2023-06-04T09:30:00",
    origem: "Chatbot",
    status: "Em Contato",
    prioridade: "Alta",
    atribuido_para: "Carlos Vendedor",
    ultima_interacao: "2023-06-05T10:45:00",
    conversas: [
      {
        data: "2023-06-04T09:30:00",
        mensagem: "Bom dia, gostaria de informações sobre o Fiat Pulse.",
        remetente: "cliente"
      },
      {
        data: "2023-06-04T09:35:00",
        mensagem: "Bom dia Roberto! O Fiat Pulse é um excelente SUV compacto. Temos várias versões disponíveis. Você tem preferência por alguma versão específica?",
        remetente: "chatbot"
      },
      {
        data: "2023-06-04T09:40:00",
        mensagem: "Estou interessado na versão Drive com motor turbo.",
        remetente: "cliente"
      },
      {
        data: "2023-06-04T09:45:00",
        mensagem: "Temos essa versão disponível em várias cores. O preço é a partir de R$ 95.000,00. Posso agendar uma visita para você conhecer o veículo?",
        remetente: "chatbot"
      },
      {
        data: "2023-06-05T10:45:00",
        mensagem: "Sim, gostaria de agendar para a próxima semana.",
        remetente: "cliente"
      }
    ]
  },
  {
    id: "8",
    nome: "Juliana Martins",
    telefone: "(11) 99876-1234",
    email: "juliana.martins@email.com",
    veiculo_interesse: "Nissan Kicks",
    data_criacao: "2023-06-03T15:45:00",
    origem: "Indicação",
    status: "Agendado",
    prioridade: "Média",
    atribuido_para: "Ana Vendedora",
    ultima_interacao: "2023-06-04T11:20:00",
    conversas: [
      {
        data: "2023-06-03T15:45:00",
        mensagem: "Boa tarde, fui indicada por um amigo e gostaria de informações sobre o Nissan Kicks.",
        remetente: "cliente"
      },
      {
        data: "2023-06-03T15:50:00",
        mensagem: "Boa tarde Juliana! Que ótimo que você foi indicada. O Nissan Kicks é um excelente SUV compacto. Temos várias versões disponíveis. Você tem preferência por alguma versão específica?",
        remetente: "chatbot"
      },
      {
        data: "2023-06-03T16:00:00",
        mensagem: "Estou interessada na versão Advance.",
        remetente: "cliente"
      },
      {
        data: "2023-06-04T11:20:00",
        mensagem: "Gostaria de agendar uma visita para conhecer o veículo na quinta-feira às 15h.",
        remetente: "cliente"
      }
    ]
  },
  {
    id: "9",
    nome: "Marcelo Costa",
    telefone: "(11) 95432-9876",
    email: "marcelo.costa@email.com",
    veiculo_interesse: "Renault Kwid",
    data_criacao: "2023-06-02T10:15:00",
    origem: "Site",
    status: "Novo",
    prioridade: "Baixa",
    atribuido_para: "Carlos Vendedor",
    ultima_interacao: "2023-06-02T10:30:00",
    conversas: [
      {
        data: "2023-06-02T10:15:00",
        mensagem: "Bom dia, gostaria de saber o preço do Renault Kwid 2022.",
        remetente: "cliente"
      },
      {
        data: "2023-06-02T10:30:00",
        mensagem: "Bom dia Marcelo! O Renault Kwid 2022 está com preço a partir de R$ 60.000,00. Temos condições especiais para pagamento à vista. Posso te ajudar com mais informações?",
        remetente: "chatbot"
      }
    ]
  },
  {
    id: "10",
    nome: "Ricardo Gomes",
    telefone: "(11) 98765-5432",
    email: "ricardo.gomes@email.com",
    veiculo_interesse: "Ford Ranger",
    data_criacao: "2023-06-01T13:30:00",
    origem: "Chatbot",
    status: "Convertido",
    prioridade: "Alta",
    atribuido_para: "Ana Vendedora",
    ultima_interacao: "2023-06-03T16:45:00",
    conversas: [
      {
        data: "2023-06-01T13:30:00",
        mensagem: "Boa tarde, estou interessado na Ford Ranger 2023.",
        remetente: "cliente"
      },
      {
        data: "2023-06-01T13:35:00",
        mensagem: "Boa tarde Ricardo! A Ford Ranger 2023 é uma excelente escolha. Temos várias versões disponíveis. Você tem preferência por alguma versão específica?",
        remetente: "chatbot"
      },
      {
        data: "2023-06-01T13:40:00",
        mensagem: "Estou interessado na versão Limited com tração 4x4.",
        remetente: "cliente"
      },
      {
        data: "2023-06-01T13:45:00",
        mensagem: "Temos essa versão disponível em várias cores. O preço é a partir de R$ 220.000,00. Posso agendar uma visita para você conhecer o veículo?",
        remetente: "chatbot"
      },
      {
        data: "2023-06-02T10:15:00",
        mensagem: "Sim, gostaria de agendar para amanhã às 14h.",
        remetente: "cliente"
      },
      {
        data: "2023-06-03T16:45:00",
        mensagem: "Acabei de finalizar a compra da Ranger. Obrigado pela atenção!",
        remetente: "cliente"
      }
    ]
  }
]

export default function LeadsPage() {
  const [leads, setLeads] = useState(leadsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredLeads, setFilteredLeads] = useState(leads)
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [sortBy, setSortBy] = useState("recentes")
  const [filterStatus, setFilterStatus] = useState("")
  const [filterPrioridade, setFilterPrioridade] = useState("")
  const [filterOrigem, setFilterOrigem] = useState("")
  const [activeTab, setActiveTab] = useState("todos")

  // Função para filtrar leads
  const filterLeads = () => {
    let filtered = leads

    // Filtro por tab ativa
    if (activeTab !== "todos") {
      if (activeTab === "novos") {
        filtered = filtered.filter((lead) => lead.status === "Novo")
      } else if (activeTab === "em-contato") {
        filtered = filtered.filter((lead) => lead.status === "Em Contato")
      } else if (activeTab === "agendados") {
        filtered = filtered.filter((lead) => lead.status === "Agendado")
      } else if (activeTab === "convertidos") {
        filtered = filtered.filter((lead) => lead.status === "Convertido")
      } else if (activeTab === "perdidos") {
        filtered = filtered.filter((lead) => lead.status === "Perdido")
      }
    }

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.telefone.includes(searchTerm) ||
          lead.veiculo_interesse.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtro por status
    if (filterStatus && filterStatus !== "all") {
      filtered = filtered.filter((lead) => lead.status === filterStatus)
    }

    // Filtro por prioridade
    if (filterPrioridade && filterPrioridade !== "all") {
      filtered = filtered.filter((lead) => lead.prioridade === filterPrioridade)
    }

    // Filtro por origem
    if (filterOrigem && filterOrigem !== "all") {
      filtered = filtered.filter((lead) => lead.origem === filterOrigem)
    }

    // Ordenação
    switch (sortBy) {
      case "recentes":
        filtered = [...filtered].sort(
          (a, b) => new Date(b.data_criacao).getTime() - new Date(a.data_criacao).getTime()
        )
        break
      case "antigos":
        filtered = [...filtered].sort(
          (a, b) => new Date(a.data_criacao).getTime() - new Date(b.data_criacao).getTime()
        )
        break
      case "ultima-interacao":
        filtered = [...filtered].sort(
          (a, b) => new Date(b.ultima_interacao).getTime() - new Date(a.ultima_interacao).getTime()
        )
        break
      case "nome-asc":
        filtered = [...filtered].sort((a, b) => a.nome.localeCompare(b.nome))
        break
      case "nome-desc":
        filtered = [...filtered].sort((a, b) => b.nome.localeCompare(a.nome))
        break
      default:
        break
    }

    setFilteredLeads(filtered)
  }

  // Aplicar filtros quando qualquer critério mudar
  useEffect(() => {
    filterLeads()
  }, [searchTerm, filterStatus, filterPrioridade, filterOrigem, sortBy, leads, activeTab])

  // Função para marcar lead como favorito (exemplo de ação)
  const toggleFavorite = (id: string) => {
    // Implementação fictícia - em um sistema real, isso seria persistido
    console.log(`Toggle favorite for lead ${id}`)
  }

  // Função para atualizar status do lead (exemplo de ação)
  const updateLeadStatus = (id: string, status: string) => {
    setLeads(leads.map((lead) => (lead.id === id ? { ...lead, status } : lead)))
  }

  // Extrair status únicos para o filtro
  const statusOptions = Array.from(new Set(leads.map((lead) => lead.status)))

  // Extrair prioridades únicas para o filtro
  const prioridadeOptions = Array.from(new Set(leads.map((lead) => lead.prioridade)))

  // Extrair origens únicas para o filtro
  const origemOptions = Array.from(new Set(leads.map((lead) => lead.origem)))

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
    const total = leads.length
    const novos = leads.filter((lead) => lead.status === "Novo").length
    const emContato = leads.filter((lead) => lead.status === "Em Contato").length
    const agendados = leads.filter((lead) => lead.status === "Agendado").length
    const convertidos = leads.filter((lead) => lead.status === "Convertido").length
    const perdidos = leads.filter((lead) => lead.status === "Perdido").length

    return { total, novos, emContato, agendados, convertidos, perdidos }
  }

  const stats = getStats()

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Leads</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie e acompanhe leads capturados pelo chatbot e outras fontes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm">
            <User className="mr-2 h-4 w-4" />
            Atribuir Leads
          </Button>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Novos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.novos}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Em Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.emContato}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Agendados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.agendados}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Convertidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.convertidos}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs e filtros */}
      <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="novos">Novos</TabsTrigger>
            <TabsTrigger value="em-contato">Em Contato</TabsTrigger>
            <TabsTrigger value="agendados">Agendados</TabsTrigger>
            <TabsTrigger value="convertidos">Convertidos</TabsTrigger>
            <TabsTrigger value="perdidos">Perdidos</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar leads..."
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
                    <label className="text-xs font-medium">Prioridade</label>
                    <Select value={filterPrioridade} onValueChange={setFilterPrioridade}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        {prioridadeOptions.map((prioridade) => (
                          <SelectItem key={prioridade} value={prioridade}>
                            {prioridade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mb-2">
                    <label className="text-xs font-medium">Origem</label>
                    <Select value={filterOrigem} onValueChange={setFilterOrigem}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        {origemOptions.map((origem) => (
                          <SelectItem key={origem} value={origem}>
                            {origem}
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
                      setFilterPrioridade("")
                      setFilterOrigem("")
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
                <SelectItem value="recentes">Mais recentes</SelectItem>
                <SelectItem value="antigos">Mais antigos</SelectItem>
                <SelectItem value="ultima-interacao">Última interação</SelectItem>
                <SelectItem value="nome-asc">Nome (A-Z)</SelectItem>
                <SelectItem value="nome-desc">Nome (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="todos" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Veículo de Interesse</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Nenhum lead encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{lead.nome}</div>
                            <div className="text-xs text-muted-foreground">
                              {lead.telefone} • {lead.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{lead.veiculo_interesse}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-xs font-medium">Criado: {formatDate(lead.data_criacao)}</span>
                          <span className="text-xs text-muted-foreground">
                            Última interação: {formatDate(lead.ultima_interacao)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{lead.origem}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFavorite(lead.id)}
                            title="Marcar como favorito"
                          >
                            <StarOff className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedLead(lead)
                              setIsDetailsDialogOpen(true)
                            }}
                            title="Ver detalhes"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
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
        <TabsContent value="novos" className="mt-4">
          <div className="rounded-md border">
            <Table>
              {/* Mesmo conteúdo da tabela, filtrado pelo estado activeTab */}
              {/* ... */}
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="em-contato" className="mt-4">
          <div className="rounded-md border">
            <Table>
              {/* Mesmo conteúdo da tabela, filtrado pelo estado activeTab */}
              {/* ... */}
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="agendados" className="mt-4">
          <div className="rounded-md border">
            <Table>
              {/* Mesmo conteúdo da tabela, filtrado pelo estado activeTab */}
              {/* ... */}
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="convertidos" className="mt-4">
          <div className="rounded-md border">
            <Table>
              {/* Mesmo conteúdo da tabela, filtrado pelo estado activeTab */}
              {/* ... */}
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="perdidos" className="mt-4">
          <div className="rounded-md border">
            <Table>
              {/* Mesmo conteúdo da tabela, filtrado pelo estado activeTab */}
              {/* ... */}
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Diálogo para visualização detalhada do lead */}
      {selectedLead && (
        <LeadDetailsDialog
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
          lead={selectedLead}
          onStatusChange={(status) => updateLeadStatus(selectedLead.id, status)}
        />
      )}
    </div>
  )
}
