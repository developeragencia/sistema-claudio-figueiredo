
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, RefreshCw } from 'lucide-react';

interface RecoveryHeaderProps {
  onRefresh: () => void;
  onNewProcess: () => void;
  isListening?: boolean;
}

const RecoveryHeader: React.FC<RecoveryHeaderProps> = ({ 
  onRefresh, 
  onNewProcess,
  isListening = false
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Recuperação de Créditos</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie os processos de recuperação de créditos tributários
          {isListening && <span className="ml-2 text-xs text-green-500 inline-flex items-center"><span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span>Atualizações em tempo real ativas</span>}
        </p>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button 
          variant="default" 
          className="w-full sm:w-auto"
          onClick={onNewProcess}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Processo
        </Button>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto"
          onClick={onRefresh}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Atualizar
        </Button>
      </div>
    </div>
  );
};

export default RecoveryHeader;
