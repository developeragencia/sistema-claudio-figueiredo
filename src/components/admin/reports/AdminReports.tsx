
import React from 'react';
import ReportsHeader from './components/ReportsHeader';
import ReportsTabs from './components/ReportsTabs';
import GenerateReportDialog from './components/GenerateReportDialog';
import { useReportsStore } from './hooks/useReportsStore';

const AdminReports = () => {
  const { 
    isGenerateReportOpen,
    setIsGenerateReportOpen
  } = useReportsStore();

  return (
    <div className="space-y-6">
      <ReportsHeader 
        onGenerateReportClick={() => setIsGenerateReportOpen(true)} 
      />
      
      <ReportsTabs />
      
      <GenerateReportDialog 
        open={isGenerateReportOpen} 
        onOpenChange={setIsGenerateReportOpen} 
      />
    </div>
  );
};

export default AdminReports;
