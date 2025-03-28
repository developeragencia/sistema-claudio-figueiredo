
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { AlertCircle, Download } from "lucide-react";
import CreditListItem from './CreditListItem';

interface CreditListProps {
  title: string;
  description: string;
  credits: Array<any>;
  emptyMessage: {
    title: string;
    description: string;
  };
  onApprove: (creditId: string) => void;
  onReject: (creditId: string) => void;
  showExport?: boolean;
}

const CreditList: React.FC<CreditListProps> = ({
  title,
  description,
  credits,
  emptyMessage,
  onApprove,
  onReject,
  showExport = false
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          {showExport && (
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          )}
        </div>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {credits.length > 0 ? (
            credits.map((credit) => (
              <CreditListItem 
                key={credit.id} 
                credit={credit} 
                onApprove={onApprove} 
                onReject={onReject} 
              />
            ))
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">{emptyMessage.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {emptyMessage.description}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      {credits.length > 5 && (
        <CardFooter className="flex justify-center">
          <Button variant="outline">Ver Mais</Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default CreditList;
