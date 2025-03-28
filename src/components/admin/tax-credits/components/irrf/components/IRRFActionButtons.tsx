
import React from 'react';
import ButtonEffect from '@/components/admin/common/ButtonEffect';
import { Plus, Upload, Calculator } from 'lucide-react';

interface IRRFActionButtonsProps {
  onNewRecovery: () => void;
  onImportData: () => void;
  onRunCalculation: () => void;
}

const IRRFActionButtons: React.FC<IRRFActionButtonsProps> = ({
  onNewRecovery,
  onImportData,
  onRunCalculation
}) => {
  return (
    <div className="flex gap-2">
      <ButtonEffect
        onClick={onNewRecovery}
        icon={<Plus className="h-4 w-4" />}
        label="Novo Processo"
        tooltip="Iniciar novo processo de recuperação"
      />
      
      <ButtonEffect
        onClick={onImportData}
        icon={<Upload className="h-4 w-4" />}
        label="Importar Dados"
        tooltip="Importar dados para análise"
        variant="outline"
      />
      
      <ButtonEffect
        onClick={onRunCalculation}
        icon={<Calculator className="h-4 w-4" />}
        label="Executar Cálculos"
        tooltip="Executar cálculos para processos pendentes"
        variant="outline"
      />
    </div>
  );
};

export default IRRFActionButtons;
