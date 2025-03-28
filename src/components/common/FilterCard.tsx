import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface FilterOption {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

interface FilterCardProps {
  title: string;
  description: string;
  searchPlaceholder: string;
  filters: FilterOption[];
  onSearchChange: (value: string) => void;
  onFilterChange: (filterId: string, value: string) => void;
}

export function FilterCard({
  title,
  description,
  searchPlaceholder,
  filters,
  onSearchChange,
  onFilterChange,
}: FilterCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="search">Buscar</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder={searchPlaceholder}
                className="pl-8"
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
          {filters.map((filter) => (
            <div key={filter.id} className="space-y-2">
              <Label htmlFor={filter.id}>{filter.label}</Label>
              <select
                id={filter.id}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                onChange={(e) => onFilterChange(filter.id, e.target.value)}
              >
                <option value="">Todos</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 