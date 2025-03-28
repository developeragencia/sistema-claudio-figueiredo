
import React from 'react';
import ButtonEffect from '@/components/admin/common/ButtonEffect';
import { Eye, FileDown, CheckCircle, AlertTriangle, RefreshCw, Database, Trash2 } from 'lucide-react';

interface ImportData {
  id: string;
  status: 'pending' | 'processing' | 'validated' | 'failed' | 'completed';
}

interface ImportDataActionButtonsProps {
  data: ImportData;
  onViewDetails: (dataId: string) => void;
  onDownload: (dataId: string) => void;
  onValidate?: (dataId: string) => void;
  onRetry?: (dataId: string) => void;
  onProcess?: (dataId: string) => void;
  onDelete: (dataId: string) => void;
}

const ImportDataActionButtons: React.FC<ImportDataActionButtonsProps> = ({
  data,
  onViewDetails,
  onDownload,
  onValidate,
  onRetry,
  onProcess,
  onDelete
}) => {
  // Common actions for all import data statuses
  const buttons = [
    {
      icon: <Eye className="h-4 w-4" />,
      tooltip: "Ver detalhes",
      action: () => onViewDetails(data.id),
      ariaLabel: "Ver detalhes"
    },
    {
      icon: <FileDown className="h-4 w-4" />,
      tooltip: "Baixar arquivo",
      action: () => onDownload(data.id),
      ariaLabel: "Baixar"
    }
  ];

  // Status-specific actions
  if ((data.status === 'pending' || data.status === 'validated') && onProcess) {
    buttons.push({
      icon: <Database className="h-4 w-4 text-blue-500" />,
      tooltip: "Processar dados",
      action: () => onProcess(data.id),
      ariaLabel: "Processar"
    });
  }

  if (data.status === 'pending' && onValidate) {
    buttons.push({
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
      tooltip: "Validar importação",
      action: () => onValidate(data.id),
      ariaLabel: "Validar"
    });
  }

  if (data.status === 'failed' && onRetry) {
    buttons.push({
      icon: <RefreshCw className="h-4 w-4 text-amber-500" />,
      tooltip: "Tentar novamente",
      action: () => onRetry(data.id),
      ariaLabel: "Tentar novamente"
    });
  }

  if (data.status === 'validated' && onProcess) {
    buttons.push({
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      tooltip: "Aprovar importação",
      action: () => onProcess(data.id),
      ariaLabel: "Aprovar"
    });
  }

  // Delete action always present
  buttons.push({
    icon: <Trash2 className="h-4 w-4 text-red-500" />,
    tooltip: "Excluir importação",
    action: () => onDelete(data.id),
    ariaLabel: "Excluir"
  });

  return (
    <div className="flex space-x-2">
      {buttons.map((button, index) => (
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

export default ImportDataActionButtons;
