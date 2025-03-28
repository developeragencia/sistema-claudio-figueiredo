
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Eye, FileText, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';

// Define the interface for a Report object
interface Report {
  id: string;
  title: string;
  generatedAt: string;
  status: 'completed' | 'processing' | 'error';
  size: string;
  type: string;
}

interface ReportsTableProps {
  reports: Report[];
  isLoading?: boolean;
  onDownload: (reportId: string) => void;
  onView: (reportId: string) => void;
}

const ReportsTable: React.FC<ReportsTableProps> = ({
  reports,
  isLoading = false,
  onDownload,
  onView
}) => {
  // Helper function to render the status badge
  const renderStatusBadge = (status: Report['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Concluído</Badge>;
      case 'processing':
        return <Badge variant="warning">Processando</Badge>;
      case 'error':
        return <Badge variant="destructive">Erro</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <FileText className="h-12 w-12 mb-4 text-muted-foreground" />
        <h3 className="text-lg font-medium">Nenhum relatório encontrado</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Utilize os filtros acima para gerar um novo relatório
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome do Relatório</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Data de Geração</TableHead>
          <TableHead>Tamanho</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.id}>
            <TableCell className="font-medium">{report.title}</TableCell>
            <TableCell>{report.type}</TableCell>
            <TableCell>{report.generatedAt}</TableCell>
            <TableCell>{report.size}</TableCell>
            <TableCell>{renderStatusBadge(report.status)}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onView(report.id)}
                  title="Visualizar relatório"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDownload(report.id)}
                  title="Baixar relatório"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Opções</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onView(report.id)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDownload(report.id)}>
                      <Download className="h-4 w-4 mr-2" />
                      Baixar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReportsTable;
