
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Calculator, 
  FileDown, 
  Printer, 
  RefreshCw, 
  Save, 
  History, 
  Undo, 
  FileBarChart, 
  CalendarIcon, 
  Filter, 
  DownloadCloud, 
  Percent, 
  CreditCard, 
  Landmark,
  Calculator as CalcIcon,
  BarChart4,
  ArrowRight,
  FileText,
  PlusCircle,
  Check,
  DollarSign,
  Clock,
  Flag,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AdvancedTaxCreditCalculator = () => {
  const { toast } = useToast();
  const [revenue, setRevenue] = useState("");
  const [taxRegime, setTaxRegime] = useState("simple_national");
  const [taxPeriod, setTaxPeriod] = useState("monthly");
  const [activity, setActivity] = useState("services");
  const [result, setResult] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [includeSelic, setIncludeSelic] = useState(true);
  const [selicRate, setSelicRate] = useState(8.25);
  const [activeTab, setActiveTab] = useState("calculator");
  const [comparisonMode, setComparisonMode] = useState(false);
  const [savingResult, setSavingResult] = useState(false);
  const [advancedSettings, setAdvancedSettings] = useState({
    applyTaxExemptions: true,
    considerOverlappingCredits: true,
    useHistoricalRates: true,
    applySpecialRegimes: false,
    includeContentionAnalysis: true
  });
  
  const [creditSources, setCreditSources] = useState([
    { id: 1, name: "Retenção na Fonte - Serviços (IRRF)", value: true },
    { id: 2, name: "PIS/COFINS sobre insumos", value: true },
    { id: 3, name: "ICMS sobre aquisições", value: false },
    { id: 4, name: "IPI em processos produtivos", value: false },
    { id: 5, name: "Créditos presumidos", value: true }
  ]);
  
  const [savedCalculations, setSavedCalculations] = useState([
    {
      id: "calc-001",
      date: "12/06/2023",
      revenue: "150.000,00",
      taxRegime: "simple_national",
      result: 6750,
      status: "approved",
      period: "Jan/2023",
      sources: "IRRF, PIS/COFINS",
      selicApplied: true
    },
    {
      id: "calc-002",
      date: "10/06/2023",
      revenue: "275.000,00",
      taxRegime: "profit_presumed",
      result: 19800,
      status: "pending",
      period: "Fev/2023",
      sources: "IRRF, Créditos presumidos",
      selicApplied: true
    },
    {
      id: "calc-003",
      date: "05/06/2023",
      revenue: "520.000,00",
      taxRegime: "real_profit",
      result: 48360,
      status: "approved",
      period: "Mar/2023",
      sources: "IRRF, PIS/COFINS, Créditos presumidos",
      selicApplied: false
    }
  ]);
  
  const [creditBreakdown, setCreditBreakdown] = useState([
    { type: "IRRF", value: 0, percentage: 0 },
    { type: "PIS/COFINS", value: 0, percentage: 0 },
    { type: "Créditos Presumidos", value: 0, percentage: 0 }
  ]);

  const handleCalculate = () => {
    // Basic validation
    if (!revenue || isNaN(parseFloat(revenue.replace(/\./g, '').replace(',', '.')))) {
      toast({
        title: "Valor inválido",
        description: "Por favor, insira um valor de receita válido.",
        variant: "destructive",
      });
      return;
    }

    // Start calculation animation
    setCalculating(true);
    setResult(null);

    // Simulate calculation time
    setTimeout(() => {
      // Parse revenue value
      const revenueValue = parseFloat(revenue.replace(/\./g, '').replace(',', '.'));
      
      // Base calculation factors
      let calculatedValue = 0;
      let irrf = 0;
      let pisCofins = 0;
      let presumedCredits = 0;
      
      // Different factors based on tax regime
      switch(taxRegime) {
        case "simple_national":
          calculatedValue = revenueValue * 0.045;
          irrf = revenueValue * 0.02;
          pisCofins = revenueValue * 0.015;
          presumedCredits = revenueValue * 0.01;
          break;
        case "profit_presumed":
          calculatedValue = revenueValue * 0.072;
          irrf = revenueValue * 0.035;
          pisCofins = revenueValue * 0.025;
          presumedCredits = revenueValue * 0.012;
          break;
        case "real_profit":
          calculatedValue = revenueValue * 0.093;
          irrf = revenueValue * 0.045;
          pisCofins = revenueValue * 0.033;
          presumedCredits = revenueValue * 0.015;
          break;
      }
      
      // Adjust based on activity type
      if (activity === "commerce") {
        calculatedValue *= 0.85;
        irrf *= 0.85;
        pisCofins *= 0.85;
        presumedCredits *= 0.85;
      } else if (activity === "industry") {
        calculatedValue *= 1.2;
        irrf *= 1.2;
        pisCofins *= 1.2;
        presumedCredits *= 1.2;
      }
      
      // Apply SELIC correction if enabled
      if (includeSelic) {
        const correctionFactor = 1 + (selicRate / 100);
        calculatedValue *= correctionFactor;
        irrf *= correctionFactor;
        pisCofins *= correctionFactor;
        presumedCredits *= correctionFactor;
      }
      
      // Apply advanced settings modifiers
      if (advancedSettings.applyTaxExemptions) {
        calculatedValue *= 1.05;
      }
      
      if (advancedSettings.considerOverlappingCredits) {
        calculatedValue *= 0.95; // Avoid double counting
      }
      
      if (advancedSettings.useHistoricalRates) {
        calculatedValue *= 1.08; // Historical trends show 8% more credits identified
      }
      
      if (advancedSettings.applySpecialRegimes) {
        calculatedValue *= 1.15; // Special regimes offer additional 15% benefits
      }
      
      // Filter out unchecked credit sources
      if (!creditSources[0].value) irrf = 0;
      if (!creditSources[1].value) pisCofins = 0;
      if (!creditSources[4].value) presumedCredits = 0;
      
      // Recalculate total
      calculatedValue = irrf + pisCofins + presumedCredits;
      
      // Update credit breakdown
      setCreditBreakdown([
        { type: "IRRF", value: irrf, percentage: (irrf / calculatedValue) * 100 },
        { type: "PIS/COFINS", value: pisCofins, percentage: (pisCofins / calculatedValue) * 100 },
        { type: "Créditos Presumidos", value: presumedCredits, percentage: (presumedCredits / calculatedValue) * 100 }
      ]);
      
      // Finalize calculation
      setResult(calculatedValue);
      setCalculating(false);
      
      toast({
        title: "Cálculo concluído",
        description: "O cálculo de crédito tributário foi finalizado com sucesso.",
      });
    }, 1500);
  };

  const handleReset = () => {
    setRevenue("");
    setTaxRegime("simple_national");
    setTaxPeriod("monthly");
    setActivity("services");
    setResult(null);
    setIncludeSelic(true);
    setComparisonMode(false);
    setCreditSources(creditSources.map(source => ({ ...source, value: source.id <= 2 || source.id === 5 })));
    setAdvancedSettings({
      applyTaxExemptions: true,
      considerOverlappingCredits: true,
      useHistoricalRates: true,
      applySpecialRegimes: false,
      includeContentionAnalysis: true
    });
  };

  const handleSaveCalculation = () => {
    if (result) {
      setSavingResult(true);
      
      setTimeout(() => {
        const newCalculation = {
          id: `calc-${Math.floor(Math.random() * 1000)}`,
          date: new Date().toLocaleDateString('pt-BR'),
          revenue,
          taxRegime,
          result,
          status: "pending",
          period: format(selectedDate || new Date(), "MMM/yyyy", { locale: ptBR }),
          sources: creditSources.filter(s => s.value).map(s => s.name.split(' - ')[0]).join(', '),
          selicApplied: includeSelic
        };
        
        setSavedCalculations([newCalculation, ...savedCalculations]);
        setSavingResult(false);
        
        toast({
          title: "Cálculo salvo",
          description: "O cálculo foi salvo com sucesso no histórico.",
        });
      }, 1000);
    }
  };

  const handleLoadCalculation = (calc: any) => {
    setRevenue(calc.revenue);
    setTaxRegime(calc.taxRegime);
    setResult(calc.result);
    setIncludeSelic(calc.selicApplied);
    
    setActiveTab("calculator");
    
    toast({
      title: "Cálculo carregado",
      description: "O cálculo foi carregado do histórico.",
    });
  };

  const handleExport = (format: string) => {
    toast({
      title: `Exportando para ${format.toUpperCase()}`,
      description: `Seu arquivo será baixado em breve.`,
    });
  };

  const handleCompare = () => {
    setComparisonMode(!comparisonMode);
    
    if (!comparisonMode) {
      toast({
        title: "Modo de comparação ativado",
        description: "Você pode comparar diferentes cenários de tributação.",
      });
    }
  };

  const handleApproveCalculation = (id: string) => {
    setSavedCalculations(savedCalculations.map(calc => 
      calc.id === id ? { ...calc, status: "approved" } : calc
    ));
    
    toast({
      title: "Cálculo aprovado",
      description: "O cálculo foi aprovado e está pronto para utilização.",
      variant: "default",
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const getTaxRegimeLabel = (regime: string) => {
    switch(regime) {
      case "simple_national": return "Simples Nacional";
      case "profit_presumed": return "Lucro Presumido";
      case "real_profit": return "Lucro Real";
      default: return regime;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "approved": 
        return <Badge variant="success" className="flex items-center gap-1"><Check className="h-3 w-3" /> Aprovado</Badge>;
      case "pending": 
        return <Badge variant="warning" className="flex items-center gap-1"><Clock className="h-3 w-3" /> Pendente</Badge>;
      case "rejected": 
        return <Badge variant="destructive" className="flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Rejeitado</Badge>;
      default: 
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Calculadora Avançada de Créditos Tributários</h2>
          <p className="text-muted-foreground">
            Calcule potenciais créditos tributários com base em diversos parâmetros fiscais.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCompare}>
            <BarChart4 className="mr-2 h-4 w-4" />
            {comparisonMode ? "Desativar Comparação" : "Comparar Cenários"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">
            <CalcIcon className="mr-2 h-4 w-4" />
            Calculadora
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="mr-2 h-4 w-4" />
            Histórico
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Filter className="mr-2 h-4 w-4" />
            Configurações Avançadas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Parâmetros de Cálculo</CardTitle>
                <CardDescription>
                  Insira os dados necessários para calcular os créditos tributários potenciais.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="revenue">Receita Bruta</Label>
                  <Input
                    id="revenue"
                    type="text"
                    placeholder="R$ 0,00"
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tax-regime">Regime Tributário</Label>
                  <Select value={taxRegime} onValueChange={setTaxRegime}>
                    <SelectTrigger id="tax-regime">
                      <SelectValue placeholder="Selecione o regime tributário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple_national">Simples Nacional</SelectItem>
                      <SelectItem value="profit_presumed">Lucro Presumido</SelectItem>
                      <SelectItem value="real_profit">Lucro Real</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tax-period">Período de Apuração</Label>
                  <Select value={taxPeriod} onValueChange={setTaxPeriod}>
                    <SelectTrigger id="tax-period">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Mensal</SelectItem>
                      <SelectItem value="quarterly">Trimestral</SelectItem>
                      <SelectItem value="yearly">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="activity">Tipo de Atividade</Label>
                  <Select value={activity} onValueChange={setActivity}>
                    <SelectTrigger id="activity">
                      <SelectValue placeholder="Selecione a atividade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="services">Serviços</SelectItem>
                      <SelectItem value="commerce">Comércio</SelectItem>
                      <SelectItem value="industry">Indústria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date-select">Data de Referência</Label>
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                        id="date-select"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setIsCalendarOpen(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="selic-correction"
                    checked={includeSelic}
                    onCheckedChange={setIncludeSelic}
                  />
                  <Label htmlFor="selic-correction">Incluir correção pela SELIC ({selicRate}%)</Label>
                </div>
                
                <div className="space-y-2">
                  <Label className="flex justify-between">
                    Taxa SELIC (%)
                    <span className="text-sm text-muted-foreground">{selicRate}%</span>
                  </Label>
                  <Slider
                    value={[selicRate]}
                    min={0}
                    max={15}
                    step={0.25}
                    onValueChange={(value) => setSelicRate(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Fontes de Crédito</Label>
                  <div className="space-y-2 mt-2">
                    {creditSources.map((source) => (
                      <div key={source.id} className="flex items-center space-x-2">
                        <Switch
                          id={`credit-source-${source.id}`}
                          checked={source.value}
                          onCheckedChange={(checked) => {
                            setCreditSources(
                              creditSources.map((s) =>
                                s.id === source.id ? { ...s, value: checked } : s
                              )
                            );
                          }}
                        />
                        <Label htmlFor={`credit-source-${source.id}`}>{source.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleReset}>
                  <Undo className="mr-2 h-4 w-4" />
                  Limpar
                </Button>
                <Button onClick={handleCalculate} disabled={calculating}>
                  {calculating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Calculando...
                    </>
                  ) : (
                    <>
                      <Calculator className="mr-2 h-4 w-4" />
                      Calcular
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resultado</CardTitle>
                <CardDescription>
                  Detalhamento dos créditos tributários calculados.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {result === null ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Calculator className="h-12 w-12 text-muted-foreground opacity-20" />
                    <p className="mt-4 text-muted-foreground">
                      Preencha os parâmetros e clique em "Calcular" para ver o resultado.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="rounded-lg bg-primary/5 p-4">
                      <p className="text-sm font-medium">Crédito Tributário Potencial</p>
                      <p className="mt-1 text-3xl font-bold">{formatCurrency(result)}</p>
                      {includeSelic && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Inclui correção SELIC de {selicRate}%
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Distribuição de Créditos</h4>
                      {creditBreakdown.map((item, index) => (
                        item.value > 0 && (
                          <div key={index} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{item.type}</span>
                              <span className="font-medium">{formatCurrency(item.value)}</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                              <div 
                                className={`h-full ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : 'bg-amber-500'}`}
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground text-right">
                              {item.percentage.toFixed(1)}% do total
                            </p>
                          </div>
                        )
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between border-b pb-2">
                        <p className="text-sm">Regime Tributário</p>
                        <p className="text-sm font-medium">
                          {taxRegime === "simple_national" && "Simples Nacional"}
                          {taxRegime === "profit_presumed" && "Lucro Presumido"}
                          {taxRegime === "real_profit" && "Lucro Real"}
                        </p>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <p className="text-sm">Período de Apuração</p>
                        <p className="text-sm font-medium">
                          {taxPeriod === "monthly" && "Mensal"}
                          {taxPeriod === "quarterly" && "Trimestral"}
                          {taxPeriod === "yearly" && "Anual"}
                        </p>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <p className="text-sm">Tipo de Atividade</p>
                        <p className="text-sm font-medium">
                          {activity === "services" && "Serviços"}
                          {activity === "commerce" && "Comércio"}
                          {activity === "industry" && "Indústria"}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm">Taxa Efetiva</p>
                        <p className="text-sm font-medium">
                          {result && revenue ? ((result / parseFloat(revenue.replace(/\./g, '').replace(',', '.'))) * 100).toFixed(2) + '%' : '0%'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                <Button 
                  variant="outline" 
                  disabled={result === null || savingResult}
                  onClick={handleSaveCalculation}
                >
                  {savingResult ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar
                    </>
                  )}
                </Button>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    disabled={result === null}
                    onClick={() => handleExport('pdf')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    disabled={result === null}
                    onClick={() => handleExport('excel')}
                  >
                    <FileDown className="mr-2 h-4 w-4" />
                    Excel
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          {comparisonMode && (
            <Card className="border-dashed border-2 border-muted">
              <CardHeader>
                <CardTitle>Análise Comparativa</CardTitle>
                <CardDescription>
                  Compare diferentes cenários de tributação e avalie o potencial de economia.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50 flex flex-col items-center justify-center text-center">
                    <Badge variant="outline" className="mb-2">Simples Nacional</Badge>
                    <DollarSign className="h-8 w-8 text-blue-500 mb-2" />
                    <p className="text-xl font-bold">{formatCurrency(parseFloat(revenue || "0") * 0.045)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Taxa efetiva: 4,5%</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50 flex flex-col items-center justify-center text-center">
                    <Badge variant="outline" className="mb-2">Lucro Presumido</Badge>
                    <DollarSign className="h-8 w-8 text-green-500 mb-2" />
                    <p className="text-xl font-bold">{formatCurrency(parseFloat(revenue || "0") * 0.072)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Taxa efetiva: 7,2%</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50 flex flex-col items-center justify-center text-center">
                    <Badge variant="outline" className="mb-2">Lucro Real</Badge>
                    <DollarSign className="h-8 w-8 text-amber-500 mb-2" />
                    <p className="text-xl font-bold">{formatCurrency(parseFloat(revenue || "0") * 0.093)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Taxa efetiva: 9,3%</p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-100">
                  <h4 className="text-sm font-medium flex items-center text-green-800">
                    <Flag className="h-4 w-4 mr-2 text-green-600" />
                    Recomendação Automática
                  </h4>
                  <p className="text-sm mt-1 text-green-700">
                    Com base nos parâmetros informados, o regime <strong>{taxRegime === "simple_national" ? "Simples Nacional" : taxRegime === "profit_presumed" ? "Lucro Presumido" : "Lucro Real"}</strong> é o mais vantajoso para seu caso.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Cálculos</CardTitle>
              <CardDescription>
                Visualize e recupere cálculos realizados anteriormente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {savedCalculations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <History className="h-12 w-12 text-muted-foreground opacity-20" />
                  <p className="mt-4 text-muted-foreground">
                    Nenhum cálculo salvo no histórico.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedCalculations.map((calc) => (
                    <div 
                      key={calc.id} 
                      className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 last:border-0 last:pb-0 gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{formatCurrency(calc.result)}</p>
                          {getStatusBadge(calc.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {getTaxRegimeLabel(calc.taxRegime)} - Receita: R$ {calc.revenue}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <span>Período: {calc.period}</span>
                          <span>•</span>
                          <span>Fontes: {calc.sources}</span>
                          <span>•</span>
                          <span>SELIC: {calc.selicApplied ? "Sim" : "Não"}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Calculado em {calc.date}
                        </p>
                      </div>
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        {calc.status === "pending" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleApproveCalculation(calc.id)}
                          >
                            <Check className="mr-2 h-3 w-3" />
                            Aprovar
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleLoadCalculation(calc)}
                        >
                          Carregar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleExport('pdf')}
                        >
                          <FileText className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleExport('excel')}
                        >
                          <FileDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setActiveTab("calculator")}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo Cálculo
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Avançadas</CardTitle>
              <CardDescription>
                Personalize os parâmetros de cálculo para cenários específicos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="apply-tax-exemptions"
                    checked={advancedSettings.applyTaxExemptions}
                    onCheckedChange={(checked) => setAdvancedSettings({...advancedSettings, applyTaxExemptions: checked})}
                  />
                  <div>
                    <Label htmlFor="apply-tax-exemptions">Aplicar isenções fiscais</Label>
                    <p className="text-sm text-muted-foreground">
                      Considera isenções fiscais previstas na legislação vigente
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="consider-overlapping"
                    checked={advancedSettings.considerOverlappingCredits}
                    onCheckedChange={(checked) => setAdvancedSettings({...advancedSettings, considerOverlappingCredits: checked})}
                  />
                  <div>
                    <Label htmlFor="consider-overlapping">Considerar sobreposição de créditos</Label>
                    <p className="text-sm text-muted-foreground">
                      Evita a contagem duplicada de créditos que se sobrepõem
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="use-historical"
                    checked={advancedSettings.useHistoricalRates}
                    onCheckedChange={(checked) => setAdvancedSettings({...advancedSettings, useHistoricalRates: checked})}
                  />
                  <div>
                    <Label htmlFor="use-historical">Utilizar taxas históricas</Label>
                    <p className="text-sm text-muted-foreground">
                      Aplica taxas baseadas em dados históricos para maior precisão
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="apply-special"
                    checked={advancedSettings.applySpecialRegimes}
                    onCheckedChange={(checked) => setAdvancedSettings({...advancedSettings, applySpecialRegimes: checked})}
                  />
                  <div>
                    <Label htmlFor="apply-special">Aplicar regimes especiais</Label>
                    <p className="text-sm text-muted-foreground">
                      Utiliza regimes especiais de tributação quando aplicáveis
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="contention-analysis"
                    checked={advancedSettings.includeContentionAnalysis}
                    onCheckedChange={(checked) => setAdvancedSettings({...advancedSettings, includeContentionAnalysis: checked})}
                  />
                  <div>
                    <Label htmlFor="contention-analysis">Análise de contencioso</Label>
                    <p className="text-sm text-muted-foreground">
                      Inclui análise de riscos de contencioso tributário
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg bg-amber-50 p-4 border border-amber-100">
                <h4 className="text-sm font-medium flex items-center text-amber-800">
                  <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                  Nota Importante
                </h4>
                <p className="text-sm mt-1 text-amber-700">
                  Estas configurações avançadas podem alterar significativamente os resultados do cálculo. Recomendamos consultar um especialista tributário antes de tomar decisões baseadas nestes cálculos.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setActiveTab("calculator")}>
                <ArrowRight className="mr-2 h-4 w-4" />
                Ir para Calculadora
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedTaxCreditCalculator;
