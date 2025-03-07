import Link from "next/link"
import {
  ArrowRight,
  Calendar,
  Car,
  CheckCircle,
  ChevronRight,
  MapPin,
  MessageSquare,
  Phone,
  Star,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full justify-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Auto Revenda</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#veiculos" className="text-sm font-medium hover:text-primary">
              Veículos
            </Link>
            <Link href="#servicos" className="text-sm font-medium hover:text-primary">
              Serviços
            </Link>
            <Link href="#depoimentos" className="text-sm font-medium hover:text-primary">
              Depoimentos
            </Link>
            <Link href="#contato" className="text-sm font-medium hover:text-primary">
              Contato
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block">
              <Button variant="outline" size="sm">
                Área do Cliente
              </Button>
            </Link>
            <Link href="#contato">
              <Button size="sm">Agendar Visita</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <div
          className="h-[70vh] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container">
            <div className="max-w-xl space-y-5 pl-[210px]">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                Encontre o carro dos seus sonhos
              </h1>
              <p className="text-xl text-white/90">
                Oferecemos os melhores veículos novos e seminovos com condições especiais de financiamento.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="w-full sm:w-auto">
                  Ver Veículos <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  Agendar Test Drive
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section id="veiculos" className="py-16 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Veículos em Destaque</h2>
              <p className="text-muted-foreground mt-2">Confira nossos modelos mais procurados</p>
            </div>
            <Link href="/veiculos" className="mt-4 md:mt-0 inline-flex items-center text-primary hover:underline">
              Ver todos os veículos <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Vehicle 1 */}
            <Card className="overflow-hidden group">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80"
                  alt="Toyota Corolla"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">Toyota Corolla</h3>
                    <p className="text-muted-foreground text-sm">2022 • Flex • Automático</p>
                  </div>
                  <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-medium">Novo</div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-2xl font-bold">R$ 120.000</div>
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle 2 */}
            <Card className="overflow-hidden group">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80"
                  alt="Jeep Compass"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">Jeep Compass</h3>
                    <p className="text-muted-foreground text-sm">2023 • Diesel • 4x4</p>
                  </div>
                  <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-medium">Destaque</div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-2xl font-bold">R$ 160.000</div>
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle 3 */}
            <Card className="overflow-hidden group">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"
                  alt="Audi A3"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">Audi A3 Sedan</h3>
                    <p className="text-muted-foreground text-sm">2021 • Gasolina • Automático</p>
                  </div>
                  <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-medium">Premium</div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-2xl font-bold">R$ 185.000</div>
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicos" className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Nossos Serviços</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Compra e Venda</h3>
              <p className="text-muted-foreground">
                Compre seu veículo novo ou seminovo com as melhores condições do mercado.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Test Drive</h3>
              <p className="text-muted-foreground">
                Agende um test drive e experimente o veículo antes de tomar sua decisão.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Consultoria</h3>
              <p className="text-muted-foreground">
                Consultoria especializada para ajudar você a escolher o melhor veículo para suas necessidades.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Financiamento</h3>
              <p className="text-muted-foreground">
                Oferecemos as melhores opções de financiamento com taxas competitivas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Por que escolher a Auto Revenda?</h2>
              <p className="text-primary-foreground/90 mb-8">
                Há mais de 15 anos no mercado, a Auto Revenda se destaca pela excelência no atendimento e qualidade dos
                veículos. Nosso compromisso é oferecer a melhor experiência na compra do seu próximo carro.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-foreground mt-0.5" />
                  <div>
                    <h3 className="font-bold text-lg">Veículos Certificados</h3>
                    <p className="text-primary-foreground/80">
                      Todos os nossos veículos passam por rigorosa inspeção técnica.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-foreground mt-0.5" />
                  <div>
                    <h3 className="font-bold text-lg">Garantia Estendida</h3>
                    <p className="text-primary-foreground/80">Oferecemos garantia estendida para sua tranquilidade.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-foreground mt-0.5" />
                  <div>
                    <h3 className="font-bold text-lg">Atendimento Personalizado</h3>
                    <p className="text-primary-foreground/80">
                      Nossa equipe está preparada para oferecer o melhor atendimento.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=800&q=80"
                alt="Concessionária"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-lg shadow-lg max-w-xs hidden md:block">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-bold text-foreground">4.9/5</span>
                </div>
                <p className="text-sm text-foreground">{`"Excelente atendimento e veículos de qualidade. Recomendo a todos!"`}</p>
                <p className="text-sm font-medium mt-2 text-foreground">— Maria Silva</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-16 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">O que nossos clientes dizem</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="p-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="mt-4 text-muted-foreground">
              {`  "Comprei meu Honda Civic na Auto Revenda e fiquei muito satisfeito com todo o processo. Atendimento
                excelente e preço justo. Recomendo!"`}
              </blockquote>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">JS</span>
                </div>
                <div>
                  <p className="font-medium">João Silva</p>
                  <p className="text-sm text-muted-foreground">Cliente desde 2021</p>
                </div>
              </div>
            </Card>

            {/* Testimonial 2 */}
            <Card className="p-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="mt-4 text-muted-foreground">
         {`       "O financiamento foi super rápido e com ótimas condições. O vendedor foi muito atencioso e me ajudou a
                escolher o carro perfeito para minha família."`}
              </blockquote>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">PS</span>
                </div>
                <div>
                  <p className="font-medium">Pedro Santos</p>
                  <p className="text-sm text-muted-foreground">Cliente desde 2022</p>
                </div>
              </div>
            </Card>

            {/* Testimonial 3 */}
            <Card className="p-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="mt-4 text-muted-foreground">
                {`"Já é o segundo carro que compro na Auto Revenda. A qualidade dos veículos e o pós-venda são excelentes.
                Sempre indico para amigos e familiares."`}
              </blockquote>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">MO</span>
                </div>
                <div>
                  <p className="font-medium">Maria Oliveira</p>
                  <p className="text-sm text-muted-foreground">Cliente desde 2020</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contato" className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Entre em contato</h2>
              <p className="text-muted-foreground mb-8">
                Estamos prontos para atender você. Entre em contato conosco para agendar uma visita, tirar dúvidas ou
                solicitar mais informações sobre nossos veículos e serviços.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Endereço</h3>
                    <p className="text-muted-foreground">Av. Brasil, 1500 - Centro, São Paulo - SP</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Telefone</h3>
                    <p className="text-muted-foreground">(11) 3456-7890</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">contato@autorevenda.com.br</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-bold text-lg mb-4">Horário de Funcionamento</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Segunda a Sexta</span>
                    <span>08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado</span>
                    <span>09:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo</span>
                    <span>Fechado</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Agende uma visita</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Nome
                        </label>
                        <input
                          id="name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Telefone
                        </label>
                        <input
                          id="phone"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="interest" className="text-sm font-medium">
                        Interesse
                      </label>
                      <select
                        id="interest"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Selecione uma opção</option>
                        <option value="compra">Compra de veículo</option>
                        <option value="venda">Venda de veículo</option>
                        <option value="financiamento">Financiamento</option>
                        <option value="test-drive">Test Drive</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Mensagem
                      </label>
                      <textarea
                        id="message"
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Como podemos ajudar?"
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Car className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Auto Revenda</span>
              </div>
              <p className="text-muted-foreground">
                Sua concessionária de confiança para compra e venda de veículos novos e seminovos.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#veiculos" className="text-muted-foreground hover:text-primary">
                    Veículos
                  </Link>
                </li>
                <li>
                  <Link href="#servicos" className="text-muted-foreground hover:text-primary">
                    Serviços
                  </Link>
                </li>
                <li>
                  <Link href="#depoimentos" className="text-muted-foreground hover:text-primary">
                    Depoimentos
                  </Link>
                </li>
                <li>
                  <Link href="#contato" className="text-muted-foreground hover:text-primary">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Serviços</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Compra e Venda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Financiamento
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Seguro Automotivo
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Consultoria
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contato</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Av. Brasil, 1500 - Centro, São Paulo - SP</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>(11) 3456-7890</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span>contato@autorevenda.com.br</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Auto Revenda. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Política de Privacidade
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Termos de Uso
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

