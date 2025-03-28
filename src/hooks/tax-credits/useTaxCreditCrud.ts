
import { useState, useCallback, useEffect } from 'react';
import { TaxCredit } from '@/types/tax-credits';
import { fetchTaxCredits } from './fetchTaxCredits';
import { createTaxCredit } from './createTaxCredit';
import { updateTaxCredit } from './updateTaxCredit';
import { deleteTaxCredit } from './deleteTaxCredit';
import { changeTaxCreditStatus } from './changeTaxCreditStatus';

export const useTaxCreditCrud = (initialCredits: TaxCredit[] = []) => {
  const [credits, setCredits] = useState<TaxCredit[]>(initialCredits);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Load credits from Supabase on initial render
  useEffect(() => {
    const loadCredits = async () => {
      setIsLoading(true);
      try {
        const fetchedCredits = await fetchTaxCredits();
        if (fetchedCredits.length > 0) {
          console.log('Loaded credits from database:', fetchedCredits.length);
          setCredits(fetchedCredits);
        }
      } catch (error) {
        console.error('Error loading credits:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCredits();
  }, []);

  // Create a new credit
  const handleCreateCredit = useCallback(async (creditData: Partial<TaxCredit>) => {
    console.log('Creating credit with data:', creditData);
    const savedCredit = await createTaxCredit(creditData);
    
    // Update local state with the saved data
    setCredits(prevCredits => {
      const updatedCredits = [...prevCredits, savedCredit];
      console.log('Updated credits after creation:', updatedCredits.length);
      return updatedCredits;
    });
    
    return savedCredit;
  }, []);

  // Update an existing credit
  const handleUpdateCredit = useCallback(async (creditId: string, creditData: Partial<TaxCredit>) => {
    console.log('Updating credit:', creditId, creditData);
    const success = await updateTaxCredit(creditId, creditData);
    
    if (success) {
      // Update local state
      setCredits(prevCredits => {
        const updatedCredits = prevCredits.map(credit => 
          credit.id === creditId 
            ? { 
                ...credit, 
                ...creditData,
                // Ensure status is lowercase if provided
                status: creditData.status 
                  ? creditData.status.toLowerCase() as TaxCredit['status']
                  : credit.status,
                updatedAt: new Date().toISOString() 
              }
            : credit
        );
        console.log('Updated credits after update:', updatedCredits.length);
        return updatedCredits;
      });
    }
    
    return success;
  }, []);

  // Delete a credit
  const handleDeleteCredit = useCallback(async (creditId: string) => {
    console.log('Deleting credit with ID:', creditId);
    const success = await deleteTaxCredit(creditId);
    
    if (success) {
      // Update local state
      setCredits(prevCredits => {
        const filteredCredits = prevCredits.filter(credit => credit.id !== creditId);
        console.log('Remaining credits after deletion:', filteredCredits.length);
        return filteredCredits;
      });
    }
    
    return success;
  }, []);

  // Change the status of a credit
  const handleChangeStatus = useCallback(async (creditId: string, newStatus: string, notes: string) => {
    console.log('Changing status for credit ID:', creditId, 'to', newStatus);
    // First get the current credit to append notes
    const currentCredit = credits.find(c => c.id === creditId);
    if (!currentCredit) {
      console.error('Cannot change status: credit not found with ID', creditId);
      return false;
    }
    
    const success = await changeTaxCreditStatus(
      creditId, 
      newStatus, 
      notes, 
      currentCredit?.notes
    );
    
    if (success) {
      // Update local state
      setCredits(prevCredits => {
        const datePrefix = new Date().toLocaleString('pt-BR');
        const statusNote = `[${datePrefix} - Status alterado para ${newStatus}] ${notes}`;
        
        const updatedCredits = prevCredits.map(credit => 
          credit.id === creditId 
            ? { 
                ...credit, 
                status: newStatus.toLowerCase() as TaxCredit['status'],
                notes: notes ? (credit.notes ? `${credit.notes}\n\n${statusNote}` : statusNote) : credit.notes,
                updatedAt: new Date().toISOString(),
                // Set approvedAt if status is approved
                approvedAt: newStatus.toLowerCase() === 'approved' ? new Date().toISOString() : credit.approvedAt
              }
            : credit
        );
        console.log('Credits after status change:', updatedCredits.length);
        return updatedCredits;
      });
    }
    
    return success;
  }, [credits]);

  // Refresh/reload credits from database
  const refreshCredits = useCallback(async () => {
    setIsLoading(true);
    try {
      const freshCredits = await fetchTaxCredits();
      setCredits(freshCredits);
      console.log('Refreshed credits from database:', freshCredits.length);
      return freshCredits;
    } catch (error) {
      console.error('Error refreshing credits:', error);
      return credits;
    } finally {
      setIsLoading(false);
    }
  }, [credits]);

  return {
    credits,
    setCredits,
    isLoading,
    createCredit: handleCreateCredit,
    updateCredit: handleUpdateCredit,
    deleteCredit: handleDeleteCredit,
    changeStatus: handleChangeStatus,
    refreshCredits
  };
};
