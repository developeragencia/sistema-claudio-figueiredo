
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import ActionButtons from '@/components/admin/common/ActionButtons';

interface CreditActionButtonsProps {
  creditId: string;
  onViewDetails: (id: string) => void;
  onDownload?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  showApproveReject?: boolean;
}

const CreditActionButtons: React.FC<CreditActionButtonsProps> = ({
  creditId,
  onViewDetails,
  onDownload,
  onApprove,
  onReject,
  showApproveReject = false
}) => {
  const { toast } = useToast();
  
  const handleApprove = (id: string) => {
    if (onApprove) {
      onApprove(id);
    } else {
      toast({
        title: "Crédito aprovado",
        description: `O crédito ${id} foi aprovado com sucesso.`,
        variant: "default",
      });
    }
  };
  
  const handleReject = (id: string) => {
    if (onReject) {
      onReject(id);
    } else {
      toast({
        title: "Crédito rejeitado",
        description: `O crédito ${id} foi rejeitado.`,
        variant: "destructive",
      });
    }
  };

  const handleDownload = (id: string) => {
    if (onDownload) {
      onDownload(id);
    } else {
      toast({
        title: "Download iniciado",
        description: `Fazendo download dos detalhes do crédito ${id}.`,
        variant: "default",
      });
    }
  };

  return (
    <ActionButtons
      id={creditId}
      entityType="credit"
      showView={true}
      showDownload={!!onDownload}
      showApprove={showApproveReject}
      showReject={showApproveReject}
      onView={onViewDetails}
      onDownload={handleDownload}
      onApprove={handleApprove}
      onReject={handleReject}
    />
  );
};

export default CreditActionButtons;
