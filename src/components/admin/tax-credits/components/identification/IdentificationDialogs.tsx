
import React from 'react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IdentificationDialogsProps {
  isConfirmDialog: boolean;
  setIsConfirmDialog: (show: boolean) => void;
  handleQuickAnalysis: () => void;
  showExportOptions: boolean;
  setShowExportOptions: (show: boolean) => void;
  exportFormat: string;
  setExportFormat: (format: string) => void;
  handleExportCredits: () => void;
  selectedPeriod: string;
}

const IdentificationDialogs: React.FC<IdentificationDialogsProps> = ({
  isConfirmDialog,
  setIsConfirmDialog,
  handleQuickAnalysis,
  showExportOptions,
  setShowExportOptions,
  exportFormat,
  setExportFormat,
  handleExportCredits,
  selectedPeriod
}) => {
  return (
    <>
      <AlertDialog open={isConfirmDialog} onOpenChange={setIsConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Iniciar Análise Automática</AlertDialogTitle>
            <AlertDialogDescription>
              Isso iniciará uma análise automática dos pagamentos realizados nos últimos {selectedPeriod} meses, 
              aplicando as regras do Manual de Retenções IRPJ e classificando automaticamente os fornecedores.
              
              Este processo pode demorar alguns minutos dependendo do volume de dados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleQuickAnalysis}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showExportOptions} onOpenChange={setShowExportOptions}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exportar Créditos Identificados</AlertDialogTitle>
            <AlertDialogDescription>
              Selecione o formato de exportação dos créditos tributários identificados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Select
              value={exportFormat}
              onValueChange={setExportFormat}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Formato do Arquivo</SelectLabel>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV (.csv)</SelectItem>
                  <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                  <SelectItem value="json">JSON (.json)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleExportCredits}>Exportar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default IdentificationDialogs;
