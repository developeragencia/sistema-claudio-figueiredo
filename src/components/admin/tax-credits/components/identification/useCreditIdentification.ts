import { useState, useCallback, useMemo } from 'react';
import { AnalysisFormData } from '../NewCreditAnalysisModal';
import { ClientWithPermissions } from '@/types/clientStore';
import { toast as sonnerToast } from 'sonner';

// Mock data that was previously in the component
const MOCK_CREDITS = [
  {
    id: 'CR-1001',
    supplier: 'Empresa de Tecnologia Ltda',
    cnpj: '12.345.678/0001-23',
    paymentDate: '2023-06-15',
    paymentAmount: 25000.00,
    taxableAmount: 20000.00,
    retentionRate: 1.5,
    retentionAmount: 300.00,
    correctionAmount: 28.50,
    totalCredit: 328.50,
    identificationDate: '2023-10-22',
    status: 'approved',
    category: 'technology',
    supplierType: 'service',
    applicableRule: 'IN RFB 1234/2012, Art. 27',
    retentionRequired: true
  },
  {
    id: 'CR-1002',
    supplier: 'Consultoria Financeira S/A',
    cnpj: '23.456.789/0001-34',
    paymentDate: '2023-07-10',
    paymentAmount: 35000.00,
    taxableAmount: 35000.00,
    retentionRate: 1.5,
    retentionAmount: 525.00,
    correctionAmount: 42.00,
    totalCredit: 567.00,
    identificationDate: '2023-10-22',
    status: 'pending',
    category: 'consulting',
    supplierType: 'service',
    applicableRule: 'IN RFB 1234/2012, Art. 35',
    retentionRequired: true
  },
  {
    id: 'CR-1003',
    supplier: 'Serviços Gráficos ME',
    cnpj: '34.567.890/0001-45',
    paymentDate: '2023-08-05',
    paymentAmount: 8500.00,
    taxableAmount: 8500.00,
    retentionRate: 1.5,
    retentionAmount: 127.50,
    correctionAmount: 8.50,
    totalCredit: 136.00,
    identificationDate: '2023-10-22',
    status: 'approved',
    category: 'printing',
    supplierType: 'service',
    applicableRule: 'IN RFB 1234/2012, Art. 27',
    retentionRequired: true
  },
  {
    id: 'CR-1004',
    supplier: 'Manutenção Predial Eireli',
    cnpj: '45.678.901/0001-56',
    paymentDate: '2023-08-18',
    paymentAmount: 12000.00,
    taxableAmount: 12000.00,
    retentionRate: 1.5,
    retentionAmount: 180.00,
    correctionAmount: 10.80,
    totalCredit: 190.80,
    identificationDate: '2023-10-22',
    status: 'rejected',
    category: 'maintenance',
    rejectionReason: 'Serviço isento de retenção conforme IN RFB 1234/2012',
    supplierType: 'service',
    applicableRule: 'IN RFB 1234/2012, Art. 40 (Exceção)',
    retentionRequired: false
  },
  {
    id: 'CR-1005',
    supplier: 'Sistemas de Segurança S/A',
    cnpj: '56.789.012/0001-67',
    paymentDate: '2023-09-01',
    paymentAmount: 18500.00,
    taxableAmount: 15000.00,
    retentionRate: 1.5,
    retentionAmount: 225.00,
    correctionAmount: 11.25,
    totalCredit: 236.25,
    identificationDate: '2023-10-22',
    status: 'pending',
    category: 'security',
    supplierType: 'service',
    applicableRule: 'IN RFB 1234/2012, Art. 32',
    retentionRequired: true
  }
];

interface UseCreditIdentificationProps {
  searchQuery: string;
  activeClient: ClientWithPermissions | null;
  setIsAnalyzing: (analyzing: boolean) => void;
  setAnalysisProgress: (progress: number) => void;
  setIsAnalysisModalOpen: (open: boolean) => void;
  setShowExportOptions: (show: boolean) => void;
  selectedPeriod: string;
  toast: typeof sonnerToast; 
}

