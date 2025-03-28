
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, BarChart3, PieChart, TrendingUp, RefreshCw, Calendar, 
  Users, Building, FileText, Clock, Download, Printer, Share2 
} from "lucide-react";

const OperationalDashboardPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard Operacional</h2>
          <p className="text-muted-foreground">
            Visualização interativa de dados operacionais em tempo real.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Filtrar Período
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border-green-100 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Processos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">184</div>
                <p className="text-xs text-muted-foreground">+12% vs. período anterior</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-100 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">72</div>
                <p className="text-xs text-muted-foreground">+5 novos este mês</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 border-amber-100 dark:border-amber-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Execução</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">+8% vs. meta</p>
              </div>
              <TrendingUp className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/50 dark:to-violet-950/50 border-purple-100 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">5.2 dias</div>
                <p className="text-xs text-muted-foreground">-0.8 dias vs. período anterior</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
          <TabsTrigger value="performance">Desempenho</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Processos</CardTitle>
                <CardDescription>
                  Análise da distribuição de processos operacionais por tipo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg border border-dashed">
                  <div className="text-center">
                    <PieChart className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <h3 className="text-lg font-medium">Gráfico de Distribuição</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-2">
                      Visualize a distribuição percentual dos diferentes tipos de processos operacionais.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tendência Mensal</CardTitle>
                <CardDescription>
                  Evolução do volume de processos nos últimos 12 meses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg border border-dashed">
                  <div className="text-center">
                    <BarChart3 className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <h3 className="text-lg font-medium">Gráfico de Tendência</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-2">
                      Visualize a evolução mensal do volume de processos operacionais.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Clientes por Volume Operacional</CardTitle>
                <Button variant="outline" size="sm">
                  Filtrar
                </Button>
              </div>
              <CardDescription>
                Ranking de clientes por volume de processos operacionais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {i}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <p className="font-medium">Cliente Corporativo {i}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{85 - (i * 10)} processos ativos</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge variant={i === 1 ? "default" : (i === 2 ? "secondary" : "outline")}>
                        {i === 1 ? "Alto Volume" : (i === 2 ? "Médio Volume" : "Regular")}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Desempenho</CardTitle>
              <CardDescription>
                Indicadores chave de desempenho operacional.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Eficiência Processual</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">87%</span>
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="h-2 bg-muted mt-2 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Tempo de Resposta</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">4.5h</span>
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="h-2 bg-muted mt-2 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Precisão de Análise</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">95%</span>
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="h-2 bg-muted mt-2 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Satisfação do Cliente</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">92%</span>
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="h-2 bg-muted mt-2 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Disponíveis</CardTitle>
              <CardDescription>
                Relatórios operacionais gerados e disponíveis para download.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Resumo Operacional Mensal", date: "01/04/2023", type: "PDF" },
                  { title: "Análise de Desempenho Trimestral", date: "15/03/2023", type: "XLSX" },
                  { title: "Auditoria Operacional", date: "22/02/2023", type: "PDF" },
                  { title: "Indicadores de Produtividade", date: "10/02/2023", type: "XLSX" }
                ].map((report, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{report.title}</p>
                        <p className="text-sm text-muted-foreground">Gerado em: {report.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Printer className="mr-2 h-4 w-4" />
                        Imprimir
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Baixar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Compartilhar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OperationalDashboardPanel;
