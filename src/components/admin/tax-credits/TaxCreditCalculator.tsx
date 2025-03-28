
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calculator, FileDown, Printer, RefreshCw, Save, History, Undo } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TaxCreditCalculator = () => {
  const { toast } = useToast();
  const [revenue, setRevenue] = useState("");
  const [taxRegime, setTaxRegime] = useState("simple_national");
  const [taxPeriod, setTaxPeriod] = useState("monthly");
  const [activity, setActivity] = useState("services");
  const [result, setResult] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState<Array<{
    id: string;
    date: string;
    revenue: string;
    taxRegime: string;
    result: number;
  }>>([
    {
      id: "calc-001",
      date: "12/06/2023",
      revenue: "150.000,00",
      taxRegime: "simple_national",
      result: 6750
    },
    {
      id: "calc-002",
      date: "10/06/2023",
      revenue: "275.000,00",
      taxRegime: "profit_presumed",
      result: 19800
    },
    {
      id: "calc-003",
      date: "05/06/2023",
      revenue: "520.000,00",
      taxRegime: "real_profit",
      result: 48360
    }
  ]);
  const [activeTab, setActiveTab] = useState("calculator");

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
      // Simple calculation for demonstration
      const revenueValue = parseFloat(revenue.replace(/\./g, '').replace(',', '.'));
      let calculatedValue = 0;
      
      // Different factors based on tax regime
      switch(taxRegime) {
        case "simple_national":
          calculatedValue = revenueValue * 0.045;
          break;
        case "profit_presumed":
          calculatedValue = revenueValue * 0.072;
          break;
        case "real_profit":
          calculatedValue = revenueValue * 0.093;
          break;
      }
      
      // Adjust based on activity type
      if (activity === "commerce") {
        calculatedValue *= 0.85;
      } else if (activity === "industry") {
        calculatedValue *= 1.2;
      }
      
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
  };

  const handleSaveCalculation = () => {
    if (result) {
      const newCalculation = {
        id: `calc-${Math.floor(Math.random() * 1000)}`,
        date: new Date().toLocaleDateString('pt-BR'),
        revenue,
        taxRegime,
        result
      };
      
      setCalculationHistory([newCalculation, ...calculationHistory]);
      
      toast({
        title: "Cálculo salvo",
        description: "O cálculo foi salvo com sucesso no histórico.",
      });
    }
  };

  const handleLoadCalculation = (calc: any) => {
    setRevenue(calc.revenue);
    setTaxRegime(calc.taxRegime);
    setResult(calc.result);
    
    setActiveTab("calculator");
    
    toast({
      title: "Cálculo carregado",
      description: "O cálculo foi carregado do histórico.",
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Calculadora de Créditos Tributários</h2>
          <p className="text-muted-foreground">
            Calcule potenciais créditos tributários com base em diversos parâmetros fiscais.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">Calculadora</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
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
                  disabled={result === null}
                  onClick={handleSaveCalculation}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Salvar
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" disabled={result === null}>
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimir
                  </Button>
                  <Button variant="outline" disabled={result === null}>
                    <FileDown className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
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
              {calculationHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <History className="h-12 w-12 text-muted-foreground opacity-20" />
                  <p className="mt-4 text-muted-foreground">
                    Nenhum cálculo salvo no histórico.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {calculationHistory.map((calc) => (
                    <div 
                      key={calc.id} 
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{formatCurrency(calc.result)}</p>
                        <p className="text-sm text-muted-foreground">
                          {getTaxRegimeLabel(calc.taxRegime)} - Receita: R$ {calc.revenue}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Calculado em {calc.date}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleLoadCalculation(calc)}
                      >
                        Carregar
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxCreditCalculator;
