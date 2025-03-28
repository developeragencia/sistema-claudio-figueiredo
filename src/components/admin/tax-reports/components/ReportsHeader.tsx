
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Filter, RefreshCw, FileBarChart } from 'lucide-react';
import ExportOptionsMenu from './ExportOptionsMenu';

interface ReportsHeaderProps {
  onExport: (format: string) => void;
  onFilter: () => void;
  onGenerateReport: () => void;
  onRefresh: () => void;
}

const ReportsHeader: React.FC<ReportsHeaderProps> = ({
  onExport,
  onFilter,
  onGenerateReport,
  onRefresh
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Compensação Tributária</h2>
        <p className="text-muted-foreground">
          Gere relatórios, simule compensações e calcule correções monetárias
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" onClick={onFilter}>
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
        
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Atualizar
        </Button>
        
        <ExportOptionsMenu onExport={onExport} />
        
        <Button size="sm" onClick={onGenerateReport}>
          <FileBarChart className="mr-2 h-4 w-4" />
          Novo Relatório
        </Button>
      </div>
    </div>
  );
};

export default ReportsHeader;
