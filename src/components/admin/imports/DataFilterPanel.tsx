
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Filter, RefreshCw, FileCheck, AlertTriangle, 
  ArrowRight, Settings, Save, FileX, FileSearch, 
  CheckCircle, ListFilter, Database
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DataFilterPanel = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("filter1");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedPrimaryFilter, setSelectedPrimaryFilter] = useState("cnae");
  const [selectedSecondaryFilter, setSelectedSecondaryFilter] = useState("retention_rules");
  
  // Filter settings
  const [filterSettings, setFilterSettings] = useState({
    applyTaxationRules: true,
    excludeExemptSuppliers: false,
    validateCnpj: true,
    minimumAmount: "100",
    retentionTypes: ["irrf", "pis", "cofins", "csll"],
    enableRollback: true,
    useHistoricalData: true,
    processAsync: true
  });
  
  // Mock filtered data statistics
  const [stats, setStats] = useState({
    totalRecords: 0,
    processedRecords: 0,
    validRecords: 0,
    invalidRecords: 0,
    duplicates: 0,
    exemptSuppliers: 0,
    retentionRequired: 0,
    potentialCredits: 0,
    averageValue: 0
  });
  
  const handleStartProcessing = () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    toast({
      title: activeTab === "filter1" ? "Processando Filtro Primário" : "Processando Filtro Secundário",
      description: "Iniciando processamento de dados. Isso pode levar alguns minutos.",
    });
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.floor(Math.random() * 5) + 1;
        const newValue = prev + increment;
        
        if (newValue >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            
            // Update mock statistics
            setStats({
              totalRecords: 1245,
              processedRecords: 1245,
              validRecords: 1187,
              invalidRecords: 58,
              duplicates: 32,
              exemptSuppliers: 87,
              retentionRequired: 1100,
              potentialCredits: 742,
              averageValue: 658.45
            });
            
            toast({
              title: "Processamento Concluído",
              description: activeTab === "filter1" 
                ? "Filtro primário concluído. Encontrados 1245 registros." 
                : "Filtro secundário concluído. Identificados 742 potenciais créditos.",
              variant: "default",
            });
          }, 500);
          return 100;
        }
        
        return newValue;
      });
    }, 200);
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Configurações Salvas",
      description: "As configurações de filtro foram salvas com sucesso.",
    });
  };
  
  const handleRollback = () => {
    toast({
      title: "Rollback Iniciado",
      description: "Desfazendo última importação. Isso pode levar alguns minutos.",
      variant: "destructive",
    });
    
    setTimeout(() => {
      toast({
        title: "Rollback Concluído",
        description: "A última importação foi desfeita com sucesso.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Filtros Progressivos de Dados</h2>
          <p className="text-muted-foreground">
            Refine e classifique dados importados para identificar créditos tributários.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle>Status do Processamento</CardTitle>
            <CardDescription>
              Acompanhe o status do processamento e filtragem dos dados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {isProcessing ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {activeTab === "filter1" ? "Processando Filtro Primário" : "Processando Filtro Secundário"}
                    </span>
                    <span className="text-sm text-muted-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {activeTab === "filter1" 
                      ? "Extraindo e refinando dados relevantes..." 
                      : "Classificando dados conforme regras de retenção..."}
                  </p>
                </div>
              ) : stats.totalRecords > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Total de Registros</span>
                    <p className="text-2xl font-bold">{stats.totalRecords.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Registros Válidos</span>
                    <p className="text-2xl font-bold text-green-600">{stats.validRecords.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Registros Inválidos</span>
                    <p className="text-2xl font-bold text-red-600">{stats.invalidRecords.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Duplicatas</span>
                    <p className="text-2xl font-bold text-amber-600">{stats.duplicates.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Fornecedores Isentos</span>
                    <p className="text-2xl font-bold">{stats.exemptSuppliers.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Créditos Potenciais</span>
                    <p className="text-2xl font-bold text-blue-600">{stats.potentialCredits.toLocaleString()}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <Filter className="h-12 w-12 mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-1">Nenhum Processamento Iniciado</h3>
                  <p className="text-sm max-w-md">
                    Selecione um filtro e clique em "Iniciar Processamento" para começar a análise dos dados.
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-2 justify-end">
                {!isProcessing && stats.totalRecords > 0 && (
                  <Button variant="outline" onClick={handleRollback} className="flex items-center gap-2">
                    <FileX className="h-4 w-4" />
                    Rollback
                  </Button>
                )}
                <Button 
                  onClick={handleStartProcessing} 
                  disabled={isProcessing}
                  className="flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <FileCheck className="h-4 w-4" />
                      Iniciar Processamento
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Estatísticas</CardTitle>
            <CardDescription>
              Resumo dos dados processados.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {stats.totalRecords > 0 ? (
              <>
                <div className="flex justify-between">
                  <span className="text-sm">Retenção Obrigatória:</span>
                  <Badge variant="outline" className="font-mono">{stats.retentionRequired}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Valor Médio:</span>
                  <Badge variant="outline" className="font-mono">R$ {stats.averageValue.toFixed(2)}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Taxa de Validação:</span>
                  <Badge variant="outline" className="font-mono">
                    {((stats.validRecords / stats.totalRecords) * 100).toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Créditos Potenciais:</span>
                  <Badge variant="outline" className="font-mono bg-blue-50 text-blue-700">
                    {stats.potentialCredits}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Duplicatas:</span>
                  <Badge variant="outline" className="font-mono bg-amber-50 text-amber-700">
                    {stats.duplicates}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Inválidos:</span>
                  <Badge variant="outline" className="font-mono bg-red-50 text-red-700">
                    {stats.invalidRecords}
                  </Badge>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                <Database className="h-10 w-10 mb-2 opacity-50" />
                <p className="text-sm">Sem dados processados</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="filter1">Filtro 1: Refinamento</TabsTrigger>
          <TabsTrigger value="filter2">Filtro 2: Classificação</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="filter1" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Filtro Primário - Refinamento de Dados</CardTitle>
              <CardDescription>
                Configure as regras para o primeiro nível de filtragem que extrairá dados relevantes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primary-filter">Filtro Principal</Label>
                <Select value={selectedPrimaryFilter} onValueChange={setSelectedPrimaryFilter}>
                  <SelectTrigger id="primary-filter">
                    <SelectValue placeholder="Selecione um filtro primário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cnae">CNAE do Fornecedor</SelectItem>
                    <SelectItem value="payment_type">Tipo de Pagamento</SelectItem>
                    <SelectItem value="date_range">Período</SelectItem>
                    <SelectItem value="amount_threshold">Valor Mínimo</SelectItem>
                    <SelectItem value="supplier_type">Tipo de Fornecedor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min-amount">Valor Mínimo (R$)</Label>
                  <Input id="min-amount" type="number" placeholder="100.00" value={filterSettings.minimumAmount} 
                    onChange={(e) => setFilterSettings({...filterSettings, minimumAmount: e.target.value})} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="validate-cnpj" className="flex items-center justify-between">
                    <span>Validar CNPJ</span>
                    <Switch id="validate-cnpj" checked={filterSettings.validateCnpj} 
                      onCheckedChange={(checked) => setFilterSettings({...filterSettings, validateCnpj: checked})} />
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Valida se o CNPJ do fornecedor está ativo na Receita Federal.
                  </p>
                </div>
              </div>
              
              <div className="pt-2">
                <Label className="flex items-center justify-between">
                  <span>Excluir Fornecedores Isentos</span>
                  <Switch checked={filterSettings.excludeExemptSuppliers} 
                    onCheckedChange={(checked) => setFilterSettings({...filterSettings, excludeExemptSuppliers: checked})} />
                </Label>
                <p className="text-xs text-muted-foreground">
                  Excluir automaticamente fornecedores que são isentos de retenção na fonte.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="filter2" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Filtro Secundário - Classificação</CardTitle>
              <CardDescription>
                Configure as regras para o segundo nível de filtragem que classificará os dados conforme regras de retenção.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="secondary-filter">Regra de Classificação</Label>
                <Select value={selectedSecondaryFilter} onValueChange={setSelectedSecondaryFilter}>
                  <SelectTrigger id="secondary-filter">
                    <SelectValue placeholder="Selecione uma regra de classificação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retention_rules">Regras do Manual de Retenções</SelectItem>
                    <SelectItem value="supplier_classification">Classificação de Fornecedores</SelectItem>
                    <SelectItem value="tax_code">Código de Tributação</SelectItem>
                    <SelectItem value="legal_basis">Fundamentação Legal</SelectItem>
                    <SelectItem value="custom_rules">Regras Personalizadas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Tipos de Retenção</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="irrf-filter" checked={filterSettings.retentionTypes.includes("irrf")} 
                      onCheckedChange={(checked) => {
                        const newRetentionTypes = checked 
                          ? [...filterSettings.retentionTypes, "irrf"]
                          : filterSettings.retentionTypes.filter(t => t !== "irrf");
                        setFilterSettings({...filterSettings, retentionTypes: newRetentionTypes});
                      }} />
                    <Label htmlFor="irrf-filter">IRRF</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="pis-filter" checked={filterSettings.retentionTypes.includes("pis")} 
                      onCheckedChange={(checked) => {
                        const newRetentionTypes = checked 
                          ? [...filterSettings.retentionTypes, "pis"]
                          : filterSettings.retentionTypes.filter(t => t !== "pis");
                        setFilterSettings({...filterSettings, retentionTypes: newRetentionTypes});
                      }} />
                    <Label htmlFor="pis-filter">PIS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="cofins-filter" checked={filterSettings.retentionTypes.includes("cofins")} 
                      onCheckedChange={(checked) => {
                        const newRetentionTypes = checked 
                          ? [...filterSettings.retentionTypes, "cofins"]
                          : filterSettings.retentionTypes.filter(t => t !== "cofins");
                        setFilterSettings({...filterSettings, retentionTypes: newRetentionTypes});
                      }} />
                    <Label htmlFor="cofins-filter">COFINS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="csll-filter" checked={filterSettings.retentionTypes.includes("csll")} 
                      onCheckedChange={(checked) => {
                        const newRetentionTypes = checked 
                          ? [...filterSettings.retentionTypes, "csll"]
                          : filterSettings.retentionTypes.filter(t => t !== "csll");
                        setFilterSettings({...filterSettings, retentionTypes: newRetentionTypes});
                      }} />
                    <Label htmlFor="csll-filter">CSLL</Label>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Label className="flex items-center justify-between">
                  <span>Aplicar Regras de Tributação</span>
                  <Switch checked={filterSettings.applyTaxationRules} 
                    onCheckedChange={(checked) => setFilterSettings({...filterSettings, applyTaxationRules: checked})} />
                </Label>
                <p className="text-xs text-muted-foreground">
                  Aplica automaticamente as regras de tributação conforme legislação vigente.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Avançadas</CardTitle>
              <CardDescription>
                Configure opções avançadas para o processamento de filtros.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="flex items-center justify-between">
                      <span>Habilitar Rollback</span>
                      <Switch checked={filterSettings.enableRollback} 
                        onCheckedChange={(checked) => setFilterSettings({...filterSettings, enableRollback: checked})} />
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Permite desfazer a última importação em caso de erros ou duplicidades.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center justify-between">
                      <span>Utilizar Dados Históricos</span>
                      <Switch checked={filterSettings.useHistoricalData} 
                        onCheckedChange={(checked) => setFilterSettings({...filterSettings, useHistoricalData: checked})} />
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Considera dados de importações anteriores para melhorar a classificação.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="flex items-center justify-between">
                      <span>Processamento Assíncrono</span>
                      <Switch checked={filterSettings.processAsync} 
                        onCheckedChange={(checked) => setFilterSettings({...filterSettings, processAsync: checked})} />
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Cria uma fila de processamento em segundo plano para grandes volumes de dados.
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-3 bg-amber-50">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-amber-800">Atenção</h4>
                        <p className="text-xs text-amber-700 mt-1">
                          Habilitar o rollback pode aumentar o uso de recursos do sistema, mas permite 
                          recuperação em caso de falhas no processamento.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Restaurar Padrões</Button>
                <Button onClick={handleSaveSettings} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataFilterPanel;
