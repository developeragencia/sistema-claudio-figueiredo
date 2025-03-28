
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, FileSearch, CheckCircle, XCircle, FileCheck, AlertCircle } from 'lucide-react';
import { ProposalStatus as ProposalStatusType } from '@/types/proposal';

interface ProposalStatusProps {
  status: ProposalStatusType;
}

const ProposalStatus: React.FC<ProposalStatusProps> = ({ status }) => {
  // Handle both old and new status types
  switch (status) {
    case 'REQUEST':
    case 'DRAFT':
    case 'PENDING':
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {status === 'REQUEST' ? 'Solicitação' : status === 'DRAFT' ? 'Rascunho' : 'Pendente'}
        </Badge>
      );
    case 'ANALYSIS':
    case 'IN_ANALYSIS':
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
          <FileSearch className="h-3 w-3" />
          Em Análise
        </Badge>
      );
    case 'APPROVED':
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Aprovada
        </Badge>
      );
    case 'REJECTED':
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Rejeitada
        </Badge>
      );
    case 'CONVERTED':
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 flex items-center gap-1">
          <FileCheck className="h-3 w-3" />
          Convertida
        </Badge>
      );
    case 'CANCELLED':
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Cancelada
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default ProposalStatus;
