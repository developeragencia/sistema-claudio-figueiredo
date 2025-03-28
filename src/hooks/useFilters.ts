import { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';

interface UseFiltersOptions {
  initialFilters?: Record<string, string>;
  onFiltersChange?: (filters: Record<string, string>) => void;
  debounceMs?: number;
}

export function useFilters({
  initialFilters = {},
  onFiltersChange,
  debounceMs = 300,
}: UseFiltersOptions = {}) {
  const [filters, setFilters] = useState<Record<string, string>>(initialFilters);
  const [search, setSearch] = useState('');

  // Debounce search changes
  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setFilters(prev => ({ ...prev, search: value }));
    }, debounceMs),
    []
  );

  // Handle search input change
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    debouncedSetSearch(value);
  }, [debouncedSetSearch]);

  // Handle filter change
  const handleFilterChange = useCallback((filterId: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterId]: value }));
  }, []);

  // Notify parent component when filters change
  useEffect(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  return {
    filters,
    search,
    handleSearchChange,
    handleFilterChange,
    setFilters,
  };
} 