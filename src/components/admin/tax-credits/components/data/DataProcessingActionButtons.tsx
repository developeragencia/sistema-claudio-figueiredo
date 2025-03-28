
import React from 'react';
import ButtonEffect from '@/components/admin/common/ButtonEffect';
import { Eye, Edit, FileDown, BarChart2, RefreshCw, Trash2, AlertTriangle, Activity } from 'lucide-react';

interface DataProcess {
  id: string;
  status: 'processing' | 'completed' | 'failed' | 'waiting';
}

interface DataProcessingActionButtonsProps {
  process: DataProcess;
  onViewDetails: (processId: string) => void;
  onEdit?: (processId: string) => void;
  onDownload: (processId: string) => void;
  onAnalyze?: (processId: string) => void;
  onRetry?: (processId: string) => void;
  onMonitor?: (processId: string) => void;
  onDelete: (processId: string) => void;
}

const DataProcessingActionButtons: React.FC<DataProcessingActionButtonsProps> = ({
  process,
  onViewDetails,
  onEdit,
  onDownload,
  onAnalyze,
  onRetry,
  onMonitor,
  onDelete
}) => {
  // Common actions for all statuses
  const buttons = [
    {
      icon: <Eye className="h-4 w-4" />,
      tooltip: "Ver detalhes",
      action: () => onViewDetails(process.id),
      ariaLabel: "Ver detalhes"
    },
    {
      icon: <FileDown className="h-4 w-4" />,
      tooltip: "Baixar dados",
      action: () => onDownload(process.id),
      ariaLabel: "Baixar"
    }
  ];

  // Status-specific actions
  if (process.status === 'waiting' && onEdit) {
    buttons.push({
      icon: <Edit className="h-4 w-4" />,
      tooltip: "Editar parâmetros",
      action: () => onEdit(process.id),
      ariaLabel: "Editar"
    });
  }

  if (process.status === 'completed' && onAnalyze) {
    buttons.push({
      icon: <BarChart2 className="h-4 w-4 text-blue-500" />,
      tooltip: "Analisar resultados",
      action: () => onAnalyze(process.id),
      ariaLabel: "Analisar"
    });
  }

  if (process.status === 'failed' && onRetry) {
    buttons.push({
      icon: <RefreshCw className="h-4 w-4 text-amber-500" />,
      tooltip: "Tentar novamente",
      action: () => onRetry(process.id),
      ariaLabel: "Tentar novamente"
    });
  }

  if (process.status === 'processing' && onMonitor) {
    buttons.push({
      icon: <Activity className="h-4 w-4 text-green-500" />,
      tooltip: "Monitorar processamento",
      action: () => onMonitor(process.id),
      ariaLabel: "Monitorar"
    });
  }

  // Delete action always present
  buttons.push({
    icon: <Trash2 className="h-4 w-4 text-red-500" />,
    tooltip: "Excluir processamento",
    action: () => onDelete(process.id),
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

export default DataProcessingActionButtons;
