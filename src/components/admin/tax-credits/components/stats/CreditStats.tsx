
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CreditStatsProps {
  totalIdentifiedCredits: number;
  approvedCredits: Array<any>;
  totalApprovedValue: number;
  allCredits: Array<any>;
}

const CreditStats: React.FC<CreditStatsProps> = ({ 
  totalIdentifiedCredits, 
  approvedCredits, 
  totalApprovedValue,
  allCredits
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <CardTitle className="text-sm font-medium">Total Identificado</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalIdentifiedCredits)}
          </div>
          <div className="text-xs text-muted-foreground">Valor total identificado</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalApprovedValue)}
          </div>
          <div className="text-xs text-muted-foreground">{approvedCredits.length} créditos aprovados</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
            <CardTitle className="text-sm font-medium">Média por Crédito</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              allCredits.length > 0 ? totalIdentifiedCredits / allCredits.length : 0
            )}
          </div>
          <div className="text-xs text-muted-foreground">Valor médio por crédito</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditStats;
