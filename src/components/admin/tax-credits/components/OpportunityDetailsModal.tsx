
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronRight, FileSpreadsheet, Percent, Building, Clock, TrendingUp, FileText, Download, Share2 } from 'lucide-react';

interface OpportunityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: any;
  onStartRecovery?: (opportunityId: string) => void;
}

const OpportunityDetailsModal: React.FC<OpportunityDetailsModalProps> = ({
  isOpen,
  onClose,
  opportunity,
  onStartRecovery
}) => {
  if (!opportunity) return null;

  // Helper function to get the right color for the status badge
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponível':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Em análise':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Aprovado':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Recuperado':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Helper function to determine the confidence color
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const handleStartRecovery = () => {
    if (onStartRecovery) {
      onStartRecovery(opportunity.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalhes da Oportunidade</span>
            <Badge className={`${getStatusColor(opportunity.status)}`}>
              {opportunity.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Informações detalhadas sobre esta oportunidade de crédito
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div>
            <h3 className="text-lg font-semibold">{opportunity.title}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Building className="h-4 w-4 mr-1" />
              <span>{opportunity.client}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center">
                  <FileSpreadsheet className="h-3 w-3 mr-1" />
                  Valor Estimado
                </p>
                <p className="text-lg font-semibold">{opportunity.value}</p>
              </div>
            </Card>
            <Card className="p-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center">
                  <Percent className="h-3 w-3 mr-1" />
                  Confiabilidade
                </p>
                <p className={`text-lg font-semibold ${getConfidenceColor(opportunity.confidence)}`}>
                  {opportunity.confidence}%
                </p>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Data de Identificação
                </p>
                <p className="text-base">{opportunity.date}</p>
              </div>
            </Card>
            <Card className="p-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Prazo para Recuperação
                </p>
                <p className="text-base">5 anos</p>
              </div>
            </Card>
          </div>

          <Card className="p-4">
            <h4 className="text-sm font-medium mb-2">Descrição</h4>
            <p className="text-sm text-muted-foreground">
              Esta oportunidade de crédito foi identificada com base na análise de documentos fiscais 
              e operações da empresa. A análise sugere possibilidade de recuperação com alta confiabilidade.
            </p>
          </Card>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <div className="flex gap-2 sm:mr-auto">
            <Button variant="outline" size="sm" className="gap-1">
              <FileText className="h-4 w-4" />
              <span>Relatório</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              <span>Baixar</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              <span>Compartilhar</span>
            </Button>
          </div>
          
          {opportunity.status === 'Disponível' && (
            <Button onClick={handleStartRecovery} className="gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>Iniciar Recuperação</span>
            </Button>
          )}
          {opportunity.status !== 'Disponível' && (
            <Button variant="default" onClick={onClose}>
              <ChevronRight className="h-4 w-4 ml-1" />
              <span>Fechar</span>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OpportunityDetailsModal;
