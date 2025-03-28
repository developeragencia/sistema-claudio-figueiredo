
import React from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface AnalysisItemProps {
  client: string;
  type: string;
  period: string;
  progress: number;
  estimatedCompletion: string;
}

const AnalysisItem: React.FC<AnalysisItemProps> = ({
  client,
  type,
  period,
  progress,
  estimatedCompletion,
}) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium">{client}</h4>
          <p className="text-sm text-muted-foreground">{type} • Período: {period}</p>
        </div>
        <Button variant="outline" size="sm">Detalhes</Button>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Progresso da análise</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5 mr-1" />
          <span>Conclusão estimada: {estimatedCompletion}</span>
        </div>
      </div>
    </div>
  );
};

export default AnalysisItem;
