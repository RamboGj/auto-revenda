/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from "react"

import { useState } from "react"
import { Car, ChevronDown, Download, Filter, Plus, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddVeiculoDialog } from "@/components/veiculos/add-veiculo-dialog"
import { EditVeiculoDialog } from "@/components/veiculos/edit-veiculo-dialog"
import { DeleteVeiculoDialog } from "@/components/veiculos/delete-veiculo-dialog"
import { getCarImagesByBrand } from "@/lib/cars-images"
import Image from "next/image"


// Dados de exemplo para veículos
const veiculosData = [
  {
    id: "1",
    marca: "Toyota",
    modelo: "Corolla",
    ano: 2022,
    preco: 120000,
    quilometragem: 15000,
    combustivel: "Flex",
    cor: "Prata",
    status: "Disponível",
    imagens: getCarImagesByBrand('Toyota', 1),
  },
  {
    id: "2",
    marca: "Honda",
    modelo: "Civic",
    ano: 2021,
    preco: 110000,
    quilometragem: 25000,
    combustivel: "Flex",
    cor: "Preto",
    status: "Disponível",
    imagens: getCarImagesByBrand('Honda', 1),
  },
  {
    id: "3",
    marca: "Volkswagen",
    modelo: "T-Cross",
    ano: 2023,
    preco: 140000,
    quilometragem: 5000,
    combustivel: "Flex",
    cor: "Branco",
    status: "Reservado",
    imagens: getCarImagesByBrand('Volkswagen', 1),
  },
  {
    id: "4",
    marca: "Jeep",
    modelo: "Compass",
    ano: 2022,
    preco: 160000,
    quilometragem: 18000,
    combustivel: "Diesel",
    cor: "Cinza",
    status: "Disponível",
    imagens: getCarImagesByBrand('Jeep', 1),
  },
  {
    id: "5",
    marca: "Hyundai",
    modelo: "HB20",
    ano: 2021,
    preco: 75000,
    quilometragem: 30000,
    combustivel: "Flex",
    cor: "Vermelho",
    status: "Disponível",
    imagens: getCarImagesByBrand('Hyundai', 1),
  },
  {
    id: "6",
    marca: "Fiat",
    modelo: "Pulse",
    ano: 2023,
    preco: 95000,
    quilometragem: 8000,
    combustivel: "Flex",
    cor: "Azul",
    status: "Disponível",
    imagens: getCarImagesByBrand('Fiat', 1),
  },
  {
    id: "7",
    marca: "Chevrolet",
    modelo: "Onix",
    ano: 2022,
    preco: 82000,
    quilometragem: 22000,
    combustivel: "Flex",
    cor: "Prata",
    status: "Vendido",
    imagens: getCarImagesByBrand('Chevrolet', 1),
  },
  {
    id: "8",
    marca: "Renault",
    modelo: "Kwid",
    ano: 2021,
    preco: 60000,
    quilometragem: 35000,
    combustivel: "Flex",
    cor: "Branco",
    status: "Disponível",
    imagens: getCarImagesByBrand('Renault', 1),
  },
  {
    id: "9",
    marca: "Nissan",
    modelo: "Kicks",
    ano: 2022,
    preco: 105000,
    quilometragem: 18000,
    combustivel: "Flex",
    cor: "Preto",
    status: "Disponível",
    imagens: getCarImagesByBrand('Nissan', 1),
  },
  {
    id: "10",
    marca: "Ford",
    modelo: "Ranger",
    ano: 2023,
    preco: 220000,
    quilometragem: 10000,
    combustivel: "Diesel",
    cor: "Prata",
    status: "Reservado",
    imagens: getCarImagesByBrand('Ford', 1),
  },
]

