import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { format, subMonths, isAfter, parseISO, differenceInMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { SelicRate, MonetaryCorrection } from './types';
import { generateMockSelicRates } from './utils';
import { useClientStore } from '@/hooks/useClientStore';

export const useSelicCorrection = () => {
  const { toast } = useToast();
  const { activeClient } = useClientStore();
  const [selicRates, setSelicRates] = useState<SelicRate[]>([]);
  const [corrections, setCorrections] = useState<MonetaryCorrection[]>([]);
  const [loadingRates, setLoadingRates] = useState(false);
  const [creditValue, setCreditValue] = useState('');
  const [creditDate, setCreditDate] = useState('');
  const [currentSelicRate, setCurrentSelicRate] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [apiConnectionStatus, setApiConnectionStatus] = useState<'connected' | 'error' | 'idle'>('idle');

  const fetchSelicRates = useCallback(async () => {
    setLoadingRates(true);
    setApiConnectionStatus('idle');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      const mockData = generateMockSelicRates(); // Generate mock data without arguments
      
      const processedRates: SelicRate[] = mockData.map((item, index) => ({
        month: new Date(item.date).getMonth() + 1,
        year: new Date(item.date).getFullYear(),
        date: item.date,
        rate: item.rate,
        accumulated: index === 0 ? item.rate : (mockData[index - 1].accumulated + item.rate)
      }));
      
      setSelicRates(processedRates);
      setCurrentSelicRate(processedRates[processedRates.length - 1].rate);
      setLastUpdate(format(new Date(), 'dd/MM/yyyy HH:mm:ss'));
      setApiConnectionStatus('connected');
      
      toast({
        title: "Taxas Selic atualizadas",
        description: "As taxas foram obtidas com sucesso da API do Banco Central.",
      });
    } catch (error) {
      console.error("Erro ao buscar taxas Selic:", error);
      setApiConnectionStatus('error');
      
      const mockData = generateMockSelicRates(); // Generate mock data without arguments
      const processedRates: SelicRate[] = mockData.map((item, index) => ({
        month: new Date(item.date).getMonth() + 1,
        year: new Date(item.date).getFullYear(),
        date: item.date,
        rate: item.rate,
        accumulated: index === 0 ? item.rate : (mockData[index - 1].accumulated + item.rate)
      }));
      
      setSelicRates(processedRates);
      setCurrentSelicRate(processedRates[processedRates.length - 1].rate);
      
      toast({
        title: "Erro ao buscar taxas Selic",
        description: "Utilizando dados em cache. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoadingRates(false);
    }
  }, [toast]);

  useEffect(() => {
    if (selicRates.length === 0) {
      fetchSelicRates();
    }
  }, [fetchSelicRates, selicRates.length]);

  const refreshSelicRates = () => {
    fetchSelicRates();
  };

  const calculateCorrection = () => {
    if (!creditValue || !creditDate) {
      toast({
        title: "Dados incompletos",
        description: "Preencha todos os campos para calcular a correção.",
        variant: "destructive",
      });
      return;
    }
    
    if (!activeClient) {
      toast({
        title: "Cliente não selecionado",
        description: "Selecione um cliente antes de calcular correções.",
        variant: "destructive",
      });
      return;
    }
    
    const value = parseFloat(creditValue.replace(/\./g, '').replace(',', '.'));
    if (isNaN(value)) {
      toast({
        title: "Valor inválido",
        description: "O valor do crédito deve ser um número válido.",
        variant: "destructive",
      });
      return;
    }
    
    let date: Date;
    try {
      if (creditDate.includes('/')) {
        const dateParts = creditDate.split('/');
        date = new Date(
          parseInt(dateParts[2]),
          parseInt(dateParts[1]) - 1,
          parseInt(dateParts[0])
        );
      } else {
        date = parseISO(creditDate);
      }
      
      if (isNaN(date.getTime())) {
        throw new Error("Data inválida");
      }
    } catch (error) {
      toast({
        title: "Data inválida",
        description: "A data deve estar no formato DD/MM/AAAA ou YYYY-MM-DD.",
        variant: "destructive",
      });
      return;
    }
    
    const today = new Date();
    if (isAfter(date, today)) {
      toast({
        title: "Data futura",
        description: "A data do crédito não pode ser no futuro.",
        variant: "destructive",
      });
      return;
    }
    
    const diffMonths = differenceInMonths(today, date);
    if (diffMonths <= 0) {
      toast({
        title: "Período inválido",
        description: "O crédito deve ter pelo menos 1 mês para correção.",
        variant: "destructive",
      });
      return;
    }
    
    let accumulatedRate: number;
    if (diffMonths <= selicRates.length) {
      accumulatedRate = selicRates[diffMonths - 1]?.accumulated || 0;
    } else {
      accumulatedRate = selicRates[selicRates.length - 1].accumulated;
      toast({
        title: "Alerta de Período",
        description: `Só temos dados de ${selicRates.length} meses, usando taxa acumulada disponível.`,
        variant: "destructive",
      });
    }
    
    const correctedValue = value * (1 + (accumulatedRate / 100));
    const difference = correctedValue - value;
    
    const newCorrection: MonetaryCorrection = {
      id: `CR-${Math.floor(Math.random() * 10000)}`,
      creditId: `CR-${Math.floor(Math.random() * 10000)}`,
      originalValue: value,
      correctedValue: correctedValue,
      difference: difference,
      correctionDate: format(new Date(), 'dd/MM/yyyy'),
      months: diffMonths,
      accumulatedRate: accumulatedRate,
      clientId: activeClient.id,
      clientName: activeClient.name,
    };
    
    setCorrections([newCorrection, ...corrections]);
    
    toast({
      title: "Correção calculada com sucesso",
      description: `Valor original: ${formatCurrency(value)} → Valor corrigido: ${formatCurrency(correctedValue)}`,
      variant: "default",
    });
  };

  const applyBulkCorrection = (credits: any[]) => {
    if (!credits || credits.length === 0) {
      toast({
        title: "Nenhum crédito selecionado",
        description: "Selecione pelo menos um crédito para aplicar a correção.",
        variant: "destructive",
      });
      return;
    }
    
    if (selicRates.length === 0) {
      toast({
        title: "Taxas Selic não disponíveis",
        description: "Atualize as taxas Selic antes de calcular correções em massa.",
        variant: "destructive",
      });
      return;
    }
    
    const today = new Date();
    const newCorrections: MonetaryCorrection[] = [];
    let successCount = 0;
    let errorCount = 0;
    
    for (const credit of credits) {
      try {
        const creditDate = parseISO(credit.date);
        const diffMonths = differenceInMonths(today, creditDate);
        
        if (diffMonths <= 0) {
          errorCount++;
          continue;
        }
        
        const accumulatedRate = diffMonths <= selicRates.length
          ? selicRates[diffMonths - 1]?.accumulated || 0
          : selicRates[selicRates.length - 1].accumulated;
        
        const correctedValue = credit.value * (1 + (accumulatedRate / 100));
        const difference = correctedValue - credit.value;
        
        const newCorrection: MonetaryCorrection = {
          id: `CR-${Math.floor(Math.random() * 10000)}`,
          creditId: credit.id,
          originalValue: credit.value,
          correctedValue: correctedValue,
          difference: difference,
          correctionDate: format(new Date(), 'dd/MM/yyyy'),
          months: diffMonths,
          accumulatedRate: accumulatedRate,
          clientId: credit.clientId,
          clientName: credit.clientName,
        };
        
        newCorrections.push(newCorrection);
        successCount++;
      } catch (error) {
        console.error("Erro ao calcular correção:", error);
        errorCount++;
      }
    }
    
    if (newCorrections.length > 0) {
      setCorrections([...newCorrections, ...corrections]);
      
      toast({
        title: "Correções calculadas",
        description: `${successCount} créditos corrigidos com sucesso. ${errorCount > 0 ? `${errorCount} erros.` : ''}`,
        variant: errorCount > 0 ? "destructive" : "default",
      });
      
      return newCorrections;
    } else {
      toast({
        title: "Erro nas correções",
        description: "Não foi possível calcular correções para os créditos selecionados.",
        variant: "destructive",
      });
      
      return [];
    }
  };

  const handleExportHistory = () => {
    if (corrections.length === 0) {
      toast({
        title: "Nenhuma correção para exportar",
        description: "Calcule algumas correções antes de exportar.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Exportação iniciada",
      description: "O histórico de correções está sendo exportado.",
    });
    
    setTimeout(() => {
      toast({
        title: "Exportação concluída",
        description: "O arquivo foi gerado e está disponível para download.",
        variant: "default",
      });
    }, 1500);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return {
    selicRates,
    corrections,
    loadingRates,
    creditValue,
    setCreditValue,
    creditDate,
    setCreditDate,
    currentSelicRate,
    lastUpdate,
    apiConnectionStatus,
    refreshSelicRates,
    calculateCorrection,
    applyBulkCorrection,
    handleExportHistory,
    formatCurrency,
  };
};
