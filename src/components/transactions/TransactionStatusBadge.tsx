import React from 'react';
import { CheckCircle, CreditCard, FileCheck, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TransactionStatusBadgeProps {
  status: string;
}

const TransactionStatusBadge: React.FC<TransactionStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'completed':
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="mr-1 h-3 w-3" />
          Concluído
        </Badge>
      );
    case 'processing':
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <CreditCard className="mr-1 h-3 w-3" />
          Em processamento
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          <FileCheck className="mr-1 h-3 w-3" />
          Pendente
        </Badge>
      );
    case 'rejected':
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <AlertTriangle className="mr-1 h-3 w-3" />
          Rejeitado
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default TransactionStatusBadge; 