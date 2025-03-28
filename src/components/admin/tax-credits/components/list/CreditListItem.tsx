
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Building, Calendar, Percent, XCircle, CheckCircle } from "lucide-react";

interface CreditListItemProps {
  credit: {
    id: string;
    supplier: string;
    cnpj: string;
    paymentDate: string;
    paymentAmount: number;
    taxableAmount: number;
    retentionRate: number;
    retentionAmount: number;
    correctionAmount: number;
    totalCredit: number;
    identificationDate: string;
    status: string;
    category: string;
    rejectionReason?: string;
  };
  onApprove: (creditId: string) => void;
  onReject: (creditId: string) => void;
}

const CreditListItem: React.FC<CreditListItemProps> = ({
  credit,
  onApprove,
  onReject
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3 md:mb-0">
        <div className={`p-2 rounded-full ${
          credit.status === 'approved' ? "bg-green-500/10" : 
          credit.status === 'rejected' ? "bg-red-500/10" : 
          "bg-blue-500/10"
        }`}>
          <FileText className={`h-5 w-5 ${
            credit.status === 'approved' ? "text-green-600" : 
            credit.status === 'rejected' ? "text-red-600" : 
            "text-blue-600"
          }`} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{credit.id}</p>
            <Badge variant={
              credit.status === 'approved' ? "success" : 
              credit.status === 'rejected' ? "destructive" : 
              "info"
            }>
              {credit.status === 'approved' ? "Aprovado" : 
               credit.status === 'rejected' ? "Rejeitado" : 
               "Pendente"}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building className="h-3.5 w-3.5" />
            <span>{credit.supplier}</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
            <Calendar className="h-3.5 w-3.5" />
            <span>Pagamento: {credit.paymentDate}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end mr-2">
          <span className="text-sm font-medium">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(credit.totalCredit)}
          </span>
          <div className="flex items-center text-xs text-muted-foreground">
            <Percent className="h-3 w-3 mr-1" />
            <span>{credit.retentionRate}%</span>
          </div>
        </div>
        <div className="flex gap-1">
          {credit.status === 'pending' && (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 px-2"
                onClick={() => onReject(credit.id)}
              >
                <XCircle className="h-3.5 w-3.5 text-red-500" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 px-2"
                onClick={() => onApprove(credit.id)}
              >
                <CheckCircle className="h-3.5 w-3.5 text-green-500" />
              </Button>
            </>
          )}
          <Button variant="outline" size="sm">Detalhes</Button>
        </div>
      </div>
    </div>
  );
};

export default CreditListItem;
