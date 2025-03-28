
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface ReportsHeaderProps {
  onGenerateReportClick: () => void;
}

const ReportsHeader: React.FC<ReportsHeaderProps> = ({ onGenerateReportClick }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 className="text-2xl font-bold">Relatórios</h1>
      <div className="flex items-center gap-2">
        <Button onClick={onGenerateReportClick}>
          <FileText className="h-4 w-4 mr-2" />
          Gerar Relatório
        </Button>
      </div>
    </div>
  );
};

export default ReportsHeader;
