
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

const FilterButton = () => {
  return (
    <Button variant="outline" size="sm">
      <Filter className="h-4 w-4 mr-2" />
      Filtrar
    </Button>
  );
};

export default FilterButton;
