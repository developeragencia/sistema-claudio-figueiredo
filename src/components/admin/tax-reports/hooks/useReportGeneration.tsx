
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Mock report data
const mockReports = [
  {
    id: '1',
    title: 'Relatório Fiscal - 1° Trimestre 2023',
    generatedAt: '15/03/2023',
    status: 'completed' as const,
    size: '2.4 MB',
    type: 'Completo'
  },
  {
    id: '2',
    title: 'Relatório de Retenções IRRF - Fevereiro 2023',
    generatedAt: '05/03/2023',
    status: 'completed' as const,
    size: '1.7 MB',
    type: 'Resumido'
  },
  {
    id: '3',
    title: 'Análise Comparativa PIS/COFINS',
    generatedAt: '28/02/2023',
    status: 'processing' as const,
    size: 'N/A',
    type: 'Análise'
  }
];

export function useReportGeneration() {
  const { toast } = useToast();
  const [reportPeriod, setReportPeriod] = useState('last-month');
  const [reportType, setReportType] = useState('complete');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('fiscal');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [reports, setReports] = useState(mockReports);

  const handleGenerateReport = () => {
    if (isGenerating) return; // Prevent multiple clicks
    
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      const newReport = {
        id: Date.now().toString(),
        title: `Relatório ${reportType === 'complete' ? 'Completo' : 
                reportType === 'summary' ? 'Resumido' : 
                reportType === 'analysis' ? 'Análise Comparativa' : 'Divergências'} - ${
                  reportPeriod === 'current-month' ? 'Mês Atual' :
                  reportPeriod === 'last-month' ? 'Mês Anterior' :
                  reportPeriod === 'current-quarter' ? 'Trimestre Atual' :
                  reportPeriod === 'last-quarter' ? 'Trimestre Anterior' :
                  reportPeriod === 'current-year' ? 'Ano Atual' : 'Período Personalizado'
                }`,
        generatedAt: new Date().toLocaleDateString('pt-BR'),
        status: 'completed' as const,
        size: Math.floor(Math.random() * 5 + 1) + '.' + Math.floor(Math.random() * 9 + 1) + ' MB',
        type: reportType === 'complete' ? 'Completo' : 
              reportType === 'summary' ? 'Resumido' : 
              reportType === 'analysis' ? 'Análise Comparativa' : 'Divergências'
      };
      
      setReports([newReport, ...reports]);
      setIsGenerating(false);
      
      toast({
        title: "Relatório gerado com sucesso",
        description: `Seu relatório está pronto para download.`,
      });
    }, 2000);
  };

  const handleExportReport = (format: string) => {
    setExportFormat(format);
    toast({
      title: "Exportando relatório",
      description: `Exportando no formato ${format.toUpperCase()}.`,
    });
  };

  const handleClearFilters = () => {
    setReportPeriod('last-month');
    setReportType('complete');
    
    toast({
      title: "Filtros limpos",
      description: "Todos os filtros foram redefinidos para os valores padrão.",
    });
  };

  const handleViewReport = (reportId: string) => {
    toast({
      title: "Visualizando relatório",
      description: `Abrindo detalhes do relatório ID: ${reportId}`,
    });
  };

  const handleDownloadReport = (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      toast({
        title: "Baixando relatório",
        description: `Iniciando download de: ${report.title}`,
      });
    }
  };

  return {
    reportPeriod,
    setReportPeriod,
    reportType,
    setReportType,
    isGenerating,
    activeTab,
    setActiveTab,
    exportFormat,
    setExportFormat,
    filterSidebarOpen,
    setFilterSidebarOpen,
    reports,
    handleGenerateReport,
    handleExportReport,
    handleClearFilters,
    handleViewReport,
    handleDownloadReport
  };
}
