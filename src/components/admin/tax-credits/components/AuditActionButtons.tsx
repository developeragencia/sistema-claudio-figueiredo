
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, CheckCircle, FileSearch, Download } from 'lucide-react';
import { Audit } from '@/types/audit';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AuditActionButtonsProps {
  audit: Audit;
  onViewDetails: (auditId: string) => void;
  onDownloadDocuments: (auditId: string) => void;
  onEdit: (auditId: string) => void;
  onDelete: (auditId: string) => void;
  onApprove: (auditId: string) => void;
}

const AuditActionButtons: React.FC<AuditActionButtonsProps> = ({ 
  audit, 
  onViewDetails,
  onDownloadDocuments,
  onEdit, 
  onDelete, 
  onApprove
}) => {
  const actionButtons = [
    {
      icon: <FileSearch className="h-4 w-4" />,
      tooltip: "Ver detalhes",
      action: () => onViewDetails(audit.id),
      ariaLabel: "Ver detalhes"
    },
    {
      icon: <Download className="h-4 w-4" />,
      tooltip: "Baixar documentos",
      action: () => onDownloadDocuments(audit.id),
      ariaLabel: "Baixar documentos"
    },
    {
      icon: <Edit className="h-4 w-4" />,
      tooltip: "Editar auditoria",
      action: () => onEdit(audit.id),
      ariaLabel: "Editar"
    },
    {
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      tooltip: "Aprovar auditoria",
      action: () => onApprove(audit.id),
      ariaLabel: "Aprovar"
    },
    {
      icon: <Trash2 className="h-4 w-4 text-red-500" />,
      tooltip: "Excluir auditoria",
      action: () => onDelete(audit.id),
      ariaLabel: "Excluir"
    }
  ];

  return (
    <div className="flex space-x-2">
      <TooltipProvider>
        {actionButtons.map((button, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <motion.div 
                whileHover={{ scale: 1.2 }} 
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-primary/10 transition-colors duration-300"
                  onClick={button.action}
                >
                  <motion.span
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    {button.icon}
                  </motion.span>
                  <span className="sr-only">{button.ariaLabel}</span>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{button.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default AuditActionButtons;
