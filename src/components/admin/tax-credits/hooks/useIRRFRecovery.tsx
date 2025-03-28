
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useActiveClient } from '@/hooks/useActiveClient';

export const useIRRFRecovery = () => {
  const { toast } = useToast();
  const { activeClient } = useActiveClient();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('2023');
  const [statusFilter, setStatusFilter] = useState('all');

  // Summary cards data
  const summaryData = [
    {
      title: "Processos Ativos",
      value: "12",
      icon: <span className="h-5 w-5 text-blue-600" />,
      badge: { label: "+2 novos", color: "bg-blue-100 text-blue-800" }
    },
    {
      title: "Total Recuperado",
      value: "R$ 523.450,75",
      icon: <span className="h-5 w-5 text-green-600" />,
      badge: { label: "+12% mês", color: "bg-green-100 text-green-800" }
    },
    {
      title: "Em Processamento",
      value: "R$ 825.320,12",
      icon: <span className="h-5 w-5 text-amber-600" />,
      badge: { label: "8 processos", color: "bg-amber-100 text-amber-800" }
    },
    {
      title: "Alertas",
      value: "3",
      icon: <span className="h-5 w-5 text-red-600" />,
      badge: { label: "Requer atenção", color: "bg-red-100 text-red-800" }
    }
  ];

  // Handle new recovery process
  const handleNewRecovery = () => {
    if (!activeClient) {
      toast({
        title: "Cliente não selecionado",
        description: "Por favor, selecione um cliente ativo antes de iniciar um novo processo.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Novo processo de recuperação IRRF/PJ",
      description: `Iniciando novo processo para ${activeClient.name}`,
    });
  };

  // Handle import data
  const handleImportData = () => {
    if (!activeClient) {
      toast({
        title: "Cliente não selecionado",
        description: "Por favor, selecione um cliente ativo antes de importar dados.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Importar dados IRRF/PJ",
      description: `Preparando importação para ${activeClient.name}`,
    });
  };

  // Handle run calculation
  const handleRunCalculation = () => {
    if (!activeClient) {
      toast({
        title: "Cliente não selecionado",
        description: "Por favor, selecione um cliente ativo antes de executar cálculos.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Executar cálculos IRRF/PJ",
      description: `Iniciando cálculos para ${activeClient.name}`,
    });
  };

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    yearFilter,
    setYearFilter,
    statusFilter,
    setStatusFilter,
    summaryData,
    handleNewRecovery,
    handleImportData,
    handleRunCalculation,
    activeClient
  };
};
