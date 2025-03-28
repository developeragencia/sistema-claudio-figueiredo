
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, PieChart, LineChart, Download, Calendar, Filter, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from '@/components/ui/skeleton';

const InteractiveDashboardPanel: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedView, setSelectedView] = useState('fiscal');

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast("Dados atualizados", {
        description: "Os dados do dashboard foram atualizados com sucesso."
      });
    }, 1500);
  };

  const handleExport = (format: string) => {
    toast("Exportando dashboard", {
      description: `Exportando dashboard em formato ${format.toUpperCase()}`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard Interativo</h2>
          <p className="text-muted-foreground">
            Visualize e analise dados tributários em tempo real
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Diário</SelectItem>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensal</SelectItem>
              <SelectItem value="quarterly">Trimestral</SelectItem>
              <SelectItem value="yearly">Anual</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
      
      <Tabs value={selectedView} onValueChange={setSelectedView}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="fiscal">
            <BarChart className="mr-2 h-4 w-4" />
            Fiscal
          </TabsTrigger>
          <TabsTrigger value="credits">
            <PieChart className="mr-2 h-4 w-4" />
            Créditos
          </TabsTrigger>
          <TabsTrigger value="timeline">
            <LineChart className="mr-2 h-4 w-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="comparative">
            <BarChart className="mr-2 h-4 w-4" />
            Comparativo
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="fiscal" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total de Créditos</CardTitle>
                <CardDescription>Período atual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 2.958.492,00</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium">↑ 14%</span> em relação ao período anterior
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Retenções</CardTitle>
                <CardDescription>Período atual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 487.219,00</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500 font-medium">↓ 3%</span> em relação ao período anterior
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Recuperações</CardTitle>
                <CardDescription>Período atual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 1.254.876,00</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium">↑ 22%</span> em relação ao período anterior
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Economia Fiscal</CardTitle>
                <CardDescription>Período atual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 863.425,00</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium">↑ 8%</span> em relação ao período anterior
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Distribuição de Tributos</CardTitle>
                <CardDescription>Análise por tipo de tributo</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="aspect-square relative">
                  <PieChart className="absolute inset-0 m-auto h-48 w-48 text-muted-foreground/30" />
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl font-bold">65%</span>
                    <span className="text-sm text-muted-foreground">IRRF</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                    <div>
                      <div className="text-sm font-medium">IRRF</div>
                      <div className="text-xs text-muted-foreground">65%</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                    <div>
                      <div className="text-sm font-medium">PIS/COFINS</div>
                      <div className="text-xs text-muted-foreground">18%</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                    <div>
                      <div className="text-sm font-medium">CSLL</div>
                      <div className="text-xs text-muted-foreground">12%</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                    <div>
                      <div className="text-sm font-medium">Outros</div>
                      <div className="text-xs text-muted-foreground">5%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Evolução Mensal</CardTitle>
                <CardDescription>Volume de créditos por mês</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px] w-full flex items-end justify-between gap-2">
                  <div className="relative h-full flex-1 flex flex-col justify-end">
                    <div className="bg-primary/80 rounded-t w-full animate-in" style={{height: '45%'}}></div>
                    <span className="text-xs text-muted-foreground absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-[-24px]">Jan</span>
                  </div>
                  <div className="relative h-full flex-1 flex flex-col justify-end">
                    <div className="bg-primary/80 rounded-t w-full animate-in" style={{height: '65%'}}></div>
                    <span className="text-xs text-muted-foreground absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-[-24px]">Fev</span>
                  </div>
                  <div className="relative h-full flex-1 flex flex-col justify-end">
                    <div className="bg-primary/80 rounded-t w-full animate-in" style={{height: '40%'}}></div>
                    <span className="text-xs text-muted-foreground absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-[-24px]">Mar</span>
                  </div>
                  <div className="relative h-full flex-1 flex flex-col justify-end">
                    <div className="bg-primary/80 rounded-t w-full animate-in" style={{height: '70%'}}></div>
                    <span className="text-xs text-muted-foreground absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-[-24px]">Abr</span>
                  </div>
                  <div className="relative h-full flex-1 flex flex-col justify-end">
                    <div className="bg-primary/80 rounded-t w-full animate-in" style={{height: '55%'}}></div>
                    <span className="text-xs text-muted-foreground absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-[-24px]">Mai</span>
                  </div>
                  <div className="relative h-full flex-1 flex flex-col justify-end">
                    <div className="bg-primary/80 rounded-t w-full animate-in" style={{height: '80%'}}></div>
                    <span className="text-xs text-muted-foreground absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-[-24px]">Jun</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="credits" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Créditos</CardTitle>
              <CardDescription>Em desenvolvimento</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-medium mb-2">Análise detalhada de créditos</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Esta visualização está sendo desenvolvida e estará disponível em breve.
                </p>
                <Badge variant="outline" className="mt-4">Em desenvolvimento</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeline" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Timeline de Operações</CardTitle>
              <CardDescription>Em desenvolvimento</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <LineChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-medium mb-2">Timeline de operações fiscais</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Esta visualização está sendo desenvolvida e estará disponível em breve.
                </p>
                <Badge variant="outline" className="mt-4">Em desenvolvimento</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparative" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise Comparativa</CardTitle>
              <CardDescription>Em desenvolvimento</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <BarChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-medium mb-2">Análise comparativa de períodos</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Esta visualização está sendo desenvolvida e estará disponível em breve.
                </p>
                <Badge variant="outline" className="mt-4">Em desenvolvimento</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveDashboardPanel;
