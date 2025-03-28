
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Server, Clock, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const OperationalMonitoringPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Monitoramento Operacional</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="systems">Sistemas</TabsTrigger>
          <TabsTrigger value="processes">Processos</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Server className="h-5 w-5 mr-2 text-primary" />
                  Status do Sistema
                </CardTitle>
                <CardDescription>
                  Monitoramento dos serviços em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Servidor Principal</span>
                    <Badge className="bg-green-500">Online</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Banco de Dados</span>
                    <Badge className="bg-green-500">Online</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Serviços de API</span>
                    <Badge className="bg-green-500">Online</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sistema de Arquivos</span>
                    <Badge className="bg-green-500">Online</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-primary" />
                  Atividade do Sistema
                </CardTitle>
                <CardDescription>
                  Carga e desempenho do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>CPU</span>
                    <Badge className="bg-amber-500">42%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Memória</span>
                    <Badge className="bg-green-500">36%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Disco</span>
                    <Badge className="bg-amber-500">68%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Rede</span>
                    <Badge className="bg-green-500">28%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
                  Alertas Ativos
                </CardTitle>
                <CardDescription>
                  Problemas que precisam de atenção
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Críticos</span>
                    <Badge className="bg-green-500">0</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Avisos</span>
                    <Badge className="bg-amber-500">2</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Informativos</span>
                    <Badge className="bg-blue-500">5</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Resolvidos Hoje</span>
                    <Badge className="bg-green-500">8</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="systems" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monitoramento de Sistemas</CardTitle>
              <CardDescription>
                Status detalhado de todos os sistemas e componentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Detalhes do monitoramento de sistemas serão exibidos aqui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Processos em Execução</CardTitle>
              <CardDescription>
                Detalhes dos processos atualmente em execução
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Lista de processos em execução será exibida aqui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Alertas</CardTitle>
              <CardDescription>
                Visualize e gerencie todos os alertas do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Lista de alertas será exibida aqui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OperationalMonitoringPanel;
