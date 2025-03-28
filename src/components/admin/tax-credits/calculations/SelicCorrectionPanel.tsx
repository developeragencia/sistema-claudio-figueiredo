
import React from 'react';
import SelicRatesCard from './selic-correction/SelicRatesCard';
import CorrectionCalculatorCard from './selic-correction/CorrectionCalculatorCard';
import CorrectionHistoryTable from './selic-correction/CorrectionHistoryTable';
import { useSelicCorrection } from './selic-correction/useSelicCorrection';

const SelicCorrectionPanel: React.FC = () => {
  const {
    selicRates,
    corrections,
    loadingRates,
    creditValue,
    setCreditValue,
    creditDate,
    setCreditDate,
    currentSelicRate,
    refreshSelicRates,
    calculateCorrection,
    handleExportHistory,
  } = useSelicCorrection();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SelicRatesCard
          selicRates={selicRates}
          currentSelicRate={currentSelicRate}
          loadingRates={loadingRates}
          onRefreshRates={refreshSelicRates}
        />
        
        <CorrectionCalculatorCard
          creditValue={creditValue}
          setCreditValue={setCreditValue}
          creditDate={creditDate}
          setCreditDate={setCreditDate}
          calculateCorrection={calculateCorrection}
          corrections={corrections.slice(0, 3)} // Show only the most recent corrections
          onExportHistory={handleExportHistory}
        />
      </div>
      
      <CorrectionHistoryTable
        corrections={corrections}
        onExport={handleExportHistory}
      />
    </div>
  );
};

export default SelicCorrectionPanel;
