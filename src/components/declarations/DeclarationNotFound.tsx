
import React from 'react';
import { useNavigate  } from "@/hooks/use-router";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DeclarationNotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto p-4 sm:p-6 flex items-center justify-center">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Declaração não encontrada</h2>
            <p className="text-muted-foreground mb-4">A declaração que você está procurando não existe ou foi removida.</p>
            <Button onClick={() => navigate('/declarations')}>
              Voltar para Declarações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeclarationNotFound;
