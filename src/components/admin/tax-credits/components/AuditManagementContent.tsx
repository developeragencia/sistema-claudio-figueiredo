
import React from 'react';
import { Card } from '@/components/ui/card';
import AuditStatusCards from './AuditStatusCards';
import AuditHeader from './AuditHeader';
import AuditFilters from './AuditFilters';
import AuditTable from './AuditTable';
import AuditForm from './AuditForm';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';
import useAuditManagement from '@/hooks/useAuditManagement';
import { Audit, AuditSummary } from '@/types/audit';

const AuditManagementContent: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    filteredAudits,
    summary,
    isLoading,
    isListening,
    isFormOpen,
    setIsFormOpen,
    currentAudit,
    isEditMode,
    handleRefresh,
    handleCreateAudit,
    handleSaveAudit,
    onViewDetails,
    onDownloadDocuments,
    onEdit,
    onDelete,
    onApprove
  } = useAuditManagement();

  const { classes: cardClasses } = useAnimationOnScroll<HTMLDivElement>({
    threshold: 0.1,
    transitionType: 'fade-in',
  });

  // Create a complete summary object that satisfies the AuditSummary type
  const completeSummary: AuditSummary = {
    ...summary,
    totalAudits: summary.total,
    pendingAudits: summary.pending,
    completedAudits: summary.approved,
    inProgressAudits: summary.inProgress,
    emAndamento: summary.inProgress,
    pendentes: summary.pending,
    concluidas: summary.approved
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <AuditHeader 
        onRefresh={handleRefresh} 
        onCreateAudit={handleCreateAudit}
        isListening={isListening}
      />

      {/* Status Cards */}
      {summary && (
        <AuditStatusCards 
          summary={completeSummary} 
          className={cardClasses}
        />
      )}

      {/* Filters */}
      <AuditFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      {/* Audits Table */}
      <Card>
        <AuditTable 
          audits={filteredAudits} 
          isLoading={isLoading} 
          onViewDetails={onViewDetails}
          onDownloadDocuments={onDownloadDocuments}
          onEdit={onEdit}
          onDelete={onDelete}
          onApprove={onApprove}
        />
      </Card>

      {/* Audit Form Dialog */}
      <AuditForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveAudit}
        initialData={currentAudit}
        isEdit={isEditMode}
      />
    </div>
  );
};

export default AuditManagementContent;
