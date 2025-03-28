
import React from 'react';
import ReportsHeader from './components/ReportsHeader';
import TabsContainer from './components/TabsContainer';
import { TabsContent } from "@/components/ui/tabs";
import ReportConfigForm from './components/ReportConfigForm';
import RecentReportsList from './components/RecentReportsList';
import FilterSidebar from './components/FilterSidebar';
import ReportsTable from './components/ReportsTable';
import { useReportGeneration } from './hooks/useReportGeneration';

const DetailedReportsPanel: React.FC = () => {
  const {
    reportPeriod,
    setReportPeriod,
    reportType,
    setReportType,
    isGenerating,
    activeTab,
    setActiveTab,
    filterSidebarOpen,
    setFilterSidebarOpen,
    reports,
    handleGenerateReport,
    handleExportReport,
    handleClearFilters,
    handleViewReport,
    handleDownloadReport
  } = useReportGeneration();

  const handleFilterClick = () => {
    setFilterSidebarOpen(true);
  };

  const handleRefresh = () => {
    // Implement refresh functionality here
    console.log("Refreshing data...");
  };

  // Fiscal tab content
  const fiscalContent = (
    <TabsContent value="fiscal" className="space-y-4 pt-4">
      <ReportConfigForm
        reportPeriod={reportPeriod}
        setReportPeriod={setReportPeriod}
        reportType={reportType}
        setReportType={setReportType}
        isGenerating={isGenerating}
        onGenerateReport={handleGenerateReport}
        onClearFilters={handleClearFilters}
      />
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Relatórios Gerados</h3>
        <ReportsTable 
          reports={reports}
          onView={handleViewReport}
          onDownload={handleDownloadReport}
        />
      </div>
      
      <RecentReportsList />
    </TabsContent>
  );

  return (
    <div className="space-y-6">
      <ReportsHeader 
        onExport={handleExportReport}
        onFilter={handleFilterClick}
        onGenerateReport={handleGenerateReport}
        onRefresh={handleRefresh}
      />
      
      <TabsContainer activeTab={activeTab} setActiveTab={setActiveTab}>
        {fiscalContent}
      </TabsContainer>
      
      <FilterSidebar 
        isVisible={filterSidebarOpen}
        onClose={() => setFilterSidebarOpen(false)}
        onClearFilters={handleClearFilters}
      />
    </div>
  );
};

export default DetailedReportsPanel;
