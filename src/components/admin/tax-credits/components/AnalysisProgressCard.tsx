
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface AnalysisProgressCardProps {
  analysisProgress: number;
  onCancel: () => void;
}

const AnalysisProgressCard: React.FC<AnalysisProgressCardProps> = ({ 
  analysisProgress, 
  onCancel 
}) => {
  return (
    <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20">
      <CardHeader>
        <CardTitle>Análise em Andamento</CardTitle>
        <CardDescription>
          {analysisProgress < 100 
            ? "Analisando pagamentos e identificando possíveis créditos tributários..." 
            : "Análise concluída. Processando resultados..."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progresso</span>
            <span>{analysisProgress}%</span>
          </div>
          <Progress value={analysisProgress} className="h-2" />
          
          <div className="pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Pagamentos analisados</span>
              <span>{Math.floor((analysisProgress / 100) * 843)} / 843</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Fornecedores processados</span>
              <span>{Math.floor((analysisProgress / 100) * 142)} / 142</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Possíveis créditos identificados</span>
              <span>{Math.floor((analysisProgress / 100) * 18)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      {analysisProgress < 100 && (
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={onCancel}
          >
            Cancelar Análise
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AnalysisProgressCard;
