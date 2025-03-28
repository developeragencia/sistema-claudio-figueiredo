
import { useState, useMemo } from 'react';
import { TaxCredit } from '@/types/tax-credits';

export const useTaxCreditFilters = (credits: TaxCredit[]) => {
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Filtered credits based on search and filters
  const filteredCredits = useMemo(() => {
    return credits.filter(credit => {
      // Search filter
      const searchTerms = searchQuery.toLowerCase();
      const matchesSearch = 
        credit.clientName.toLowerCase().includes(searchTerms) ||
        credit.documentNumber.toLowerCase().includes(searchTerms) ||
        credit.creditType.toLowerCase().includes(searchTerms);
      
      // Map filter values to the corresponding status values used in the TaxCredit type
      const statusMap: Record<string, string> = {
        'all': '',
        'pending': 'PENDING',
        'approved': 'APPROVED',
        'rejected': 'REJECTED',
        'analyzing': 'ANALYZING',
        'recovered': 'RECOVERED'
      };
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || credit.status === statusMap[statusFilter];
      
      // Type filter
      const matchesType = typeFilter === 'all' || credit.creditType === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [credits, searchQuery, statusFilter, typeFilter]);

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    filteredCredits
  };
};
