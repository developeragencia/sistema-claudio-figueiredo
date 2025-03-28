
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpDown, FileCheck, AlertTriangle, Search, Filter, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const DataReconciliationPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reconciliação de Dados</h1>
        <Button>
          <ArrowUpDown className="h-4 w-4 mr-2" />
          Nova Reconciliação
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Ativas</TabsTrigger>
          <TabsTrigger value="results">Resultados</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center">
                  <ArrowUpDown className="h-5 w-5 mr-2 text-primary" />
                  Reconciliação de Receitas Fiscais - Maio/2023
                </CardTitle>
                <Badge className="bg-blue-500">Em Andamento</Badge>
              </div>
              <CardDescription>
                Comparando dados de diferentes fontes fiscais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Progresso</span>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 p-3 bg-muted/20 rounded-lg">
                    <h3 className="text-sm font-medium">Fonte A</h3>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sistema:</span>
                      <span>ERP Fiscal</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Registros:</span>
                      <span>5.842</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Valor Total:</span>
                      <span>R$ 1.258.432,85</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 p-3 bg-muted/20 rounded-lg">
                    <h3 className="text-sm font-medium">Fonte B</h3>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sistema:</span>
                      <span>Extrato Bancário</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Registros:</span>
                      <span>5.850</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Valor Total:</span>
                      <span>R$ 1.260.145,62</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium">Discrepância Identificada</h4>
                      <p className="text-xs text-muted-foreground">Diferença de R$ 1.712,77 (0,14%)</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Analisar</Button>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm">
                    <FileCheck className="h-4 w-4 mr-2" />
                    Concluir Reconciliação
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar Resultados
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Reconciliação de Folha de Pagamento - Abril/2023</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    100% compatível - Sem discrepâncias encontradas
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Ver Detalhes</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Reconciliação de Impostos - Q1/2023</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    97% compatível - 3 discrepâncias encontradas
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Ver Detalhes</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Reconciliação de Estoque - Março/2023</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    82% compatível - 18 discrepâncias críticas encontradas
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Ver Detalhes</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Reconciliações</CardTitle>
              <CardDescription>
                Registro de todas as reconciliações realizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Histórico de reconciliações será exibido aqui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Reconciliação</CardTitle>
              <CardDescription>
                Ajuste os parâmetros do processo de reconciliação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Configurações de reconciliação serão exibidas aqui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataReconciliationPanel;
