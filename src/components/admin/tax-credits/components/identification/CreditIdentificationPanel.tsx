
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useClientStore } from '@/hooks/useClientStore';
import { useActiveClient } from '@/hooks/useActiveClient';

import IdentificationHeader from './IdentificationHeader';
import AnalysisSettings from '../settings/AnalysisSettings';
import AnalysisProgressCard from '../analysis/AnalysisProgressCard';
import CreditStats from '../stats/CreditStats';
import CreditSearch from '../search/CreditSearch';
import CreditTabs from '../tabs/CreditTabs';
import NewCreditAnalysisModal from '../NewCreditAnalysisModal';
import IdentificationDialogs from './IdentificationDialogs';
import { useCreditIdentification } from './useCreditIdentification';

const CreditIdentificationPanel = () => {
  const [activeTab, setActiveTab] = useState('identification');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [isConfirmDialog, setIsConfirmDialog] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [exportFormat, setExportFormat] = useState('excel');
  const [selectedPeriod, setSelectedPeriod] = useState('60');
  const [advancedSettings, setAdvancedSettings] = useState({
    monthsToAnalyze: 60,
    includeCorrectionSelic: true,
    minimumCreditValue: 100,
    automaticallyApprove: false,
    applyRetentionRules: true,
    useHistoricalData: true,
    includeExemptSuppliers: false
  });
  
  const { activeClient } = useClientStore();
  const { activeClient: client, hasViewAccess, hasEditAccess } = useActiveClient();
  
  const { 
    MOCK_CREDITS,
    filteredCredits,
    handleStartAnalysis,
    handleAnalysisSubmit,
    handleQuickAnalysis,
    handleExportCredits,
    handleApproveCredit,
    handleRejectCredit,
    handleSaveSettings,
    totalIdentifiedCredits,
    approvedCredits,
    totalApprovedValue,
    exportFormat: hookExportFormat,
    setExportFormat: hookSetExportFormat
  } = useCreditIdentification({
    searchQuery,
    activeClient,
    setIsAnalyzing,
    setAnalysisProgress,
    setIsAnalysisModalOpen,
    setShowExportOptions,
    selectedPeriod,
    toast
  });

  return (
    <div className="space-y-6">
      <IdentificationHeader 
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        setShowExportOptions={setShowExportOptions}
        isAnalyzing={isAnalyzing}
        handleStartAnalysis={handleStartAnalysis}
        setIsConfirmDialog={setIsConfirmDialog}
      />

      {showSettings && (
        <AnalysisSettings 
          advancedSettings={advancedSettings}
          setAdvancedSettings={setAdvancedSettings}
          setShowSettings={setShowSettings}
          onSave={handleSaveSettings}
        />
      )}

      {isAnalyzing && (
        <AnalysisProgressCard 
          analysisProgress={analysisProgress}
          onCancel={() => setIsAnalyzing(false)}
        />
      )}

      <CreditStats 
        totalIdentifiedCredits={totalIdentifiedCredits}
        approvedCredits={approvedCredits}
        totalApprovedValue={totalApprovedValue}
        allCredits={MOCK_CREDITS}
      />

      <CreditSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <CreditTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredCredits={filteredCredits}
        onApprove={handleApproveCredit}
        onReject={handleRejectCredit}
      />

      <NewCreditAnalysisModal 
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        onSubmit={handleAnalysisSubmit}
      />

      <IdentificationDialogs
        isConfirmDialog={isConfirmDialog}
        setIsConfirmDialog={setIsConfirmDialog}
        handleQuickAnalysis={handleQuickAnalysis}
        showExportOptions={showExportOptions}
        setShowExportOptions={setShowExportOptions}
        exportFormat={hookExportFormat}
        setExportFormat={hookSetExportFormat}
        handleExportCredits={handleExportCredits}
        selectedPeriod={selectedPeriod}
      />
    </div>
  );
};

export default CreditIdentificationPanel;
