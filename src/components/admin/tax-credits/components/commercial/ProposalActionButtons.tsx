
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, Send, Download, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Proposal {
  id: string;
  status: 'draft' | 'sent' | 'approved' | 'rejected' | 'expired';
}

interface ProposalActionButtonsProps {
  proposal: Proposal;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSend: (id: string) => void;
  onDownload: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const ProposalActionButtons: React.FC<ProposalActionButtonsProps> = ({
  proposal,
  onViewDetails,
  onEdit,
  onDelete,
  onSend,
  onDownload,
  onApprove,
  onReject
}) => {
  return (
    <div className="flex space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onViewDetails(proposal.id)}
              >
                <Eye className="h-4 w-4" />
                <span className="sr-only">Ver detalhes</span>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ver detalhes</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onDownload(proposal.id)}
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">Baixar</span>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Baixar proposta</p>
          </TooltipContent>
        </Tooltip>

        {proposal.status === 'draft' && (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onEdit(proposal.id)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Editar proposta</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onSend(proposal.id)}
                  >
                    <Send className="h-4 w-4 text-blue-500" />
                    <span className="sr-only">Enviar</span>
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Enviar proposta</p>
              </TooltipContent>
            </Tooltip>
          </>
        )}

        {proposal.status === 'sent' && (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onApprove(proposal.id)}
                  >
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="sr-only">Aprovar</span>
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Aprovar proposta</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onReject(proposal.id)}
                  >
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="sr-only">Rejeitar</span>
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rejeitar proposta</p>
              </TooltipContent>
            </Tooltip>
          </>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onDelete(proposal.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
                <span className="sr-only">Excluir</span>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Excluir proposta</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ProposalActionButtons;
