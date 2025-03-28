
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalysisSettingsProps {
  advancedSettings: {
    monthsToAnalyze: number;
    includeCorrectionSelic: boolean;
    minimumCreditValue: number;
    automaticallyApprove: boolean;
  };
  setAdvancedSettings: React.Dispatch<React.SetStateAction<{
    monthsToAnalyze: number;
    includeCorrectionSelic: boolean;
    minimumCreditValue: number;
    automaticallyApprove: boolean;
  }>>;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: () => void;
}

const AnalysisSettings: React.FC<AnalysisSettingsProps> = ({
  advancedSettings,
  setAdvancedSettings,
  setShowSettings,
  onSave
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Análise</CardTitle>
        <CardDescription>
          Ajuste os parâmetros para identificação de créditos tributários.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="monthsToAnalyze" className="text-sm font-medium">
              Período de análise (meses)
            </label>
            <Input 
              id="monthsToAnalyze" 
              type="number" 
              value={advancedSettings.monthsToAnalyze}
              onChange={(e) => setAdvancedSettings({
                ...advancedSettings, 
                monthsToAnalyze: parseInt(e.target.value)
              })}
            />
            <p className="text-xs text-muted-foreground">
              Limite de 60 meses conforme legislação.
            </p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="minimumCreditValue" className="text-sm font-medium">
              Valor mínimo do crédito (R$)
            </label>
            <Input 
              id="minimumCreditValue" 
              type="number" 
              value={advancedSettings.minimumCreditValue}
              onChange={(e) => setAdvancedSettings({
                ...advancedSettings, 
                minimumCreditValue: parseInt(e.target.value)
              })}
            />
            <p className="text-xs text-muted-foreground">
              Ignorar créditos abaixo deste valor.
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="includeCorrectionSelic" 
              className="h-4 w-4"
              checked={advancedSettings.includeCorrectionSelic}
              onChange={(e) => setAdvancedSettings({
                ...advancedSettings, 
                includeCorrectionSelic: e.target.checked
              })}
            />
            <label htmlFor="includeCorrectionSelic" className="text-sm font-medium">
              Aplicar correção pela taxa Selic
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="automaticallyApprove" 
              className="h-4 w-4"
              checked={advancedSettings.automaticallyApprove}
              onChange={(e) => setAdvancedSettings({
                ...advancedSettings, 
                automaticallyApprove: e.target.checked
              })}
            />
            <label htmlFor="automaticallyApprove" className="text-sm font-medium">
              Aprovar créditos automaticamente
            </label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => setShowSettings(false)}>Cancelar</Button>
        <Button onClick={onSave}>Salvar Configurações</Button>
      </CardFooter>
    </Card>
  );
};

export default AnalysisSettings;
