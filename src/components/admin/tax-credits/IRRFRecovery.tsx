
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Search, FileUp, Download, ArrowRight, CheckCircle, 
  XCircle, AlertTriangle, Filter, RefreshCw, ArrowUpDown 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const IRRFRecovery = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);

  // Simulated recovery process data
  const recoveryData = [
    { id: 'REC-0001', client: 'Empresa ABC Ltda.', status: 'completed', amount: 12500.75, date: '15/03/2023', progress: 100 },
    { id: 'REC-0002', client: 'Comércio XYZ S.A.', status: 'in_progress', amount: 8750.25, date: '22/04/2023', progress: 65 },
    { id: 'REC-0003', client: 'Indústria de Alimentos Beta', status: 'pending', amount: 15600.00, date: '05/05/2023', progress: 0 },
    { id: 'REC-0004', client: 'Transportadora Rápida Ltda.', status: 'completed', amount: 9300.45, date: '12/02/2023', progress: 100 },
    { id: 'REC-0005', client: 'Consultoria Financeira Alpha', status: 'in_progress', amount: 18700.30, date: '30/04/2023', progress: 40 },
    { id: 'REC-0006', client: 'Distribuidora de Produtos Gama', status: 'rejected', amount: 7200.00, date: '18/03/2023', progress: 0 },
  ];

  const filteredData = recoveryData.filter(item => 
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Summary data
  const totalRecovered = recoveryData
    .filter(item => item.status === 'completed')
    .reduce((sum, item) => sum + item.amount, 0);
  
  const totalInProgress = recoveryData
    .filter(item => item.status === 'in_progress')
    .reduce((sum, item) => sum + item.amount, 0);
  
  const handleImportData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Importação concluída",
        description: "Os dados foram importados com sucesso.",
      });
    }, 2000);
  };

  const handleExportData = () => {
    toast({
      title: "Exportação iniciada",
      description: "Os dados estão sendo exportados para download.",
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return (
          <Badge variant="success" className="flex w-fit items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Concluído
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge variant="default" className="flex w-fit items-center gap-1">
            <RefreshCw className="h-3 w-3" />
            Em Progresso
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="flex w-fit items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Pendente
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive" className="flex w-fit items-center gap-1">
            <XCircle className="h-3 w-3" />
            Rejeitado
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Recuperação de IRRF/PJ</h2>
          <p className="text-muted-foreground">
            Gerenciamento e acompanhamento de processos de recuperação de IRRF para Pessoas Jurídicas.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleImportData} disabled={isLoading}>
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Importando...
              </>
            ) : (
              <>
                <FileUp className="h-4 w-4" />
                Importar Dados
              </>
            )}
          </Button>
          <Button className="flex items-center gap-2" onClick={handleExportData}>
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Recuperado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{formatCurrency(totalRecovered)}</div>
            <p className="text-xs text-muted-foreground">Valor total recuperado até o momento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Em Processamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{formatCurrency(totalInProgress)}</div>
            <p className="text-xs text-muted-foreground">Valor em processo de recuperação</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {recoveryData.filter(item => item.status === 'completed').length / recoveryData.length * 100}%
            </div>
            <p className="text-xs text-muted-foreground">Processos concluídos com sucesso</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Busca e Filtros</CardTitle>
          <CardDescription>
            Localize processos de recuperação por ID ou cliente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por ID ou cliente..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="processing">Em Processamento</TabsTrigger>
          <TabsTrigger value="completed">Concluídos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Processos de Recuperação</CardTitle>
              <CardDescription>
                Lista de todos os processos de recuperação de IRRF/PJ.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-muted p-3 text-sm font-medium">
                  <div>ID</div>
                  <div>Cliente</div>
                  <div>Data</div>
                  <div>Valor</div>
                  <div>Status</div>
                  <div>Ações</div>
                </div>
                <div className="divide-y">
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <div key={item.id} className="grid grid-cols-6 p-3 text-sm">
                        <div>{item.id}</div>
                        <div className="truncate max-w-[200px]">{item.client}</div>
                        <div>{item.date}</div>
                        <div>{formatCurrency(item.amount)}</div>
                        <div>{getStatusBadge(item.status)}</div>
                        <div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      Nenhum resultado encontrado.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="processing">
          <Card>
            <CardHeader>
              <CardTitle>Processos em Andamento</CardTitle>
              <CardDescription>
                Processos de recuperação que estão em andamento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recoveryData
                  .filter(item => item.status === 'in_progress')
                  .map((item) => (
                    <div key={item.id} className="rounded-lg border p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-medium">{item.client}</h3>
                          <p className="text-sm text-muted-foreground">{item.id} • Iniciado em {item.date}</p>
                        </div>
                        <div>{formatCurrency(item.amount)}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progresso:</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Processos Concluídos</CardTitle>
              <CardDescription>
                Processos de recuperação de IRRF/PJ concluídos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 bg-muted p-3 text-sm font-medium">
                  <div>Cliente</div>
                  <div>Data de Conclusão</div>
                  <div>Valor Recuperado</div>
                  <div>Detalhes</div>
                </div>
                <div className="divide-y">
                  {recoveryData
                    .filter(item => item.status === 'completed')
                    .map((item) => (
                      <div key={item.id} className="grid grid-cols-4 p-3 text-sm">
                        <div className="truncate max-w-[200px]">{item.client}</div>
                        <div>{item.date}</div>
                        <div>{formatCurrency(item.amount)}</div>
                        <div>
                          <Button variant="ghost" size="sm">
                            Ver detalhes
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IRRFRecovery;
