
import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CreditSearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNewAnalysis: () => void;
}

const CreditSearchFilters: React.FC<CreditSearchFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  onNewAnalysis
}) => {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
      <div className="relative flex-1 md:max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar oportunidades por cliente ou tributo..."
          className="w-full bg-background pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button variant="outline" className="flex items-center justify-between">
        <span>Filtrar por tributo</span>
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
      <Button variant="outline" className="flex items-center justify-between">
        <span>Período</span>
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
      <Button variant="outline" className="flex items-center justify-between">
        <span>Status</span>
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
      <Button onClick={onNewAnalysis}>Nova Análise</Button>
    </div>
  );
};

export default CreditSearchFilters;
