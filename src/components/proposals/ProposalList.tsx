import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProposals } from '@/hooks/useProposals';
import { PROPOSAL_STATUS_LABELS } from '@/types/proposal';
import { formatCurrency, formatDate } from '@/lib/format';
import { Eye, FileText, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ProposalListProps {
  className?: string;
  filters?: {
    status?: string[];
    clientId?: string;
    salesRepId?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
  };
}

const ProposalList: React.FC<ProposalListProps> = ({ className, filters }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useProposals(filters);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-muted text-muted-foreground';
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400';
      case 'IN_ANALYSIS':
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-400';
      case 'APPROVED':
        return 'bg-green-500/20 text-green-700 dark:text-green-400';
      case 'REJECTED':
        return 'bg-red-500/20 text-red-700 dark:text-red-400';
      case 'CONVERTED':
        return 'bg-purple-500/20 text-purple-700 dark:text-purple-400';
      case 'CANCELLED':
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!data?.proposals.length) {
    return (
      <div className={cn("flex flex-col items-center justify-center py-12", className)}>
        <FileText className="h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Nenhuma proposta encontrada</h3>
        <p className="text-sm text-muted-foreground">
          Não encontramos nenhuma proposta com os filtros selecionados.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-md border", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Valor Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.proposals.map((proposal) => (
            <TableRow key={proposal.id}>
              <TableCell className="font-medium">{proposal.title}</TableCell>
              <TableCell>{proposal.client?.razaoSocial}</TableCell>
              <TableCell>{formatCurrency(proposal.totalValue)}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(proposal.status)}>
                  {PROPOSAL_STATUS_LABELS[proposal.status]}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(proposal.createdAt)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Abrir menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/proposals/${proposal.id}`)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Visualizar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProposalList; 