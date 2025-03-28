
import { useEffect, useState } from 'react';
import { mockCredits } from './mockData';
import { useTaxCreditFilters } from './useTaxCreditFilters';
import { useTaxCreditSummary } from './useTaxCreditSummary';
import { useTaxCreditCrud } from './useTaxCreditCrud';
import { useTaxCreditActions } from './useTaxCreditActions';
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';
import { toast } from 'sonner';
import { TaxCredit } from '@/types/tax-credits';

export const useTaxCreditManagement = () => {
  // Initialize CRUD operations with empty array (will be populated from Supabase)
  const { 
    credits, 
    setCredits, 
    createCredit, 
    updateCredit, 
    deleteCredit, 
    changeStatus 
  } = useTaxCreditCrud([]);
  
  // Initialize UI actions
  const { 
    isLoading, 
    setIsLoading, 
    isListening, 
    startListening, 
    stopListening, 
    handleRefresh, 
    handleCreateCredit, 
    handleViewDetails, 
    handleExportData 
  } = useTaxCreditActions();
  
  // Initialize filters
  const { 
    searchQuery, 
    setSearchQuery, 
    statusFilter, 
    setStatusFilter, 
    typeFilter, 
    setTypeFilter, 
    filteredCredits 
  } = useTaxCreditFilters(credits);
  
  // Calculate summary
  const summary = useTaxCreditSummary(credits);
  
  // Set up realtime updates
  const { isListening: isRealtimeListening } = useRealtimeUpdates({
    tableName: 'tax_credits',
    onInsert: (newCredit) => {
      console.log('Realtime: Tax credit added', newCredit);
      setCredits(prev => [...prev, newCredit as TaxCredit]);
      toast.success('Novo crédito adicionado', {
        description: 'Um novo crédito tributário foi adicionado',
      });
    },
    onUpdate: (updatedCredit) => {
      console.log('Realtime: Tax credit updated', updatedCredit);
      setCredits(prev => prev.map(credit => 
        credit.id === (updatedCredit as TaxCredit).id ? (updatedCredit as TaxCredit) : credit
      ));
      toast.info('Crédito atualizado', {
        description: 'Um crédito tributário foi atualizado',
      });
    },
    onDelete: (deletedCredit) => {
      console.log('Realtime: Tax credit deleted', deletedCredit);
      setCredits(prev => prev.filter(credit => credit.id !== (deletedCredit as TaxCredit).id));
      toast.info('Crédito removido', {
        description: 'Um crédito tributário foi removido',
      });
    },
    showToasts: false, // We'll handle our own toasts
  });
  
  // Track if realtime is active
  useEffect(() => {
    if (isRealtimeListening) {
      console.log('Started listening to tax credits changes');
    } else {
      console.log('Stopped listening to tax credits changes');
    }
  }, [isRealtimeListening]);

  // Return all needed values and functions
  return {
    // State and filters
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    filteredCredits,
    summary,
    isLoading,
    isListening: isRealtimeListening,
    
    // UI action handlers
    handleRefresh,
    handleCreateCredit,
    handleViewDetails,
    handleExportData,
    
    // CRUD operations
    createCredit,
    updateCredit,
    deleteCredit,
    changeStatus,
  };
};
