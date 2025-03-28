
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const NoClientSelectedAlert = () => {
  return (
    <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800 dark:text-amber-400">Cliente não selecionado</h3>
            <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
              Selecione um cliente ativo na barra superior para vincular as ações neste módulo.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoClientSelectedAlert;
