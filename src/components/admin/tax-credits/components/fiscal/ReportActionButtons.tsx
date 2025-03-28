
import React from 'react';
import ButtonEffect from '@/components/admin/common/ButtonEffect';
import { Eye, FileDown, Printer, Share2, Trash2 } from 'lucide-react';

interface ReportActionButtonsProps {
  reportId: string;
  onViewReport: (reportId: string) => void;
  onDownloadReport: (reportId: string) => void;
  onPrintReport: (reportId: string) => void;
  onShareReport: (reportId: string) => void;
  onDeleteReport: (reportId: string) => void;
}

const ReportActionButtons: React.FC<ReportActionButtonsProps> = ({
  reportId,
  onViewReport,
  onDownloadReport,
  onPrintReport,
  onShareReport,
  onDeleteReport
}) => {
  const actionButtons = [
    {
      icon: <Eye className="h-4 w-4" />,
      tooltip: "Visualizar relatório",
      action: () => onViewReport(reportId),
      ariaLabel: "Visualizar"
    },
    {
      icon: <FileDown className="h-4 w-4" />,
      tooltip: "Baixar relatório",
      action: () => onDownloadReport(reportId),
      ariaLabel: "Baixar"
    },
    {
      icon: <Printer className="h-4 w-4" />,
      tooltip: "Imprimir relatório",
      action: () => onPrintReport(reportId),
      ariaLabel: "Imprimir"
    },
    {
      icon: <Share2 className="h-4 w-4" />,
      tooltip: "Compartilhar relatório",
      action: () => onShareReport(reportId),
      ariaLabel: "Compartilhar"
    },
    {
      icon: <Trash2 className="h-4 w-4 text-red-500" />,
      tooltip: "Excluir relatório",
      action: () => onDeleteReport(reportId),
      ariaLabel: "Excluir"
    }
  ];

  return (
    <div className="flex space-x-2">
      {actionButtons.map((button, index) => (
        <ButtonEffect
          key={index}
          onClick={button.action}
          icon={button.icon}
          tooltip={button.tooltip}
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
        />
      ))}
    </div>
  );
};

export default ReportActionButtons;
