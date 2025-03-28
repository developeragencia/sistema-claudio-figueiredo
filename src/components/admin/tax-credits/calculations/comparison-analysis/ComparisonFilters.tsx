
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { ComparisonStatus } from './types';

interface ComparisonFiltersProps {
  filter: ComparisonStatus | null;
  onFilterChange: (filter: ComparisonStatus | null) => void;
}

const ComparisonFilters: React.FC<ComparisonFiltersProps> = ({
  filter,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h3 className="text-lg font-medium">Comparação de Valores Retidos vs. Devidos</h3>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={filter === null ? "default" : "outline"} 
          size="sm" 
          onClick={() => onFilterChange(null)}
        >
          Todos
        </Button>
        <Button 
          variant={filter === 'recuperável' ? "default" : "outline"} 
          size="sm" 
          onClick={() => onFilterChange('recuperável')}
        >
          Recuperáveis
        </Button>
        <Button 
          variant={filter === 'divergente' ? "default" : "outline"} 
          size="sm" 
          onClick={() => onFilterChange('divergente')}
        >
          Divergentes
        </Button>
        <Button 
          variant={filter === 'correto' ? "default" : "outline"} 
          size="sm" 
          onClick={() => onFilterChange('correto')}
        >
          Corretos
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" />
          Exportar
        </Button>
      </div>
    </div>
  );
};

export default ComparisonFilters;
