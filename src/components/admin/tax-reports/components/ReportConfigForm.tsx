
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface ReportConfigFormProps {
  reportPeriod: string;
  setReportPeriod: (value: string) => void;
  reportType: string;
  setReportType: (value: string) => void;
  isGenerating: boolean;
  onGenerateReport: () => void;
  onClearFilters: () => void;
}

const ReportConfigForm: React.FC<ReportConfigFormProps> = ({
  reportPeriod,
  setReportPeriod,
  reportType,
  setReportType,
  isGenerating,
  onGenerateReport,
  onClearFilters
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parâmetros do Relatório Fiscal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="report-period">Período</Label>
            <Select value={reportPeriod} onValueChange={setReportPeriod}>
              <SelectTrigger id="report-period">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Mês Atual</SelectItem>
                <SelectItem value="last-month">Mês Anterior</SelectItem>
                <SelectItem value="current-quarter">Trimestre Atual</SelectItem>
                <SelectItem value="last-quarter">Trimestre Anterior</SelectItem>
                <SelectItem value="current-year">Ano Atual</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="report-type">Tipo de Relatório</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger id="report-type">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="complete">Completo</SelectItem>
                <SelectItem value="summary">Resumido</SelectItem>
                <SelectItem value="analysis">Análise Comparativa</SelectItem>
                <SelectItem value="discrepancies">Divergências</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {reportPeriod === 'custom' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="date-start">Data Inicial</Label>
                <Input type="date" id="date-start" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-end">Data Final</Label>
                <Input type="date" id="date-end" />
              </div>
            </>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="company-filter">Empresa</Label>
            <Select>
              <SelectTrigger id="company-filter">
                <SelectValue placeholder="Todas as empresas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as empresas</SelectItem>
                <SelectItem value="company-1">Empresa A</SelectItem>
                <SelectItem value="company-2">Empresa B</SelectItem>
                <SelectItem value="company-3">Empresa C</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tax-filter">Tributos</Label>
            <Select>
              <SelectTrigger id="tax-filter">
                <SelectValue placeholder="Todos os tributos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tributos</SelectItem>
                <SelectItem value="irrf">IRRF</SelectItem>
                <SelectItem value="pis">PIS</SelectItem>
                <SelectItem value="cofins">COFINS</SelectItem>
                <SelectItem value="csll">CSLL</SelectItem>
                <SelectItem value="inss">INSS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClearFilters}>Limpar Filtros</Button>
          <Button 
            onClick={onGenerateReport} 
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>Gerando...</>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Gerar Relatório
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportConfigForm;
