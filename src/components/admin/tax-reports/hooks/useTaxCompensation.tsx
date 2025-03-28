
import { useState } from 'react';
import { toast } from 'sonner';
import { format } from 'date-fns';

export const useTaxCompensation = () => {
  const [creditValue, setCreditValue] = useState<string>('0');
  const [simulationDate, setSimulationDate] = useState<Date | undefined>(new Date());
  const [includeSelicCorrection, setIncludeSelicCorrection] = useState<boolean>(true);
  const [reportType, setReportType] = useState<string>('per_dcomp');
  const [activeTab, setActiveTab] = useState<string>('simulation');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [simulationHistory, setSimulationHistory] = useState<any[]>([
    {
      id: '1',
      date: '15/03/2023',
      originalValue: 'R$ 50.000,00',
      correctedValue: 'R$ 54.125,00',
      selicRate: '8,25%',
      type: 'PER/DCOMP'
    },
    {
      id: '2',
      date: '10/02/2023',
      originalValue: 'R$ 75.000,00',
      correctedValue: 'R$ 80.887,50',
      selicRate: '7,85%',
      type: 'Decisão Judicial'
    }
  ]);

  const handleGenerate = () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    
    toast("Gerando relatório", {
      description: "O relatório está sendo gerado. Aguarde um momento...",
    });
    
    setTimeout(() => {
      setIsGenerating(false);
      
      // Add to simulation history if on simulation tab
      if (activeTab === 'simulation') {
        const value = parseFloat(creditValue.replace(/\./g, '').replace(',', '.'));
        const selicRate = includeSelicCorrection ? 8.25 : 0;
        const correctedValue = value * (1 + selicRate / 100);
        
        const newSimulation = {
          id: (simulationHistory.length + 1).toString(),
          date: format(new Date(), 'dd/MM/yyyy'),
          originalValue: `R$ ${value.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}`,
          correctedValue: `R$ ${correctedValue.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}`,
          selicRate: `${selicRate.toFixed(2).replace('.', ',')}%`,
          type: reportType === 'per_dcomp' ? 'PER/DCOMP' : 
                reportType === 'judicial' ? 'Decisão Judicial' : 
                'Processo Administrativo'
        };
        
        setSimulationHistory([newSimulation, ...simulationHistory]);
      }
      
      toast("Relatório gerado", {
        description: "O relatório foi gerado com sucesso e está disponível para download.",
      });
    }, 2000);
  };

  const handleExport = (format: string) => {
    toast("Exportando relatório", {
      description: `Exportando relatório no formato ${format.toUpperCase()}.`,
    });
  };

  const handleSimulateSelic = () => {
    const value = parseFloat(creditValue.replace(/\./g, '').replace(',', '.'));
    
    if (isNaN(value) || value <= 0) {
      toast("Valor inválido", {
        description: "Por favor, insira um valor válido para simulação.",
      });
      return;
    }
    
    toast("Simulação realizada", {
      description: `Valor corrigido pela SELIC: R$ ${(value * 1.0825).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })} (taxa de 8,25% aplicada)`,
    });
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const number = parseInt(numericValue, 10) / 100;
    return number.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreditValue(formatCurrency(e.target.value));
  };

  return {
    creditValue,
    setCreditValue,
    simulationDate,
    setSimulationDate,
    includeSelicCorrection,
    setIncludeSelicCorrection,
    reportType,
    setReportType,
    activeTab, 
    setActiveTab,
    isGenerating,
    isCalendarOpen,
    setIsCalendarOpen,
    simulationHistory,
    handleGenerate,
    handleExport,
    handleSimulateSelic,
    handleValueChange,
    formatCurrency
  };
};
