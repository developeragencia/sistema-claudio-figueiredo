import React from 'react';
import { useNavigate  } from "@/hooks/use-router";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { CardProps, CardContentProps, ButtonProps } from '@/types/components';

const CreditNotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto p-4 sm:p-6 flex items-center justify-center min-h-[400px]">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Crédito não encontrado</h2>
            <p className="text-muted-foreground mb-4">
              O crédito que você está procurando não existe ou foi removido.
            </p>
            <Button 
              onClick={() => navigate('/admin')}
              aria-label="Voltar para Dashboard"
              variant="default"
            >
              Voltar para Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditNotFound;
