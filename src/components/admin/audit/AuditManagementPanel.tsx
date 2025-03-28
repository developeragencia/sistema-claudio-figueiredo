
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, ClipboardList, Clock, Users, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AuditManagementPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestão de Auditorias</h1>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="current">Auditorias em Curso</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ClipboardList className="h-5 w-5 mr-2 text-primary" />
                  Status das Auditorias
                </CardTitle>
                <CardDescription>
                  Visão geral do estado das auditorias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Em Andamento</span>
                    <Badge className="bg-blue-500">3</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pendentes</span>
                    <Badge className="bg-amber-500">2</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Concluídas</span>
                    <Badge className="bg-green-500">7</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Com Ressalvas</span>
                    <Badge className="bg-red-500">1</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  Próximas Auditorias
                </CardTitle>
                <CardDescription>
                  Auditorias agendadas para os próximos dias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="text-sm font-medium">Auditoria Fiscal - Cliente ABC</h4>
                    <p className="text-xs text-muted-foreground">Agendada para 05/05/2023</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="text-sm font-medium">Revisão de Créditos - Cliente XYZ</h4>
                    <p className="text-xs text-muted-foreground">Agendada para 12/05/2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Equipe de Auditoria
                </CardTitle>
                <CardDescription>
                  Auditores disponíveis e suas atribuições
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">João Silva</h4>
                      <p className="text-xs text-muted-foreground">2 auditorias ativas</p>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Ana Costa</h4>
                      <p className="text-xs text-muted-foreground">1 auditoria ativa</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Auditorias em Andamento
              </CardTitle>
              <CardDescription>
                Acompanhe as auditorias atualmente em curso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Lista de auditorias em andamento com detalhes</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Histórico de Auditorias
              </CardTitle>
              <CardDescription>
                Registro completo de auditorias realizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Tabela de histórico de auditorias com filtros</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Relatórios de Auditoria
              </CardTitle>
              <CardDescription>
                Relatórios detalhados das auditorias realizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Formulário para gerar relatórios de auditoria</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuditManagementPanel;
