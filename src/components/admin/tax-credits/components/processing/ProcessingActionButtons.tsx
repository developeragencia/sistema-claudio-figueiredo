
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, PlayCircle, FileCheck, PauseCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProcessDataItem {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

interface ProcessingActionButtonsProps {
  item: ProcessDataItem;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onComplete: (id: string) => void;
}

const ProcessingActionButtons: React.FC<ProcessingActionButtonsProps> = ({
  item,
  onViewDetails,
  onEdit,
  onDelete,
  onStart,
  onPause,
  onComplete
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
                onClick={() => onViewDetails(item.id)}
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
                onClick={() => onEdit(item.id)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Editar</span>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Editar processo</p>
          </TooltipContent>
        </Tooltip>

        {item.status === 'pending' && (
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => onStart(item.id)}
                >
                  <PlayCircle className="h-4 w-4 text-green-500" />
                  <span className="sr-only">Iniciar</span>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Iniciar processamento</p>
            </TooltipContent>
          </Tooltip>
        )}

        {item.status === 'processing' && (
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => onPause(item.id)}
                >
                  <PauseCircle className="h-4 w-4 text-amber-500" />
                  <span className="sr-only">Pausar</span>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Pausar processamento</p>
            </TooltipContent>
          </Tooltip>
        )}

        {(item.status === 'processing' || item.status === 'pending') && (
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => onComplete(item.id)}
                >
                  <FileCheck className="h-4 w-4 text-blue-500" />
                  <span className="sr-only">Concluir</span>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Marcar como concluído</p>
            </TooltipContent>
          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onDelete(item.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
                <span className="sr-only">Excluir</span>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Excluir processo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ProcessingActionButtons;
