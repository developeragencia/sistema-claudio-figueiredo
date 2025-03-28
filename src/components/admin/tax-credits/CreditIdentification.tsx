import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, Plus, FileUp, Eye, ArrowUpDown, 
  Calendar, CheckCircle, Lightbulb, Activity,
  Download, Filter, RefreshCw
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import OpportunitiesTabContent from './components/OpportunitiesTabContent';

const CreditIdentification = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("credits");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const creditOpportunities = [
    { 
      id: 'CRED-001', 
      client: 'Comércio Geral ABC', 
      type: 'PIS/COFINS', 
      status: 'identified', 
      potentialValue: 24750.50, 
      confidence: 87,
      date: '12/04/2023'
    },
    { 
      id: 'CRED-002', 
      client: 'Indústria XYZ Ltda.', 
      type: 'IRPJ', 
      status: 'analyzing', 
      potentialValue: 18200.75, 
      confidence: 65,
      date: '25/04/2023'
    },
    { 
      id: 'CRED-003', 
      client: 'Serviços Médicos Beta', 
      type: 'CSLL', 
      status: 'confirmed', 
      potentialValue: 9800.25, 
      confidence: 98,
      date: '03/05/2023'
    },
    { 
      id: 'CRED-004', 
      client: 'Consultoria Delta S.A.', 
      type: 'IRRF', 
      status: 'identified', 
      potentialValue: 12450.00, 
      confidence: 76,
      date: '18/04/2023'
    },
    { 
      id: 'CRED-005', 
      client: 'Transportes Ômega', 
      type: 'PIS/COFINS', 
      status: 'confirmed', 
      potentialValue: 31750.80, 
      confidence: 92,
      date: '08/05/2023'
    },
  ];

  const filteredOpportunities = creditOpportunities.filter(opportunity => 
    opportunity.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    opportunity.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opportunity.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalIdentified = creditOpportunities
    .filter(item => item.status === 'identified' || item.status === 'confirmed')
    .reduce((sum, item) => sum + item.potentialValue, 0);
  
  const totalConfirmed = creditOpportunities
    .filter(item => item.status === 'confirmed')
    .reduce((sum, item) => sum + item.potentialValue, 0);

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          
          toast({
            title: "Análise concluída",
            description: "A análise de créditos tributários foi concluída com sucesso.",
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleViewDetails = (creditId: string) => {
    const credit = creditOpportunities.find(c => c.id === creditId);
    if (credit) {
      toast({
        title: "Detalhes do crédito",
        description: `Visualizando detalhes do crédito ${creditId} - ${credit.client}`,
      });
    }
  };

  const handleDownload = (creditId: string) => {
    toast({
      title: "Download iniciado",
      description: `Os dados do crédito ${creditId} estão sendo preparados para download.`,
    });
  };

  const handleFilterClick = () => {
    toast({
      title: "Filtros",
      description: "Abrindo painel de filtros avançados.",
    });
  };

  const handleSortClick = () => {
    toast({
      title: "Ordenação",
      description: "Abrindo opções de ordenação de resultados.",
    });
  };

  const handleConfirmCredit = (creditId: string) => {
    toast({
      title: "Crédito confirmado",
      description: `O crédito ${creditId} foi confirmado e está pronto para recuperação.`,
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'identified':
        return (
          <Badge variant="outline" className="flex w-fit items-center gap-1 bg-amber-50 text-amber-700 border-amber-200">
            <Lightbulb className="h-3 w-3" />
            Identificado
          </Badge>
        );
      case 'analyzing':
        return (
          <Badge variant="outline" className="flex w-fit items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
            <Activity className="h-3 w-3" />
            Em Análise
          </Badge>
        );
      case 'confirmed':
        return (
          <Badge variant="outline" className="flex w-fit items-center gap-1 bg-emerald-50 text-emerald-700 border-emerald-200">
            <CheckCircle className="h-3 w-3" />
            Confirmado
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
          <h2 className="text-2xl font-bold tracking-tight">Identificação de Créditos</h2>
          <p className="text-muted-foreground">
            Identifique e analise oportunidades de créditos tributários para seus clientes.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => {
              toast({
                title: "Importar dados",
                description: "Iniciando processo de importação de dados fiscais.",
              });
            }}
          >
            <FileUp className="h-4 w-4" />
            Importar Dados
          </Button>
          <Button 
            className="flex items-center gap-2" 
            onClick={handleStartAnalysis} 
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Analisando...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Nova Análise
              </>
            )}
          </Button>
        </div>
      </div>

      {isAnalyzing && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Análise em Andamento</CardTitle>
            <CardDescription>
              Processando dados fiscais para identificar potenciais créditos tributários.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso da análise:</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Créditos Identificados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatCurrency(totalIdentified)}</div>
            <p className="text-xs text-muted-foreground">Valor total de créditos potenciais identificados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Créditos Confirmados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{formatCurrency(totalConfirmed)}</div>
            <p className="text-xs text-muted-foreground">Valor total de créditos confirmados após validação</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Confirmação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {totalIdentified > 0 ? Math.round((totalConfirmed / totalIdentified) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Percentual de créditos confirmados após identificação</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Busca e Filtros</CardTitle>
          <CardDescription>
            Localize oportunidades de crédito por ID, cliente ou tipo de tributo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por ID, cliente ou tipo de tributo..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="flex-1 sm:flex-initial"
                onClick={handleFilterClick}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 sm:flex-initial"
                onClick={handleSortClick}
              >
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Ordenar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="credits">Todos Créditos</TabsTrigger>
          <TabsTrigger value="identified">Identificados</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmados</TabsTrigger>
          <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
        </TabsList>
        
        <TabsContent value="credits" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Oportunidades de Crédito</CardTitle>
              <CardDescription>
                Lista de todas as oportunidades de crédito identificadas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 bg-muted p-3 text-sm font-medium">
                  <div>ID</div>
                  <div>Cliente</div>
                  <div>Tipo</div>
                  <div>Data</div>
                  <div>Valor Potencial</div>
                  <div>Status</div>
                  <div>Ações</div>
                </div>
                <div className="divide-y">
                  {filteredOpportunities.length > 0 ? (
                    filteredOpportunities.map((item) => (
                      <div key={item.id} className="grid grid-cols-7 p-3 text-sm">
                        <div>{item.id}</div>
                        <div className="truncate max-w-[150px]">{item.client}</div>
                        <div>{item.type}</div>
                        <div>{item.date}</div>
                        <div>{formatCurrency(item.potentialValue)}</div>
                        <div>{getStatusBadge(item.status)}</div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
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
        
        <TabsContent value="identified" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Créditos Identificados</CardTitle>
              <CardDescription>
                Oportunidades de crédito identificadas aguardando confirmação.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {creditOpportunities
                  .filter(item => item.status === 'identified')
                  .map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg border p-4">
                      <div>
                        <h3 className="font-medium">{item.client}</h3>
                        <p className="text-sm text-muted-foreground">{item.id} • {item.type}</p>
                        <div className="mt-2">{getStatusBadge(item.status)}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Identificado em: {item.date}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Confiança: {item.confidence}%</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <div className="text-lg font-bold text-primary">{formatCurrency(item.potentialValue)}</div>
                        <Button size="sm">Confirmar Crédito</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="confirmed" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Créditos Confirmados</CardTitle>
              <CardDescription>
                Créditos tributários confirmados prontos para recuperação.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted p-3 text-sm font-medium">
                  <div>Cliente</div>
                  <div>Tipo</div>
                  <div>Data de Confirmação</div>
                  <div>Valor Confirmado</div>
                  <div>Ações</div>
                </div>
                <div className="divide-y">
                  {creditOpportunities
                    .filter(item => item.status === 'confirmed')
                    .map((item) => (
                      <div key={item.id} className="grid grid-cols-5 p-3 text-sm">
                        <div className="truncate max-w-[200px]">{item.client}</div>
                        <div>{item.type}</div>
                        <div>{item.date}</div>
                        <div>{formatCurrency(item.potentialValue)}</div>
                        <div>
                          <Button variant="ghost" size="sm">
                            Iniciar Recuperação
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="opportunities" className="space-y-4 pt-4">
          <OpportunitiesTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreditIdentification;
