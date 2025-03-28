import React, { useState } from 'react';
import { useReports } from '@/hooks/useReports';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Download, BarChart, LineChart, PieChart } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ReportChart } from '@/components/reports/ReportChart';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { logger } from '@/lib/logger';

type ExportFormat = 'json' | 'csv' | 'xlsx';

export function Reports() {
  const [reportType, setReportType] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const { data, isLoading, generateReport, exportReport } = useReports({
    type: reportType,
    start_date: startDate,
    end_date: endDate
  });
  const { toast } = useToast();

  const handleGenerateReport = async () => {
    if (!reportType || !startDate || !endDate) {
      toast({
        title: 'Erro',
        description: 'Selecione o tipo de relatório e o período.',
        variant: 'destructive'
      });
      return;
    }

    try {
      await generateReport();
      toast({
        title: 'Relatório gerado',
        description: 'O relatório foi gerado com sucesso.',
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao gerar o relatório.',
        variant: 'destructive'
      });
    }
  };

  const handleExport = async (format: ExportFormat) => {
    try {
      const data = await fetchReportData();
      const fileName = `relatorio_${format(new Date(), 'dd-MM-yyyy')}.${format}`;

      switch (format) {
        case 'json':
          saveAs(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }), fileName);
          break;
        case 'csv':
          const csvContent = data.map(row => Object.values(row).join(',')).join('\n');
          saveAs(new Blob([csvContent], { type: 'text/csv;charset=utf-8' }), fileName);
          break;
        case 'xlsx':
          const worksheet = XLSX.utils.json_to_sheet(data);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório');
          const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          saveAs(new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), fileName);
          break;
      }

      logger.info('Relatório exportado com sucesso', { format, rows: data.length });
    } catch (error) {
      logger.error('Erro ao exportar relatório', { error });
    }
  };

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'clients':
        return <PieChart className="h-8 w-8 text-blue-500" />;
      case 'proposals':
        return <BarChart className="h-8 w-8 text-green-500" />;
      case 'contracts':
        return <BarChart className="h-8 w-8 text-yellow-500" />;
      case 'financial':
        return <LineChart className="h-8 w-8 text-red-500" />;
      default:
        return null;
    }
  };

  const getReportTitle = (type: string) => {
    switch (type) {
      case 'clients':
        return 'Relatório de Clientes';
      case 'proposals':
        return 'Relatório de Propostas';
      case 'contracts':
        return 'Relatório de Contratos';
      case 'financial':
        return 'Relatório Financeiro';
      default:
        return 'Selecione um relatório';
    }
  };

  const getReportDescription = (type: string) => {
    switch (type) {
      case 'clients':
        return 'Análise detalhada dos clientes, incluindo propostas e contratos';
      case 'proposals':
        return 'Visão geral das propostas e suas conversões';
      case 'contracts':
        return 'Análise dos contratos ativos e expirados';
      case 'financial':
        return 'Análise financeira com receitas, despesas e lucros';
      default:
        return 'Escolha um tipo de relatório para começar';
    }
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">
            Gere e analise relatórios do sistema
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => handleExport('json')}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => handleExport('csv')}>
            CSV
          </Button>
          <Button variant="outline" size="icon" onClick={() => handleExport('xlsx')}>
            XLSX
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="cursor-pointer hover:bg-accent" onClick={() => setReportType('clients')}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Clientes</CardTitle>
              <PieChart className="h-8 w-8 text-blue-500" />
            </div>
            <CardDescription>
              Análise de clientes
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:bg-accent" onClick={() => setReportType('proposals')}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Propostas</CardTitle>
              <BarChart className="h-8 w-8 text-green-500" />
            </div>
            <CardDescription>
              Análise de propostas
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:bg-accent" onClick={() => setReportType('contracts')}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Contratos</CardTitle>
              <BarChart className="h-8 w-8 text-yellow-500" />
            </div>
            <CardDescription>
              Análise de contratos
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:bg-accent" onClick={() => setReportType('financial')}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Financeiro</CardTitle>
              <LineChart className="h-8 w-8 text-red-500" />
            </div>
            <CardDescription>
              Análise financeira
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            {reportType && getReportIcon(reportType)}
            <div>
              <CardTitle>{getReportTitle(reportType)}</CardTitle>
              <CardDescription>
                {getReportDescription(reportType)}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Tipo de Relatório</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clients">Clientes</SelectItem>
                    <SelectItem value="proposals">Propostas</SelectItem>
                    <SelectItem value="contracts">Contratos</SelectItem>
                    <SelectItem value="financial">Financeiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Data Inicial</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Data Final</Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={handleGenerateReport} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                'Gerar Relatório'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {data?.items && data.items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
            <CardDescription>
              Visualize os dados do relatório
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReportChart type={reportType} data={data} />
          </CardContent>
        </Card>
      )}
    </div>
  );
} 