
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Printer, Share2, BarChart4, FileText, FileSpreadsheet } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useReportsStore } from '../hooks/useReportsStore';

const ReportsTable = () => {
  const { filteredReports, handleDownloadReport } = useReportsStore();
  
  if (filteredReports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <FileText className="h-12 w-12 mb-4 text-muted-foreground" />
        <h3 className="text-lg font-medium">Nenhum relatório encontrado</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Utilize os filtros acima para encontrar relatórios
        </p>
      </div>
    );
  }
  
  return (
    <div className="min-w-[600px] sm:min-w-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Downloads</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    {report.type === 'Financeiro' && <BarChart4 className="h-4 w-4 text-primary" />}
                    {report.type === 'Usuários' && <FileText className="h-4 w-4 text-primary" />}
                    {report.type === 'Vendas' && <FileSpreadsheet className="h-4 w-4 text-primary" />}
                    {report.type === 'Desempenho' && <FileText className="h-4 w-4 text-primary" />}
                    {report.type === 'Fiscal' && <FileText className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="line-clamp-1">{report.name}</div>
                </div>
              </TableCell>
              <TableCell>{report.type}</TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>{report.downloads}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2 flex-wrap">
                  <Button variant="ghost" size="sm" onClick={() => handleDownloadReport(report.id)}>
                    <Download className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Baixar</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="sm:hidden">
                    <Printer className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="sm:hidden">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="hidden sm:flex">
                    <Printer className="h-4 w-4 mr-1" />
                    <span>Imprimir</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="hidden sm:flex">
                    <Share2 className="h-4 w-4 mr-1" />
                    <span>Compartilhar</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportsTable;