export default function VeiculosPage() {
  const [veiculos, setVeiculos] = useState(veiculosData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredVeiculos, setFilteredVeiculos] = useState(veiculos)
  const [selectedVeiculo, setSelectedVeiculo] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [sortBy, setSortBy] = useState("recentes")
  const [filterMarca, setFilterMarca] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [filterAno, setFilterAno] = useState("")

  // Função para filtrar veículos
  const filterVeiculos = () => {
    let filtered = veiculos

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (veiculo) =>
          veiculo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
          veiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtro por marca
    if (filterMarca) {
      filtered = filtered.filter((veiculo) => veiculo.marca === filterMarca)
    }

    // Filtro por status
    if (filterStatus) {
      filtered = filtered.filter((veiculo) => veiculo.status === filterStatus)
    }

    // Filtro por ano
    if (filterAno) {
      filtered = filtered.filter((veiculo) => veiculo.ano.toString() === filterAno)
    }

    // Ordenação
    switch (sortBy) {
      case "recentes":
        // Assumindo que IDs mais altos são mais recentes
        filtered = [...filtered].sort((a, b) => Number(b.id) - Number(a.id))
        break
      case "preco-asc":
        filtered = [...filtered].sort((a, b) => a.preco - b.preco)
        break
      case "preco-desc":
        filtered = [...filtered].sort((a, b) => b.preco - a.preco)
        break
      case "km-asc":
        filtered = [...filtered].sort((a, b) => a.quilometragem - b.quilometragem)
        break
      case "ano-desc":
        filtered = [...filtered].sort((a, b) => b.ano - a.ano)
        break
      default:
        break
    }

    setFilteredVeiculos(filtered)
  }

  // Aplicar filtros quando qualquer critério mudar
  React.useEffect(() => {
    filterVeiculos()
  }, [searchTerm, filterMarca, filterStatus, filterAno, sortBy, veiculos])

  // Função para adicionar um novo veículo
  const handleAddVeiculo = (newVeiculo: any) => {
    const newId = (Math.max(...veiculos.map((v) => Number(v.id))) + 1).toString()
    setVeiculos([...veiculos, { ...newVeiculo, id: newId }])
    setIsAddDialogOpen(false)
  }

  // Função para editar um veículo existente
  const handleEditVeiculo = (updatedVeiculo: any) => {
    setVeiculos(veiculos.map((veiculo) => (veiculo.id === updatedVeiculo.id ? updatedVeiculo : veiculo)))
    setIsEditDialogOpen(false)
  }

  // Função para excluir um veículo
  const handleDeleteVeiculo = (id: string) => {
    setVeiculos(veiculos.filter((veiculo) => veiculo.id !== id))
    setIsDeleteDialogOpen(false)
  }

  // Extrair marcas únicas para o filtro
  const marcas = Array.from(new Set(veiculos.map((v) => v.marca)))

  // Extrair anos únicos para o filtro
  const anos = Array.from(new Set(veiculos.map((v) => v.ano.toString())))

  // Extrair status únicos para o filtro
  const statusOptions = Array.from(new Set(veiculos.map((v) => v.status)))

  // Função para formatar preço em BRL
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestão de Estoque</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Veículo
        </Button>
      </div>

      {/* Barra de filtros e pesquisa */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar veículos..."
              className="pl-8"
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
                  <label className="text-xs font-medium">Marca</label>
                  <Select value={filterMarca} onValueChange={setFilterMarca}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {marcas.map((marca) => (
                        <SelectItem key={marca} value={marca}>
                          {marca}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
                  <label className="text-xs font-medium">Ano</label>
                  <Select value={filterAno} onValueChange={setFilterAno}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {anos.map((ano) => (
                        <SelectItem key={ano} value={ano}>
                          {ano}
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
                    setFilterMarca("")
                    setFilterStatus("")
                    setFilterAno("")
                    setSearchTerm("")
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recentes">Mais recentes</SelectItem>
              <SelectItem value="preco-asc">Menor preço</SelectItem>
              <SelectItem value="preco-desc">Maior preço</SelectItem>
              <SelectItem value="km-asc">Menor quilometragem</SelectItem>
              <SelectItem value="ano-desc">Ano mais recente</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabela de veículos */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Veículo</TableHead>
              <TableHead className="hidden lg:table-cell">Ano</TableHead>
              <TableHead className="hidden lg:table-cell">Preço</TableHead>
              <TableHead className="hidden lg:table-cell">Quilometragem</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVeiculos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Nenhum veículo encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredVeiculos.map((veiculo) => (
                <TableRow key={veiculo.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden hidden lg:block rounded-md bg-muted">
                        {veiculo.imagens && veiculo.imagens.length > 0 ? (
                          <Image
                            width={200}
                            height={300}
                            src={veiculo.imagens[0]}
                            alt={`${veiculo.marca} ${veiculo.modelo}`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Car className="h-full w-full p-2 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">
                          {veiculo.marca} {veiculo.modelo}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {veiculo.cor} • {veiculo.combustivel}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell  className="hidden lg:table-cell">{veiculo.ano}</TableCell>
                  <TableCell  className="hidden lg:table-cell">{formatPrice(veiculo.preco)}</TableCell>
                  <TableCell  className="hidden lg:table-cell">{veiculo.quilometragem.toLocaleString()} km</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        veiculo.status === "Disponível"
                          ? "bg-green-100 text-green-800"
                          : veiculo.status === "Reservado"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {veiculo.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <span className="sr-only">Abrir menu</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedVeiculo(veiculo)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => {
                            setSelectedVeiculo(veiculo)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Diálogos para adicionar, editar e excluir veículos */}
      <AddVeiculoDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSave={handleAddVeiculo} />

      {selectedVeiculo && (
        <>
          <EditVeiculoDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            veiculo={selectedVeiculo}
            onSave={handleEditVeiculo}
          />

          <DeleteVeiculoDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            veiculo={selectedVeiculo}
            onDelete={() => handleDeleteVeiculo(selectedVeiculo.id)}
          />
        </>
      )}
    </div>
  )
}

