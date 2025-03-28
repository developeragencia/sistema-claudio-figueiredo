import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import type { ProposalStatus } from '@/types/proposal';
import { useProposalState } from '@/hooks/useProposalState';

interface ProposalActionsProps {
  proposalId: string;
  status: ProposalStatus;
}

export function ProposalActions({ proposalId, status }: ProposalActionsProps) {
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isConvertOpen, setIsConvertOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [comments, setComments] = useState('');

  const {
    isUpdating,
    handleStatusUpdate,
    canApprove,
    canReject,
    canConvert,
    canCancel
  } = useProposalState(proposalId);

  const handleApprove = async () => {
    await handleStatusUpdate('APPROVED', comments);
    setIsApproveOpen(false);
    setComments('');
  };

  const handleReject = async () => {
    await handleStatusUpdate('REJECTED', comments);
    setIsRejectOpen(false);
    setComments('');
  };

  const handleConvert = async () => {
    await handleStatusUpdate('CONVERTED', comments);
    setIsConvertOpen(false);
    setComments('');
  };

  const handleCancel = async () => {
    await handleStatusUpdate('REJECTED', comments);
    setIsCancelOpen(false);
    setComments('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {canApprove(status) && (
          <Dialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">Aprovar</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Aprovar Proposta</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja aprovar esta proposta?
                </DialogDescription>
              </DialogHeader>
              <Textarea
                placeholder="Adicione um comentário (opcional)"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsApproveOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleApprove}
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Aprovando...' : 'Aprovar'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {canReject(status) && (
          <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                Rejeitar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rejeitar Proposta</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja rejeitar esta proposta?
                </DialogDescription>
              </DialogHeader>
              <Textarea
                placeholder="Adicione um motivo para a rejeição"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
              />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsRejectOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleReject}
                  disabled={isUpdating || !comments}
                >
                  {isUpdating ? 'Rejeitando...' : 'Rejeitar'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {canConvert(status) && (
          <Dialog open={isConvertOpen} onOpenChange={setIsConvertOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">
                Converter em Contrato
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Converter em Contrato</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja converter esta proposta em contrato?
                </DialogDescription>
              </DialogHeader>
              <Textarea
                placeholder="Adicione um comentário (opcional)"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsConvertOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleConvert}
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Convertendo...' : 'Converter'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {canCancel(status) && (
          <Dialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                Cancelar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancelar Proposta</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja cancelar esta proposta?
                </DialogDescription>
              </DialogHeader>
              <Textarea
                placeholder="Adicione um motivo para o cancelamento"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
              />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCancelOpen(false)}
                >
                  Voltar
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleCancel}
                  disabled={isUpdating || !comments}
                >
                  {isUpdating ? 'Cancelando...' : 'Cancelar'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
} 