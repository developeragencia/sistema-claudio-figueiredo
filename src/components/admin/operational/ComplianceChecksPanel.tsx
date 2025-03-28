
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, ShieldCheck, FileCheck, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const ComplianceChecksPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Verificações de Compliance</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="regulations">Regulamentações</TabsTrigger>
          <TabsTrigger value="audits">Auditorias</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                    Status Geral de Compliance
                  </CardTitle>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                    96% Conforme
                  </Badge>
                </div>
                <CardDescription>
                  Verificações de conformidade realizadas nos últimos 30 dias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">LGPD</span>
                      <span className="text-sm text-muted-foreground">98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Contábil</span>
                      <span className="text-sm text-muted-foreground">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Fiscal</span>
                      <span className="text-sm text-muted-foreground">97%</span>
                    </div>
                    <Progress value={97} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Segurança de Dados</span>
                      <span className="text-sm text-muted-foreground">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ShieldCheck className="h-5 w-5 mr-2 text-primary" />
                  Verificações Pendentes
                </CardTitle>
                <CardDescription>
                  Itens que necessitam de atenção
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-amber-200 bg-amber-50 flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Retenção de Dados</h4>
                      <p className="text-xs text-muted-foreground">Política de retenção precisa ser atualizada</p>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-amber-200 bg-amber-50 flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Controle de Acesso</h4>
                      <p className="text-xs text-muted-foreground">Revisão de permissões necessária</p>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-red-200 bg-red-50 flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Backup de Dados</h4>
                      <p className="text-xs text-muted-foreground">Backup semanal não concluído</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileCheck className="h-5 w-5 mr-2 text-primary" />
                  Próximas Auditorias
                </CardTitle>
                <CardDescription>
                  Auditorias programadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <h4 className="font-medium text-sm">Auditoria Fiscal</h4>
                      <p className="text-xs text-muted-foreground">Trimestral</p>
                    </div>
                    <Badge variant="outline">15/06/2023</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <h4 className="font-medium text-sm">Proteção de Dados</h4>
                      <p className="text-xs text-muted-foreground">Semestral</p>
                    </div>
                    <Badge variant="outline">30/06/2023</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Segurança da Informação</h4>
                      <p className="text-xs text-muted-foreground">Anual</p>
                    </div>
                    <Badge variant="outline">10/07/2023</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regulations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regulamentações Aplicáveis</CardTitle>
              <CardDescription>
                Leis e regulamentos relevantes para o negócio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Lista de regulamentações será exibida aqui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Auditorias</CardTitle>
              <CardDescription>
                Auditorias realizadas e seus resultados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Histórico de auditorias será exibido aqui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios de Compliance</CardTitle>
              <CardDescription>
                Relatórios detalhados sobre conformidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Relatórios de compliance serão exibidos aqui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceChecksPanel;
