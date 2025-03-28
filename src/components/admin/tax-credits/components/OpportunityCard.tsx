
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronRight, FileSpreadsheet, Percent, TrendingUp } from 'lucide-react';

interface OpportunityCardProps {
  id: string;
  title: string;
  client: string;
  value: string;
  confidence: number;
  date: string;
  status: 'Disponível' | 'Em análise' | 'Aprovado' | 'Recuperado';
  onClick?: () => void;
  onViewDetails?: () => void;
  onStartRecovery?: () => void;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({
  id,
  title,
  client,
  value,
  confidence,
  date,
  status,
  onClick,
  onViewDetails,
  onStartRecovery
}) => {
  // Helper function to get the right color for the status badge
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponível':
        return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
      case 'Em análise':
        return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200';
      case 'Aprovado':
        return 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200';
      case 'Recuperado':
        return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
    }
  };

  // Helper function to determine the confidence color
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <Card 
      className="hover:shadow-md transition-all duration-200 cursor-pointer group border-2 hover:border-primary/20"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <Badge className={`${getStatusColor(status)}`}>
            {status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{client}</p>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center">
              <FileSpreadsheet className="h-3 w-3 mr-1" />
              Valor Estimado
            </p>
            <p className="text-lg font-semibold">{value}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center">
              <Percent className="h-3 w-3 mr-1" />
              Confiabilidade
            </p>
            <p className={`text-lg font-semibold ${getConfidenceColor(confidence)}`}>
              {confidence}%
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Identificado em: {date}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary hover:text-primary/80"
          onClick={(e) => {
            e.stopPropagation();
            if (onViewDetails) onViewDetails();
          }}
        >
          Ver detalhes
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
        {status === 'Disponível' && (
          <Button 
            variant="outline" 
            size="sm" 
            className="border-green-200 text-green-700 hover:bg-green-50"
            onClick={(e) => {
              e.stopPropagation();
              if (onStartRecovery) onStartRecovery();
            }}
          >
            <TrendingUp className="h-3 w-3 mr-1" />
            Iniciar Recuperação
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default OpportunityCard;
