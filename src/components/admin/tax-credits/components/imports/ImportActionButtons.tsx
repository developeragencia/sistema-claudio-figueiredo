
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, RefreshCw, FileDown, AlertTriangle, Check, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ImportFile {
  id: string;
  status: 'processing' | 'completed' | 'failed' | 'validating';
}

interface ImportActionButtonsProps {
  file: ImportFile;
  onViewDetails: (fileId: string) => void;
  onRetry: (fileId: string) => void;
  onDownload: (fileId: string) => void;
  onValidate: (fileId: string) => void;
  onApprove: (fileId: string) => void;
  onDelete: (fileId: string) => void;
}

const ImportActionButtons: React.FC<ImportActionButtonsProps> = ({
  file,
  onViewDetails,
  onRetry,
  onDownload,
  onValidate,
  onApprove,
  onDelete
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
                onClick={() => onViewDetails(file.id)}
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
                onClick={() => onDownload(file.id)}
              >
                <FileDown className="h-4 w-4" />
                <span className="sr-only">Baixar</span>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Baixar arquivo</p>
          </TooltipContent>
        </Tooltip>

        {file.status === 'failed' && (
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => onRetry(file.id)}
                >
                  <RefreshCw className="h-4 w-4 text-blue-500" />
                  <span className="sr-only">Tentar novamente</span>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tentar novamente</p>
            </TooltipContent>
          </Tooltip>
        )}

        {file.status === 'completed' && (
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => onValidate(file.id)}
                >
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <span className="sr-only">Validar</span>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Validar dados</p>
            </TooltipContent>
          </Tooltip>
        )}

        {file.status === 'validating' && (
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => onApprove(file.id)}
                >
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="sr-only">Aprovar</span>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Aprovar importação</p>
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
                onClick={() => onDelete(file.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
                <span className="sr-only">Excluir</span>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Excluir importação</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ImportActionButtons;
