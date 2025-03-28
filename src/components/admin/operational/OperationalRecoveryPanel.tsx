
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, FileSearch, ArrowUpRight, Clock, CheckCircle, AlertCircle } from "lucide-react";

const OperationalRecoveryPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Recuperação Operacional</h2>
          <p className="text-muted-foreground">
            Gerenciamento e acompanhamento de processos de recuperação operacional.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Novo Processo
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Processos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">50% do total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98</div>
            <p className="text-xs text-muted-foreground">39.5% do total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">26</div>
            <p className="text-xs text-muted-foreground">10.5% do total</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="processes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="processes">Processos</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="processes" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Processos de Recuperação</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileSearch className="mr-2 h-4 w-4" />
                    Filtrar
                  </Button>
                  <Button variant="outline" size="sm">
                    Exportar
                  </Button>
                </div>
              </div>
              <CardDescription>
                Lista de processos de recuperação operacional em andamento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-muted p-3 text-sm font-medium">
                  <div>ID</div>
                  <div>Cliente</div>
                  <div>Tipo</div>
                  <div>Data de Início</div>
                  <div>Status</div>
                  <div>Ações</div>
                </div>
                <div className="divide-y">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="grid grid-cols-6 p-3 text-sm">
                      <div>REC-{i}00{i}</div>
                      <div>Cliente {i}</div>
                      <div>Operacional</div>
                      <div>{`${i+10}/04/2023`}</div>
                      <div>
                        <Badge variant={i % 2 === 0 ? "default" : (i % 3 === 0 ? "success" : "outline")}>
                          {i % 2 === 0 ? "Em andamento" : (i % 3 === 0 ? "Concluído" : "Pendente")}
                        </Badge>
                      </div>
                      <div>
                        <Button variant="ghost" size="icon">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Desempenho</CardTitle>
              <CardDescription>
                Métricas e indicadores de desempenho dos processos de recuperação operacional.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Tempo Médio de Recuperação</h3>
                  <div className="flex items-center gap-4">
                    <Clock className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="text-2xl font-bold">18 dias</p>
                      <p className="text-sm text-muted-foreground">-3 dias em relação à média anterior</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Taxa de Sucesso</h3>
                  <div className="flex items-center gap-4">
                    <CheckCircle className="h-8 w-8 text-emerald-500" />
                    <div>
                      <p className="text-2xl font-bold">84%</p>
                      <p className="text-sm text-muted-foreground">+2% em relação ao período anterior</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Processos Críticos</h3>
                  <div className="flex items-center gap-4">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">Necessitam de atenção imediata</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentação de Processos</CardTitle>
              <CardDescription>
                Documentos relacionados aos processos de recuperação operacional.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <FileSearch className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Relatório de Recuperação #{i}</p>
                        <p className="text-sm text-muted-foreground">Processo REC-{i}00{i} - Atualizado em {i+10}/04/2023</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Visualizar
                    </Button>
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

export default OperationalRecoveryPanel;
