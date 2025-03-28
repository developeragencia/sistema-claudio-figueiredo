
import React from 'react';
import { useProposal, useUpdateProposalStatus, useConvertToContract } from '@/hooks/useProposals';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PROPOSAL_STATUS_LABELS, ProposalStatus } from '@/types/proposal';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { FileIcon, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProposalDetailsProps {
  proposalId: string;
  className?: string;
}

const ProposalDetails: React.FC<ProposalDetailsProps> = ({ proposalId, className }) => {
  const { user } = useAuth();
  const { data: proposal, isLoading } = useProposal(proposalId);
  const { mutate: updateStatus } = useUpdateProposalStatus();
  const { mutate: convertToContract } = useConvertToContract();

  const handleStatusUpdate = (newStatus: ProposalStatus) => {
    if (!proposal) return;

    updateStatus(
      { id: proposal.id, status: newStatus },
      {
        onSuccess: () => {
          toast.success('Status da proposta atualizado com sucesso');
        },
        onError: () => {
          toast.error('Erro ao atualizar status da proposta');
        },
      }
    );
  };

  const handleConvertToContract = () => {
    if (!proposal) return;

    convertToContract(
      proposal.id,
      {
        onSuccess: () => {
          toast.success('Proposta convertida em contrato com sucesso');
        },
        onError: () => {
          toast.error('Erro ao converter proposta em contrato');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle>Carregando detalhes da proposta...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (!proposal) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle>Proposta não encontrada</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const canApproveOrReject = user?.role === 'CLIENT' && proposal.status === 'PENDING';
  const canConvertToContract = ['MASTER_ADMIN', 'OFFICE_TEAM'].includes(user?.role || '') && proposal.status === 'APPROVED';

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{proposal.title}</CardTitle>
          <Badge variant="outline">{PROPOSAL_STATUS_LABELS[proposal.status]}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Cliente</p>
            <p className="text-lg">{proposal.client?.razaoSocial || proposal.clientName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
            <p className="text-lg">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(proposal.totalValue || proposal.value || 0)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Data de Criação</p>
            <p className="text-lg">
              {format(new Date(proposal.createdAt), "dd 'de' MMMM 'de' yyyy", {
                locale: ptBR,
              })}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Validade</p>
            <p className="text-lg">
              {format(new Date(proposal.validUntil), "dd 'de' MMMM 'de' yyyy", {
                locale: ptBR,
              })}
            </p>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-2">Descrição</h3>
          <p className="text-muted-foreground whitespace-pre-wrap">{proposal.description}</p>
        </div>

        {proposal.attachments && proposal.attachments.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="text-lg font-medium mb-2">Anexos</h3>
              <ScrollArea className="h-[100px]">
                <div className="space-y-2">
                  {proposal.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FileIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{attachment.name}</span>
                      <Button variant="link" className="text-sm" asChild>
                        <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                          Download
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </>
        )}

        {(canApproveOrReject || canConvertToContract) && (
          <>
            <Separator />
            <div className="flex justify-end gap-2">
              {canApproveOrReject && (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => handleStatusUpdate('REJECTED')}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Rejeitar
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => handleStatusUpdate('APPROVED')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aprovar
                  </Button>
                </>
              )}
              {canConvertToContract && (
                <Button onClick={handleConvertToContract}>
                  Converter em Contrato
                </Button>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProposalDetails;
