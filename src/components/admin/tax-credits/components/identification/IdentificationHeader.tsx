
import React from 'react';
import { Button } from "@/components/ui/button";
import { Settings, Download, FileSearch, RefreshCw } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IdentificationHeaderProps {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  setShowExportOptions: (show: boolean) => void;
  isAnalyzing: boolean;
  handleStartAnalysis: () => void;
  setIsConfirmDialog: (show: boolean) => void;
}

const IdentificationHeader: React.FC<IdentificationHeaderProps> = ({
  selectedPeriod,
  setSelectedPeriod,
  showSettings,
  setShowSettings,
  setShowExportOptions,
  isAnalyzing,
  handleStartAnalysis,
  setIsConfirmDialog
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Identificação de Créditos</h2>
        <p className="text-muted-foreground">
          Identifique automaticamente os créditos tributários de IRRF/PJ.
        </p>
      </div>
      <div className="flex flex-wrap sm:flex-nowrap gap-2">
        <Select
          value={selectedPeriod}
          onValueChange={setSelectedPeriod}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Período de Análise</SelectLabel>
              <SelectItem value="12">Últimos 12 meses</SelectItem>
              <SelectItem value="24">Últimos 24 meses</SelectItem>
              <SelectItem value="36">Últimos 36 meses</SelectItem>
              <SelectItem value="48">Últimos 48 meses</SelectItem>
              <SelectItem value="60">Últimos 60 meses</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings className="h-4 w-4" />
          Configurações
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setShowExportOptions(true)}
        >
          <Download className="h-4 w-4" />
          Exportar
        </Button>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setIsConfirmDialog(true)}
          disabled={isAnalyzing}
        >
          <FileSearch className="h-4 w-4" />
          {isAnalyzing ? "Analisando..." : "Análise Rápida"}
        </Button>
        <Button 
          variant="default"
          className="flex items-center gap-2"
          onClick={handleStartAnalysis}
          disabled={isAnalyzing}
        >
          <RefreshCw className="h-4 w-4" />
          {isAnalyzing ? "Analisando..." : "Análise Completa"}
        </Button>
      </div>
    </div>
  );
};

export default IdentificationHeader;
