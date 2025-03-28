
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Mock reports data
const reports = [
  { id: 1, name: 'Relatório Financeiro - Mensal', date: '01/08/2023', downloads: 128, type: 'Financeiro' },
  { id: 2, name: 'Relatório de Usuários - Trimestral', date: '15/07/2023', downloads: 85, type: 'Usuários' },
  { id: 3, name: 'Relatório de Vendas - Anual', date: '10/06/2023', downloads: 243, type: 'Vendas' },
  { id: 4, name: 'Relatório de Desempenho - Q2 2023', date: '02/05/2023', downloads: 67, type: 'Desempenho' },
  { id: 5, name: 'Relatório Fiscal - Julho 2023', date: '01/08/2023', downloads: 112, type: 'Fiscal' },
];

export const useReportsStore = () => {
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false);
  const [reportName, setReportName] = useState('');
  const [reportType, setReportType] = useState('Financeiro');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Filter reports based on search query and active tab
  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedReportType === 'all') {
      return matchesSearch;
    } else if (selectedReportType === 'financial') {
      return matchesSearch && report.type === 'Financeiro';
    } else if (selectedReportType === 'users') {
      return matchesSearch && report.type === 'Usuários';
    } else if (selectedReportType === 'sales') {
      return matchesSearch && report.type === 'Vendas';
    } else if (selectedReportType === 'tax') {
      return matchesSearch && report.type === 'Fiscal';
    }
    
    return matchesSearch;
  });

  const handleGenerateReport = () => {
    if (!reportName || !startDate || !endDate) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Simulate report generation
    setTimeout(() => {
      const newReport = {
        id: reports.length + 1,
        name: reportName,
        date: new Date().toLocaleDateString('pt-BR'),
        downloads: 0,
        type: reportType
      };
      
      reports.unshift(newReport);
      
      setIsGenerateReportOpen(false);
      setReportName('');
      setStartDate('');
      setEndDate('');
      
      toast({
        title: "Relatório gerado",
        description: `O relatório "${reportName}" foi gerado com sucesso.`,
      });
    }, 1500);
  };

  const handleDownloadReport = (reportId: number) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      report.downloads += 1;
      toast({
        title: "Relatório baixado",
        description: `O relatório "${report.name}" foi baixado com sucesso.`,
      });
    }
  };

  return {
    selectedReportType,
    setSelectedReportType,
    isGenerateReportOpen,
    setIsGenerateReportOpen,
    reportName,
    setReportName,
    reportType,
    setReportType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    searchQuery,
    setSearchQuery,
    filteredReports,
    handleGenerateReport,
    handleDownloadReport
  };
};