export const useCreditIdentification = ({
  searchQuery,
  activeClient,
  setIsAnalyzing,
  setAnalysisProgress,
  setIsAnalysisModalOpen,
  setShowExportOptions,
  selectedPeriod,
  toast
}: UseCreditIdentificationProps) => {
  
  const [exportFormat, setExportFormat] = useState('excel');

  // Filter credits based on search query
  const filteredCredits = useMemo(() => {
    return MOCK_CREDITS.filter(credit => 
      credit.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      credit.cnpj.includes(searchQuery) ||
      credit.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Compute stats
  const totalIdentifiedCredits = useMemo(() => {
    return MOCK_CREDITS.reduce((sum, credit) => sum + credit.totalCredit, 0);
  }, []);
  
  const approvedCredits = useMemo(() => {
    return MOCK_CREDITS.filter(credit => credit.status === 'approved');
  }, []);
  
  const totalApprovedValue = useMemo(() => {
    return approvedCredits.reduce((sum, credit) => sum + credit.totalCredit, 0);
  }, [approvedCredits]);

  // Handler functions
  const handleStartAnalysis = useCallback(() => {
    if (!activeClient) {
      toast("Cliente não selecionado", {
        description: "Selecione um cliente ativo para iniciar a análise."
      });
      return;
    }
    
    setIsAnalysisModalOpen(true);
  }, [activeClient, setIsAnalysisModalOpen, toast]);

  const handleAnalysisSubmit = useCallback((data: AnalysisFormData) => {
    setIsAnalysisModalOpen(false);
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    toast("Análise iniciada", {
      description: `Analisando dados do cliente "${activeClient?.name}" no período selecionado.`
    });
    
    // Use a variable to track progress
    let progress = 0;
    const interval = setInterval(() => {
      progress = progress + Math.floor(Math.random() * 10) + 1;
      if (progress >= 100) {
        clearInterval(interval);
        setAnalysisProgress(100);
        setTimeout(() => {
          setIsAnalyzing(false);
          toast("Análise concluída", {
            description: "Foram identificados 5 possíveis créditos tributários."
          });
        }, 500);
      } else {
        setAnalysisProgress(progress);
      }
    }, 800);
  }, [activeClient, setIsAnalysisModalOpen, setIsAnalyzing, setAnalysisProgress, toast]);

  const handleQuickAnalysis = useCallback(() => {
    if (!activeClient) {
      toast("Cliente não selecionado", {
        description: "Selecione um cliente ativo para iniciar a análise."
      });
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    toast("Análise automática iniciada", {
      description: `Analisando pagamentos dos últimos ${selectedPeriod} meses para ${activeClient?.name}.`
    });
    
    // Use a variable to track progress
    let progress = 0;
    const interval = setInterval(() => {
      progress = progress + Math.floor(Math.random() * 10) + 1;
      if (progress >= 100) {
        clearInterval(interval);
        setAnalysisProgress(100);
        setTimeout(() => {
          setIsAnalyzing(false);
          toast("Análise automática concluída", {
            description: `Foram identificados 5 créditos tributários com base nas regras do Manual de Retenções IRPJ.`
          });
        }, 500);
      } else {
        setAnalysisProgress(progress);
      }
    }, 600);
  }, [activeClient, selectedPeriod, setIsAnalyzing, setAnalysisProgress, toast]);

  const handleExportCredits = useCallback(() => {
    toast("Exportando dados", {
      description: `O download dos dados será iniciado em breve em formato ${exportFormat.toUpperCase()}.`
    });
    setShowExportOptions(false);
  }, [setShowExportOptions, toast, exportFormat]);

  const handleApproveCredit = useCallback((creditId: string) => {
    toast("Crédito aprovado", {
      description: `O crédito ${creditId} foi aprovado e será incluído nos relatórios.`
    });
  }, [toast]);

  const handleRejectCredit = useCallback((creditId: string) => {
    toast("Crédito rejeitado", {
      description: `O crédito ${creditId} foi rejeitado e não será considerado para recuperação.`
    });
  }, [toast]);

  const handleSaveSettings = useCallback(() => {
    toast("Configurações salvas", {
      description: "As configurações de identificação de créditos foram atualizadas."
    });
  }, [toast]);

  return {
    MOCK_CREDITS,
    filteredCredits,
    handleStartAnalysis,
    handleAnalysisSubmit,
    handleQuickAnalysis,
    handleExportCredits,
    handleApproveCredit,
    handleRejectCredit,
    handleSaveSettings,
    totalIdentifiedCredits,
    approvedCredits,
    totalApprovedValue,
    exportFormat,
    setExportFormat
  };
};
