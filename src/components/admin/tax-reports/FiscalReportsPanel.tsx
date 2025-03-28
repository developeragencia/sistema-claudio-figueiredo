
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Calendar, Filter, Download, PieChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const FiscalReportsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Relatórios Fiscais</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="generate">Gerar Relatórios</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="templates">Modelos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Relatórios Recentes
                </CardTitle>
                <CardDescription>
                  Seus relatórios fiscais mais recentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium">Relatório Fiscal Anual</h4>
                      <p className="text-xs text-muted-foreground">Gerado em 15/04/2023</p>
                    </div>
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="p-3 border rounded-lg flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium">Análise de Tributos Federais</h4>
                      <p className="text-xs text-muted-foreground">Gerado em 03/04/2023</p>
                    </div>
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="p-3 border rounded-lg flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium">IRRF - Primeiro Trimestre</h4>
                      <p className="text-xs text-muted-foreground">Gerado em 31/03/2023</p>
                    </div>
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Próximos Relatórios
                </CardTitle>
                <CardDescription>
                  Relatórios programados para geração
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium">Relatório Mensal de Retenções</h4>
                      <p className="text-xs text-muted-foreground">Programado para 30/04/2023</p>
                    </div>
                    <Badge className="bg-amber-500">Pendente</Badge>
                  </div>
                  <div className="p-3 border rounded-lg flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium">Relatório de Compensações</h4>
                      <p className="text-xs text-muted-foreground">Programado para 15/05/2023</p>
                    </div>
                    <Badge className="bg-amber-500">Pendente</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-primary" />
                  Estatísticas
                </CardTitle>
                <CardDescription>
                  Relatórios por categoria e status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[150px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2 border rounded-md">
                        <p className="text-xs text-muted-foreground">Relatórios</p>
                        <p className="text-xl font-semibold">47</p>
                      </div>
                      <div className="p-2 border rounded-md">
                        <p className="text-xs text-muted-foreground">Gerados este mês</p>
                        <p className="text-xl font-semibold">12</p>
                      </div>
                      <div className="p-2 border rounded-md">
                        <p className="text-xs text-muted-foreground">Modelos</p>
                        <p className="text-xl font-semibold">8</p>
                      </div>
                      <div className="p-2 border rounded-md">
                        <p className="text-xs text-muted-foreground">Compartilhados</p>
                        <p className="text-xl font-semibold">15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="generate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                Gerar Novo Relatório
              </CardTitle>
              <CardDescription>
                Selecione os parâmetros para gerar um novo relatório fiscal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipo de Relatório</label>
                    <select className="w-full p-2 border rounded">
                      <option>Relatório Fiscal Completo</option>
                      <option>Relatório de Retenções</option>
                      <option>Relatório de Compensações</option>
                      <option>Análise de Tributos</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Período</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="date" className="p-2 border rounded" />
                      <input type="date" className="p-2 border rounded" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Formato</label>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="pdf" name="format" checked />
                        <label htmlFor="pdf">PDF</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="excel" name="format" />
                        <label htmlFor="excel">Excel</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="csv" name="format" />
                        <label htmlFor="csv">CSV</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Incluir Seções</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="summary" checked />
                        <label htmlFor="summary">Resumo Executivo</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="details" checked />
                        <label htmlFor="details">Detalhamento</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="charts" checked />
                        <label htmlFor="charts">Gráficos</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="recommendations" />
                        <label htmlFor="recommendations">Recomendações</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-8">
                    <button className="bg-primary text-white px-4 py-2 rounded-md">Gerar Relatório</button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Relatórios</CardTitle>
              <CardDescription>
                Visualize e acesse todos os relatórios gerados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Tabela com histórico de relatórios gerados</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Modelos de Relatórios</CardTitle>
              <CardDescription>
                Gerencia modelos personalizados de relatórios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Lista de modelos de relatórios</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FiscalReportsPanel;
