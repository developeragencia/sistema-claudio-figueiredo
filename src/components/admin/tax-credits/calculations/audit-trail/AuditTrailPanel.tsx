
import React from 'react';
import AuditFilters from './components/AuditFilters';
import AuditTable from './components/AuditTable';
import { Card } from '@/components/ui/card';
import { useAuditTrail } from './useAuditTrail';

const AuditTrailPanel: React.FC = () => {
  const {
    auditLogs,
    filteredLogs,
    searchQuery,
    setSearchQuery,
    userFilter,
    setUserFilter,
    actionFilter,
    setActionFilter,
    dateFilter,
    setDateFilter,
    isLoading,
    exportAuditLogs,
  } = useAuditTrail();

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <AuditFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          userFilter={userFilter}
          setUserFilter={setUserFilter}
          actionFilter={actionFilter}
          setActionFilter={setActionFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          onExport={exportAuditLogs}
        />
      </Card>

      <AuditTable logs={filteredLogs} isLoading={isLoading} />
    </div>
  );
};

export default AuditTrailPanel;
