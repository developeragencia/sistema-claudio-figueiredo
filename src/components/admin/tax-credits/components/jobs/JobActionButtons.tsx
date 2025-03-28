
import React from 'react';
import ButtonEffect from '@/components/admin/common/ButtonEffect';
import { Eye, RefreshCw, FileDown, PlayCircle, PauseCircle, Trash2, CheckCircle } from 'lucide-react';

interface Job {
  id: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'paused';
}

interface JobActionButtonsProps {
  job: Job;
  onViewDetails: (jobId: string) => void;
  onDownload: (jobId: string) => void;
  onRetry?: (jobId: string) => void;
  onStart?: (jobId: string) => void;
  onPause?: (jobId: string) => void;
  onComplete?: (jobId: string) => void;
  onDelete: (jobId: string) => void;
}

const JobActionButtons: React.FC<JobActionButtonsProps> = ({
  job,
  onViewDetails,
  onDownload,
  onRetry,
  onStart,
  onPause,
  onComplete,
  onDelete
}) => {
  // Common actions for all job statuses
  const buttons = [
    {
      icon: <Eye className="h-4 w-4" />,
      tooltip: "Ver detalhes",
      action: () => onViewDetails(job.id),
      ariaLabel: "Ver detalhes"
    },
    {
      icon: <FileDown className="h-4 w-4" />,
      tooltip: "Baixar resultado",
      action: () => onDownload(job.id),
      ariaLabel: "Baixar"
    }
  ];

  // Status-specific actions
  if (job.status === 'failed' && onRetry) {
    buttons.push({
      icon: <RefreshCw className="h-4 w-4 text-blue-500" />,
      tooltip: "Tentar novamente",
      action: () => onRetry(job.id),
      ariaLabel: "Tentar novamente"
    });
  }

  if (job.status === 'queued' && onStart) {
    buttons.push({
      icon: <PlayCircle className="h-4 w-4 text-green-500" />,
      tooltip: "Iniciar processamento",
      action: () => onStart(job.id),
      ariaLabel: "Iniciar"
    });
  }

  if (job.status === 'running' && onPause) {
    buttons.push({
      icon: <PauseCircle className="h-4 w-4 text-amber-500" />,
      tooltip: "Pausar processamento",
      action: () => onPause(job.id),
      ariaLabel: "Pausar"
    });
  }

  if ((job.status === 'running' || job.status === 'paused') && onComplete) {
    buttons.push({
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      tooltip: "Marcar como concluído",
      action: () => onComplete(job.id),
      ariaLabel: "Concluir"
    });
  }

  // Delete action always present
  buttons.push({
    icon: <Trash2 className="h-4 w-4 text-red-500" />,
    tooltip: "Excluir job",
    action: () => onDelete(job.id),
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

export default JobActionButtons;
