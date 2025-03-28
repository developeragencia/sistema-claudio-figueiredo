
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  RefreshCw,
  Calendar,
  BarChart3,
  Download,
  ExternalLink,
  Clock,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  Calculator
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Mock data for Selic rates
const generateMockSelicRates = () => {
  const rates = [];
  let date = new Date();
  let accumulatedRate = 0;
  
  for (let i = 0; i < 24; i++) {
    date = subMonths(date, 1);
    const monthRate = (Math.random() * 0.3 + 0.8).toFixed(2);
    accumulatedRate += parseFloat(monthRate);
    
    rates.unshift({
      month: format(date, 'MMM/yy', { locale: ptBR }),
      rate: parseFloat(monthRate),
      accumulatedRate: accumulatedRate.toFixed(2),
      date: format(date, 'yyyy-MM-dd')
    });
  }
  
  return rates;
};

const SelicIntegrationPanel = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("rates");
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [selicRates, setSelicRates] = useState<any[]>([]);
  const [creditValue, setCreditValue] = useState("");
  const [creditDate, setCreditDate] = useState("");
  const [correctionHistory, setCorrectionHistory] = useState<any[]>([]);
  
  useEffect(() => {
    // Load mock Selic rates on component mount
    const mockRates = generateMockSelicRates();
    setSelicRates(mockRates);
    setLastUpdate(format(new Date(), 'dd/MM/yyyy HH:mm'));
  }, []);

  const handleRefreshRates = () => {
    setIsLoading(true);
    
    toast({
      title: "Sincronizando com o Banco Central",
      description: "Obtendo as taxas Selic mais recentes...",
    });
    
    // Simulate API call
    setTimeout(() => {
      const mockRates = generateMockSelicRates();
      setSelicRates(mockRates);
      setLastUpdate(format(new Date(), 'dd/MM/yyyy HH:mm'));
      setIsLoading(false);
      
      toast({
        title: "Taxas Selic Atualizadas",
        description: "As taxas foram atualizadas com sucesso.",
      });
    }, 2000);
  };
  
  const handleCalculateCorrection = () => {
    if (!creditValue || !creditDate) {
      toast({
        title: "Dados Incompletos",
        description: "Preencha o valor e a data do crédito para calcular a correção.",
        variant: "destructive",
      });
      return;
    }
    
    // Parse input values
    let value: number;
    let date: Date;
    
    try {
      value = parseFloat(creditValue.replace(/\./g, '').replace(',', '.'));
      
      if (isNaN(value)) {
        throw new Error("Valor inválido");
      }
    } catch (error) {
      toast({
        title: "Valor Inválido",
        description: "O valor do crédito deve ser um número válido.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Try to parse date in format DD/MM/YYYY
      if (creditDate.includes('/')) {
        const [day, month, year] = creditDate.split('/');
        date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      } else {
        // Or try ISO format
        date = new Date(creditDate);
      }
      
      if (isNaN(date.getTime())) {
        throw new Error("Data inválida");
      }
    } catch (error) {
      toast({
        title: "Data Inválida",
        description: "A data deve estar no formato DD/MM/AAAA.",
        variant: "destructive",
      });
      return;
    }
    
    // Get months difference and calculate correction
    const today = new Date();
    const monthsDiff = Math.floor((today.getTime() - date.getTime()) / (30 * 24 * 60 * 60 * 1000));
    
    if (monthsDiff <= 0) {
      toast({
        title: "Data Inválida",
        description: "A data do crédito deve ser anterior à data atual.",
        variant: "destructive",
      });
      return;
    }
    
    // Calculate accumulated Selic rate for the period
    let accumulatedRate = 0;
    if (monthsDiff <= selicRates.length) {
      accumulatedRate = parseFloat(selicRates[monthsDiff - 1]?.accumulatedRate || "0");
    } else {
      accumulatedRate = parseFloat(selicRates[selicRates.length - 1].accumulatedRate);
      toast({
        title: "Período Excede Dados Disponíveis",
        description: `Usando taxa acumulada de ${selicRates.length} meses.`,
        variant: "default",
      });
    }
    
    // Calculate correction
    const correctionFactor = 1 + (accumulatedRate / 100);
    const correctedValue = value * correctionFactor;
    const correction = correctedValue - value;
    
    // Add to history
    const newCorrection = {
      id: `CORR-${Date.now()}`,
      originalValue: value,
      correctedValue: correctedValue,
      difference: correction,
      date: format(date, 'dd/MM/yyyy'),
      calculatedAt: format(new Date(), 'dd/MM/yyyy HH:mm'),
      months: monthsDiff,
      rate: accumulatedRate,
    };
    
    setCorrectionHistory([newCorrection, ...correctionHistory]);
    
    toast({
      title: "Correção Calculada",
      description: `Valor original: R$ ${value.toFixed(2)} → Valor corrigido: R$ ${correctedValue.toFixed(2)}`,
    });
  };
  
  const handleExportRates = () => {
    toast({
      title: "Exportando Taxas Selic",
      description: "Gerando arquivo Excel com as taxas Selic...",
    });
    
    setTimeout(() => {
      toast({
        title: "Exportação Concluída",
        description: "As taxas Selic foram exportadas com sucesso.",
      });
    }, 1500);
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Correção Monetária pela Selic</h2>
          <p className="text-muted-foreground">
            Atualize e calcule correções monetárias com base na taxa Selic.
          </p>
        </div>
        
        <Button
          onClick={handleRefreshRates}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Atualizando...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              Atualizar Taxas
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Taxa Selic Atual</CardTitle>
                <CardDescription>
                  Taxa Selic mensal e acumulada nos últimos 24 meses.
                </CardDescription>
              </div>
              {lastUpdate && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Atualizado: {lastUpdate}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selicRates.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={selicRates.slice(-12)} // Show last 12 months
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      name="Taxa Mensal (%)"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="accumulatedRate"
                      name="Taxa Acumulada (%)"
                      stroke="#82ca9d"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <p className="text-muted-foreground">Carregando taxas Selic...</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              {selicRates.length > 0 && (
                <div className="text-sm">
                  <span className="font-medium">Taxa atual: </span>
                  <span className="text-blue-600 font-bold">{selicRates[selicRates.length - 1].rate}%</span>
                </div>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={handleExportRates} className="flex items-center gap-1">
              <FileSpreadsheet className="h-4 w-4" />
              Exportar
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Calculadora de Correção</CardTitle>
            <CardDescription>
              Calcule a correção monetária de um valor com base na taxa Selic.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="credit-value">Valor do Crédito (R$)</Label>
                <Input
                  id="credit-value"
                  placeholder="0,00"
                  value={creditValue}
                  onChange={(e) => setCreditValue(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="credit-date">Data do Crédito</Label>
                <div className="relative">
                  <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="credit-date"
                    placeholder="DD/MM/AAAA"
                    className="pl-9"
                    value={creditDate}
                    onChange={(e) => setCreditDate(e.target.value)}
                  />
                </div>
              </div>
              
              <Button
                className="w-full mt-2 flex items-center justify-center gap-2"
                onClick={handleCalculateCorrection}
              >
                <Calculator className="h-4 w-4" />
                Calcular Correção
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full space-y-2">
              <h4 className="text-sm font-medium">Últimos Cálculos:</h4>
              {correctionHistory.length > 0 ? (
                <div className="space-y-2">
                  {correctionHistory.slice(0, 3).map((correction) => (
                    <div
                      key={correction.id}
                      className="text-xs bg-muted rounded-md p-2 flex flex-col"
                    >
                      <div className="flex justify-between">
                        <span>Original:</span>
                        <span className="font-mono">{formatCurrency(correction.originalValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Corrigido:</span>
                        <span className="font-mono font-bold">{formatCurrency(correction.correctedValue)}</span>
                      </div>
                      <div className="flex justify-between text-emerald-600">
                        <span>Diferença:</span>
                        <span className="font-mono">+{formatCurrency(correction.difference)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground mt-1">
                        <span>{correction.date} ({correction.months} meses)</span>
                        <span>{correction.rate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Nenhum cálculo realizado. Preencha os campos acima para calcular.
                </p>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rates">Tabela de Taxas</TabsTrigger>
          <TabsTrigger value="history">Histórico de Correções</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rates" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Taxas Selic dos Últimos 24 Meses</CardTitle>
              <CardDescription>
                Histórico de taxas Selic mensais e acumuladas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 bg-muted p-3 text-sm font-medium">
                  <div>Mês/Ano</div>
                  <div>Taxa Mensal (%)</div>
                  <div>Taxa Acumulada (%)</div>
                  <div>Data de Referência</div>
                </div>
                <div className="divide-y">
                  {selicRates.length > 0 ? (
                    selicRates.map((rate, index) => (
                      <div key={index} className="grid grid-cols-4 p-3 text-sm">
                        <div>{rate.month}</div>
                        <div>{rate.rate}%</div>
                        <div className="font-medium">{rate.accumulatedRate}%</div>
                        <div>{format(new Date(rate.date), 'dd/MM/yyyy')}</div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      <RefreshCw className="h-8 w-8 mx-auto mb-2 animate-spin" />
                      Carregando taxas Selic...
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Histórico de Correções</CardTitle>
                <CardDescription>
                  Histórico dos cálculos de correção realizados.
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" disabled={correctionHistory.length === 0} className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </CardHeader>
            <CardContent>
              {correctionHistory.length > 0 ? (
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 bg-muted p-3 text-sm font-medium">
                    <div>Data Crédito</div>
                    <div>Valor Original</div>
                    <div>Valor Corrigido</div>
                    <div>Diferença</div>
                    <div>Taxa (%)</div>
                    <div>Período</div>
                    <div>Calculado em</div>
                  </div>
                  <div className="divide-y">
                    {correctionHistory.map((correction) => (
                      <div key={correction.id} className="grid grid-cols-7 p-3 text-sm">
                        <div>{correction.date}</div>
                        <div>{formatCurrency(correction.originalValue)}</div>
                        <div className="font-medium">{formatCurrency(correction.correctedValue)}</div>
                        <div className="text-emerald-600">+{formatCurrency(correction.difference)}</div>
                        <div>{correction.rate}%</div>
                        <div>{correction.months} meses</div>
                        <div>{correction.calculatedAt}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <BarChart3 className="h-12 w-12 mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-medium mb-1">Nenhuma Correção Calculada</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Use a calculadora de correção para calcular e registrar correções monetárias.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Integração</CardTitle>
              <CardDescription>
                Configure as opções de integração com a API do Banco Central.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-endpoint">Endpoint da API do Banco Central</Label>
                <Input id="api-endpoint" value="https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados?formato=json" readOnly />
                <p className="text-xs text-muted-foreground">
                  Endpoint oficial da API do Banco Central para obtenção das taxas Selic.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="update-frequency">Frequência de Atualização</Label>
                <select
                  id="update-frequency"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="daily">Diária</option>
                  <option value="weekly" selected>Semanal</option>
                  <option value="monthly">Mensal</option>
                  <option value="manual">Manual</option>
                </select>
                <p className="text-xs text-muted-foreground">
                  Define com qual frequência o sistema deve atualizar automaticamente as taxas Selic.
                </p>
              </div>
              
              <div className="flex items-center p-3 rounded-lg border bg-blue-50">
                <div className="flex items-start gap-3">
                  <ExternalLink className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">API do Banco Central</h4>
                    <p className="text-xs text-blue-700 mt-1">
                      A integração utiliza a API oficial do Banco Central do Brasil para obter as taxas Selic mais recentes.
                      As taxas são atualizadas mensalmente pelo Banco Central.
                    </p>
                    <Button variant="link" className="h-auto p-0 text-blue-700 mt-1 text-xs">
                      Documentação da API
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Restaurar Padrões</Button>
                <Button onClick={() => {
                  toast({
                    title: "Configurações Salvas",
                    description: "As configurações de integração foram salvas com sucesso.",
                  });
                }}>Salvar Configurações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SelicIntegrationPanel;
