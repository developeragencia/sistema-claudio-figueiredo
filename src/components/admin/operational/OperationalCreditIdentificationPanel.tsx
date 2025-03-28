
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Lightbulb, TrendingUp, AlertCircle, Search, ArrowRight, Clock, FileCheck,
  Filter, Download, CheckCircle, Building, BarChart2, Calendar, RefreshCw, Settings
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useClientStore } from "@/hooks/useClientStore";

// Mock data for the operational panel
const MOCK_CREDITS = [
  {
    id: 'CR-001',
    supplier: 'Empresa de Software Ltda',
    cnpj: '12.345.678/0001-90',
    paymentDate: '2023-05-15',
    paymentAmount: 32000.00,
    taxableAmount: 28000.00,
    retentionRate: 1.5,
    retentionAmount: 420.00,
    correctionAmount: 35.80,
    totalCredit: 455.80,
    identificationDate: '2023-09-30',
    status: 'approved',
    category: 'technology'
  },
  {
    id: 'CR-002',
    supplier: 'Consultoria Tributária S/A',
    cnpj: '23.456.789/0001-12',
    paymentDate: '2023-06-10',
    paymentAmount: 45000.00,
    taxableAmount: 45000.00,
    retentionRate: 1.5,
    retentionAmount: 675.00,
    correctionAmount: 52.20,
    totalCredit: 727.20,
    identificationDate: '2023-09-30',
    status: 'pending',
    category: 'consulting'
  },
  {
    id: 'CR-003',
    supplier: 'Serviços Contábeis ME',
    cnpj: '34.567.890/0001-23',
    paymentDate: '2023-07-05',
    paymentAmount: 9500.00,
    taxableAmount: 9500.00,
    retentionRate: 1.5,
    retentionAmount: 142.50,
    correctionAmount: 9.80,
    totalCredit: 152.30,
    identificationDate: '2023-09-30',
    status: 'approved',
    category: 'accounting'
  }
];

const OperationalCreditIdentificationPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('opportunities');
  const [identifiedCredits, setIdentifiedCredits] = useState<typeof MOCK_CREDITS>([]);
  const [settings, setSettings] = useState({
    monthsToAnalyze: 60,
    includeCorrectionSelic: true,
    minimumCreditValue: 100,
    automaticallyApprove: false
  });

  const { activeClient } = useClientStore();
  const { toast } = useToast();

  // Effect to simulate initial load
  useEffect(() => {
    // Simulate initial data load
    setTimeout(() => {
      setIdentifiedCredits(MOCK_CREDITS);
    }, 1000);
  }, []);

  // Filter credits based on search query
  const filteredCredits = identifiedCredits.filter(credit => 
    credit.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
    credit.cnpj.includes(searchQuery) ||
    credit.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartAnalysis = () => {
    if (!activeClient) {
      toast({
        title: "Cliente não selecionado",
        description: "Selecione um cliente ativo para iniciar a análise.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setIdentifiedCredits(MOCK_CREDITS);
            toast({
              title: "Análise concluída",
              description: `Foram identificados ${MOCK_CREDITS.length} possíveis créditos tributários.`
            });
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 400);
  };

  const handleApproveCredit = (creditId: string) => {
    setIdentifiedCredits(prev => 
      prev.map(credit => 
        credit.id === creditId 
          ? { ...credit, status: 'approved' as const } 
          : credit
      )
    );
    toast({
      title: "Crédito aprovado",
      description: `O crédito ${creditId} foi aprovado e será incluído nos relatórios.`
    });
  };

  const handleRejectCredit = (creditId: string) => {
    setIdentifiedCredits(prev => 
      prev.map(credit => 
        credit.id === creditId 
          ? { ...credit, status: 'rejected' as const } 
          : credit
      )
    );
    toast({
      title: "Crédito rejeitado",
      description: `O crédito ${creditId} foi rejeitado e não será considerado para recuperação.`,
      variant: "destructive"
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações de identificação de créditos foram atualizadas."
    });
    setShowSettings(false);
  };

  const totalIdentifiedCredits = identifiedCredits.reduce((sum, credit) => sum + credit.totalCredit, 0);
  const approvedCredits = identifiedCredits.filter(credit => credit.status === 'approved');
  const totalApprovedValue = approvedCredits.reduce((sum, credit) => sum + credit.totalCredit, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Identificação Operacional de Créditos</h2>
          <p className="text-muted-foreground">
            Identificação automatizada de oportunidades de créditos operacionais.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4" />
            Configurações
          </Button>
          <Button 
            className="flex items-center gap-2"
            onClick={handleStartAnalysis}
            disabled={isAnalyzing}
          >
            <Search className="h-4 w-4" />
            {isAnalyzing ? "Analisando..." : "Nova Busca"}
          </Button>
        </div>
      </div>

      {showSettings && (
        <Card>
          <CardHeader>
            <CardTitle>Configurações de Análise</CardTitle>
            <CardDescription>
              Ajuste os parâmetros para identificação de créditos tributários.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="monthsToAnalyze" className="text-sm font-medium">
                  Período de análise (meses)
                </label>
                <Input 
                  id="monthsToAnalyze" 
                  type="number" 
                  value={settings.monthsToAnalyze}
                  onChange={(e) => setSettings({
                    ...settings, 
                    monthsToAnalyze: parseInt(e.target.value)
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  Limite de 60 meses conforme legislação.
                </p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="minimumCreditValue" className="text-sm font-medium">
                  Valor mínimo do crédito (R$)
                </label>
                <Input 
                  id="minimumCreditValue" 
                  type="number" 
                  value={settings.minimumCreditValue}
                  onChange={(e) => setSettings({
                    ...settings, 
                    minimumCreditValue: parseInt(e.target.value)
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  Ignorar créditos abaixo deste valor.
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="includeCorrectionSelic" 
                  className="h-4 w-4"
                  checked={settings.includeCorrectionSelic}
                  onChange={(e) => setSettings({
                    ...settings, 
                    includeCorrectionSelic: e.target.checked
                  })}
                />
                <label htmlFor="includeCorrectionSelic" className="text-sm font-medium">
                  Aplicar correção pela taxa Selic
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="automaticallyApprove" 
                  className="h-4 w-4"
                  checked={settings.automaticallyApprove}
                  onChange={(e) => setSettings({
                    ...settings, 
                    automaticallyApprove: e.target.checked
                  })}
                />
                <label htmlFor="automaticallyApprove" className="text-sm font-medium">
                  Aprovar créditos automaticamente
                </label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowSettings(false)}>Cancelar</Button>
            <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
          </CardFooter>
        </Card>
      )}

      {isAnalyzing && (
        <Card>
          <CardHeader>
            <CardTitle>Análise em Andamento</CardTitle>
            <CardDescription>
              {analysisProgress < 100 
                ? "Analisando pagamentos e identificando possíveis créditos tributários..." 
                : "Análise concluída. Revisando os resultados..."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso</span>
                <span>{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
              
              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Pagamentos analisados</span>
                  <span>{Math.floor((analysisProgress / 100) * 843)} / 843</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Fornecedores processados</span>
                  <span>{Math.floor((analysisProgress / 100) * 142)} / 142</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Possíveis créditos identificados</span>
                  <span>{Math.floor((analysisProgress / 100) * MOCK_CREDITS.length)}</span>
                </div>
              </div>
            </div>
          </CardContent>
          {analysisProgress < 100 && (
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setIsAnalyzing(false)}>
                Cancelar Análise
              </Button>
            </CardFooter>
          )}
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-100 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <span>Oportunidades Identificadas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{identifiedCredits.length}</div>
            <p className="text-sm text-muted-foreground">Nos últimos 30 dias</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border-green-100 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              <span>Valor Potencial</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {new Intl.NumberFormat('pt-BR', { 
                style: 'currency', 
                currency: 'BRL',
                maximumFractionDigits: 0 
              }).format(totalIdentifiedCredits)}
            </div>
            <p className="text-sm text-muted-foreground">Estimativa de recuperação</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 border-amber-100 dark:border-amber-800">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <span>Taxa de Conversão</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {identifiedCredits.length > 0 
                ? `${Math.round((approvedCredits.length / identifiedCredits.length) * 100)}%` 
                : "0%"}
            </div>
            <p className="text-sm text-muted-foreground">Oportunidades confirmadas</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
          <TabsTrigger value="analysis">Análise</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
        </TabsList>
        
        <TabsContent value="opportunities" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Oportunidades Recentes</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="search" 
                      placeholder="Buscar..." 
                      className="pl-9 w-[200px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>
                Lista de oportunidades de créditos identificadas recentemente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCredits.length > 0 ? (
                  filteredCredits.map((credit) => (
                    <div key={credit.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3 md:mb-0">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Lightbulb className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{credit.supplier}</p>
                            <Badge variant={credit.status === 'approved' ? "outline" : "default"}>
                              {credit.status === 'approved' ? "Aprovado" : "Pendente"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <span>{credit.cnpj}</span>
                            <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                            <Calendar className="h-3 w-3" />
                            <span>Pagamento: {credit.paymentDate}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Crédito Identificado: 
                            <span className="font-medium ml-1">
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(credit.totalCredit)}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {credit.status === 'pending' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 text-red-500 hover:text-red-600"
                              onClick={() => handleRejectCredit(credit.id)}
                            >
                              Rejeitar
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 text-green-500 hover:text-green-600"
                              onClick={() => handleApproveCredit(credit.id)}
                            >
                              Aprovar
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm">Analisar</Button>
                        <Button size="sm">
                          Processar
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">Nenhuma oportunidade encontrada</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Inicie uma nova busca para identificar potenciais créditos.
                    </p>
                    <Button className="mt-4" onClick={handleStartAnalysis}>
                      <Search className="mr-2 h-4 w-4" />
                      Iniciar Nova Busca
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
            {filteredCredits.length > 0 && (
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Mostrando {filteredCredits.length} de {identifiedCredits.length} oportunidades
                </div>
                <Button variant="outline">Ver Todas</Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Identificação</CardTitle>
              <CardDescription>
                Status e progresso das análises em andamento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Cliente A - Análise ICMS</span>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Cliente B - Análise IRPJ</span>
                    <span className="text-sm text-muted-foreground">62%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Cliente C - Análise PIS/COFINS</span>
                    <span className="text-sm text-muted-foreground">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Cliente D - Análise CSLL</span>
                    <span className="text-sm text-muted-foreground">38%</span>
                  </div>
                  <Progress value={38} className="h-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Ver Relatório Detalhado
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Tendências de Identificação</CardTitle>
                  <CardDescription>
                    Análise histórica e previsão de oportunidades.
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg border border-dashed">
                <div className="text-center">
                  <BarChart2 className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium">Tendências e Projeções</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-2">
                    Visualize dados históricos e projeções futuras de oportunidades de créditos operacionais.
                  </p>
                  <Button className="mt-4">Carregar Dados</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Atualizar
              </Button>
              <Button>
                <FileCheck className="mr-2 h-4 w-4" />
                Gerar Relatório
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OperationalCreditIdentificationPanel;
