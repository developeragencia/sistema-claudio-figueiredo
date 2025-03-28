
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useTaxCreditManagement } from '@/hooks/tax-credits/useTaxCreditManagement';
import { TaxCredit } from '@/types/tax-credits';

// Components
import CreditHeader from './components/CreditHeader';
import CreditFilters from './components/CreditFilters';
import CreditTable from './components/CreditTable';
import SummaryCards from './components/SummaryCards';
import TaxCreditForm from './forms/TaxCreditForm';
import DeleteConfirmDialog from './components/DeleteConfirmDialog';
import StatusChangeDialog from './components/StatusChangeDialog';
import CreditDetailDialog from './components/CreditDetailDialog';

const TaxCreditManagement: React.FC = () => {
  const {
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
    isListening,
    
    // UI action handlers
    handleRefresh,
    handleCreateCredit: initCreateCredit,
    handleViewDetails,
    handleExportData,
    
    // CRUD operations
    createCredit,
    updateCredit,
    deleteCredit,
    changeStatus,
  } = useTaxCreditManagement();

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState<TaxCredit | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Handle creating a new credit
  const handleCreateCredit = () => {
    setSelectedCredit(null);
    setIsEditMode(false);
    setIsFormOpen(true);
  };

  // Handle editing a credit
  const handleEditCredit = (credit: TaxCredit) => {
    console.log("Editing credit:", credit);
    setSelectedCredit(credit);
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  // Handle deleting a credit
  const handleDeleteCredit = (credit: TaxCredit) => {
    console.log("Preparing to delete credit:", credit);
    setSelectedCredit(credit);
    setIsDeleteDialogOpen(true);
  };

  // Handle confirming credit deletion
  const handleConfirmDelete = (creditId: string) => {
    console.log("Confirming delete for credit ID:", creditId);
    deleteCredit(creditId);
    setIsDeleteDialogOpen(false);
  };

  // Handle changing credit status
  const handleStatusChange = (credit: TaxCredit) => {
    console.log("Preparing to change status for credit:", credit);
    setSelectedCredit(credit);
    setIsStatusDialogOpen(true);
  };

  // Handle confirming status change
  const handleConfirmStatusChange = (newStatus: string, notes: string) => {
    if (selectedCredit) {
      console.log("Changing status to", newStatus, "for credit ID:", selectedCredit.id);
      changeStatus(selectedCredit.id, newStatus, notes);
      setIsStatusDialogOpen(false);
    }
  };

  // Handle view credit details
  const handleViewCreditDetails = (creditId: string) => {
    const credit = filteredCredits.find(c => c.id === creditId);
    if (credit) {
      console.log("Viewing details for credit:", credit);
      setSelectedCredit(credit);
      setIsDetailDialogOpen(true);
    }
  };

  // Handle saving credit form
  const handleSaveCredit = (data: any) => {
    // Convert string creditAmount to number if needed
    const processedData = {
      ...data,
      creditAmount: typeof data.creditAmount === 'string' 
        ? parseFloat(data.creditAmount) 
        : data.creditAmount
    };
    
    console.log("Saving credit data:", processedData, "Edit mode:", isEditMode);
    
    if (isEditMode && selectedCredit) {
      updateCredit(selectedCredit.id, processedData);
    } else {
      createCredit(processedData);
    }
    
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <SummaryCards summary={summary} />
      
      {/* Header */}
      <CreditHeader
        onRefresh={handleRefresh}
        onCreateCredit={handleCreateCredit}
        onExport={handleExportData}
        isListening={isListening}
      />
      
      {/* Filters */}
      <CreditFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        onExportData={handleExportData}
      />
      
      {/* Credits Table */}
      <Card>
        <CreditTable
          credits={filteredCredits}
          isLoading={isLoading}
          onViewDetails={handleViewCreditDetails}
          onEdit={handleEditCredit}
          onDelete={handleDeleteCredit}
          onStatusChange={handleStatusChange}
        />
      </Card>
      
      {/* Dialogs and Forms */}
      <TaxCreditForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveCredit}
        initialData={selectedCredit}
        isEdit={isEditMode}
      />
      
      {selectedCredit && (
        <>
          <DeleteConfirmDialog
            open={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            credit={selectedCredit}
            onConfirm={handleConfirmDelete}
          />
          
          <StatusChangeDialog
            open={isStatusDialogOpen}
            onClose={() => setIsStatusDialogOpen(false)}
            credit={selectedCredit}
            onConfirm={handleConfirmStatusChange}
          />
          
          {isDetailDialogOpen && (
            <CreditDetailDialog
              credit={selectedCredit}
              open={isDetailDialogOpen}
              onClose={() => setIsDetailDialogOpen(false)}
              onEdit={() => {
                setIsDetailDialogOpen(false);
                handleEditCredit(selectedCredit);
              }}
              onDelete={() => {
                setIsDetailDialogOpen(false);
                handleDeleteCredit(selectedCredit);
              }}
              onStatusChange={() => {
                setIsDetailDialogOpen(false);
                handleStatusChange(selectedCredit);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TaxCreditManagement;
