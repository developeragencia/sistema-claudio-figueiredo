
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileCheck, Search, CalendarDays, Filter, ArrowRight, 
  CheckCircle, XCircle, AlertCircle, Download, FileText, 
  Users, Building, Clock, BarChart4, FileBarChart 
} from "lucide-react";

const OperationalAuditsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Auditorias Operacionais</h2>
          <p className="text-muted-foreground">
            Gerenciamento e acompanhamento de auditorias operacionais.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Cronograma
          </Button>
          <Button className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            Nova Auditoria
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <CardTitle className="text-sm font-medium">Total de Auditorias</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">152</div>
            <div className="text-xs text-muted-foreground">+8 em relação ao mês anterior</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <div className="text-xs text-muted-foreground">56.6% do total</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-amber-500"></div>
              <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="text-xs text-muted-foreground">27.6% do total</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="text-xs text-muted-foreground">15.8% do total</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Buscar Auditorias</CardTitle>
          <CardDescription>
            Pesquise auditorias por cliente, período ou tipo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Buscar por cliente ou número..." 
                className="pl-9" 
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
              <Button>Buscar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Ativas</TabsTrigger>
          <TabsTrigger value="completed">Concluídas</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Auditorias Ativas</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>
              <CardDescription>
                Lista de auditorias operacionais em andamento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => {
                  const inProgress = i % 2 === 0;
                  const pending = i % 2 === 1;
                  
                  return (
                    <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3 md:mb-0">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <FileCheck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Auditoria Operacional #{i + 1001}</p>
                            <Badge variant={inProgress ? "default" : "outline"}>
                              {inProgress ? "Em andamento" : "Pendente"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building className="h-3.5 w-3.5" />
                            <span>Cliente {i + 1}</span>
                            <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                            <Clock className="h-3.5 w-3.5" />
                            <span>Início: {`${5 + i}/04/2023`}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Ver Detalhes</Button>
                        <Button size="sm">
                          Atualizar
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">Ver Mais</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Auditorias Concluídas</CardTitle>
              <CardDescription>
                Lista de auditorias operacionais finalizadas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-muted p-3 text-sm font-medium">
                  <div>Número</div>
                  <div>Cliente</div>
                  <div>Período</div>
                  <div>Auditor</div>
                  <div>Resultado</div>
                  <div>Relatório</div>
                </div>
                <div className="divide-y">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const success = i % 3 === 0;
                    const warning = i % 3 === 1;
                    const error = i % 3 === 2;
                    
                    return (
                      <div key={i} className="grid grid-cols-6 p-3 text-sm">
                        <div>AUD-{2000 + i}</div>
                        <div>Cliente {i + 1}</div>
                        <div>{`01/03 - ${i+20}/03/2023`}</div>
                        <div>Auditor {i + 1}</div>
                        <div>
                          {success && (
                            <Badge variant="success" className="flex w-fit items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Aprovado
                            </Badge>
                          )}
                          {warning && (
                            <Badge variant="warning" className="flex w-fit items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              Ressalvas
                            </Badge>
                          )}
                          {error && (
                            <Badge variant="destructive" className="flex w-fit items-center gap-1">
                              <XCircle className="h-3 w-3" />
                              Reprovado
                            </Badge>
                          )}
                        </div>
                        <div>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <FileText className="h-3.5 w-3.5" />
                            Ver
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Resumo por Cliente</CardTitle>
                <CardDescription>
                  Distribuição de auditorias por cliente.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg border border-dashed">
                  <div className="text-center">
                    <Building className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <h3 className="font-medium">Gráfico por Cliente</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-1">
                      Visualize a distribuição de auditorias por cliente.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resultados das Auditorias</CardTitle>
                <CardDescription>
                  Análise dos resultados das auditorias.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg border border-dashed">
                  <div className="text-center">
                    <BarChart4 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <h3 className="font-medium">Gráfico de Resultados</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-1">
                      Visualize os resultados das auditorias operacionais.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Relatórios de Auditoria</CardTitle>
                <CardDescription>
                  Relatórios completos das auditorias operacionais.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileBarChart className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Relatório de Auditoria #{2000 + i}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-3.5 w-3.5" />
                            <span>Cliente {i + 1}</span>
                            <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                            <span>{`${10 + i}/04/2023`}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button>Download</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OperationalAuditsPanel;
