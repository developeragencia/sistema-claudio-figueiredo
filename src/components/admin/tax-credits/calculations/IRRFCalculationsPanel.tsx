
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, FileText, History, Settings, PieChart } from 'lucide-react';

const IRRFCalculationsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cálculos IRRF</h1>
      </div>

      <Tabs defaultValue="calculator" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calculator">Calculadora</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-primary" />
                Calculadora IRRF
              </CardTitle>
              <CardDescription>
                Realize cálculos precisos de IRRF com ajustes automáticos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipo de Contribuinte</label>
                    <select className="w-full p-2 border rounded">
                      <option>Pessoa Física</option>
                      <option>Pessoa Jurídica</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Período</label>
                    <select className="w-full p-2 border rounded">
                      <option>2023</option>
                      <option>2022</option>
                      <option>2021</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Valor Base</label>
                    <input type="text" className="w-full p-2 border rounded" placeholder="0,00" />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button className="bg-primary text-white px-4 py-2 rounded">Calcular IRRF</button>
                </div>

                <div className="mt-6 p-4 border rounded-md bg-muted/20">
                  <h3 className="font-medium mb-2">Resultado do Cálculo</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Base de Cálculo:</p>
                      <p className="font-medium">R$ 0,00</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Alíquota:</p>
                      <p className="font-medium">0%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Dedução:</p>
                      <p className="font-medium">R$ 0,00</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">IRRF Devido:</p>
                      <p className="font-medium text-primary">R$ 0,00</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Histórico de Cálculos
              </CardTitle>
              <CardDescription>
                Registro de todos os cálculos realizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Tabela com histórico de cálculos realizados</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Relatórios de Cálculos
              </CardTitle>
              <CardDescription>
                Visualize e exporte relatórios de cálculos IRRF
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Gráficos e tabelas de relatórios</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Configurações
              </CardTitle>
              <CardDescription>
                Configure parâmetros e tabelas de cálculo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Formulário de configurações de cálculo</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IRRFCalculationsPanel;
