import { CalendarClock, Car, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Dashboard() {
  // Dados de exemplo para o dashboard
  const summaryData = [
    {
      title: "Leads Captados Hoje",
      value: "12",
      icon: Users,
      change: "+20%",
    },
    {
      title: "Agendamentos Hoje",
      value: "8",
      icon: CalendarClock,
      change: "+5%",
    },
    {
      title: "Veículos Mais Buscados",
      value: "5",
      icon: Car,
      change: "+12%",
    },
  ]

  const recentLeads = [
    { name: "João Silva", phone: "(11) 98765-4321", vehicle: "Honda Civic 2022", date: "Hoje, 10:30" },
    { name: "Maria Oliveira", phone: "(11) 91234-5678", vehicle: "Toyota Corolla 2023", date: "Hoje, 09:15" },
    { name: "Pedro Santos", phone: "(11) 99876-5432", vehicle: "Jeep Compass", date: "  09:15" },
    { name: "Ana Souza", phone: "(11) 97654-3210", vehicle: "Hyundai HB20", date: "Ontem, 16:20" },
    { name: "Carlos Mendes", phone: "(11) 95432-1098", vehicle: "Volkswagen T-Cross", date: "Ontem, 14:30" },
  ]

  const recentAppointments = [
    { name: "Roberto Almeida", vehicle: "Fiat Pulse", date: "Hoje, 14:00", status: "Confirmado" },
    { name: "Fernanda Lima", vehicle: "Chevrolet Onix", date: "Hoje, 16:30", status: "Confirmado" },
    { name: "Marcelo Costa", vehicle: "Renault Kwid", date: "Amanhã, 10:00", status: "Pendente" },
    { name: "Juliana Martins", vehicle: "Nissan Kicks", date: "Amanhã, 15:00", status: "Pendente" },
    { name: "Ricardo Gomes", vehicle: "Ford Ranger", date: "23/06, 11:00", status: "Confirmado" },
  ]

  return (
    <div className="flex-1 w-full space-y-6 p-6 px-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Atualizado em {new Date().toLocaleDateString("pt-BR")} às{" "}
          {new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>

      {/* Cards de resumo */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {summaryData.map((item) => (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">{item.change}</span> em relação a ontem
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabelas de leads e agendamentos recentes */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Leads recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Leads Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Veículo</TableHead>
                    <TableHead className="hidden md:block">Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="w-full">
                  {recentLeads.map((lead) => (
                    <TableRow key={lead.name}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell className="truncate">{lead.vehicle}</TableCell>
                      <TableCell className="truncate hidden md:block">{lead.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Agendamentos recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Agendamentos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="hidden md:block">Veículo</TableHead>
                    <TableHead className="hidden md:block">Data</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentAppointments.map((appointment) => (
                    <TableRow key={appointment.name}>
                      <TableCell className="font-medium">{appointment.name}</TableCell>
                      <TableCell className="hidden md:block">{appointment.vehicle}</TableCell>
                      <TableCell className="hidden md:block">{appointment.date}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            appointment.status === "Confirmado"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

