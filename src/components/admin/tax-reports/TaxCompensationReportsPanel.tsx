
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { useTaxCompensation } from './hooks/useTaxCompensation';
import SimulationTab from './components/SimulationTab';
import PerDcompTab from './components/PerDcompTab';
import JudicialDecisionsTab from './components/JudicialDecisionsTab';
import TabsContainer from './components/TabsContainer';

const TaxCompensationReportsPanel: React.FC = () => {
  const {
    creditValue,
    setCreditValue,
    simulationDate,
    setSimulationDate,
    includeSelicCorrection,
    setIncludeSelicCorrection,
    reportType,
    setReportType,
    activeTab,
    setActiveTab,
    isGenerating,
    isCalendarOpen,
    setIsCalendarOpen,
    simulationHistory,
    handleGenerate,
    handleExport,
    handleSimulateSelic,
    handleValueChange
  } = useTaxCompensation();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <TabsContainer activeTab={activeTab} setActiveTab={setActiveTab}>
            {activeTab === 'simulation' && (
              <SimulationTab 
                creditValue={creditValue}
                simulationDate={simulationDate}
                includeSelicCorrection={includeSelicCorrection}
                reportType={reportType}
                isGenerating={isGenerating}
                isCalendarOpen={isCalendarOpen}
                simulationHistory={simulationHistory}
                setIsCalendarOpen={setIsCalendarOpen}
                handleValueChange={handleValueChange}
                setSimulationDate={setSimulationDate}
                setIncludeSelicCorrection={setIncludeSelicCorrection}
                setReportType={setReportType}
                handleSimulateSelic={handleSimulateSelic}
                handleGenerate={handleGenerate}
              />
            )}
            
            {activeTab === 'per_dcomp' && (
              <PerDcompTab 
                isGenerating={isGenerating}
                handleGenerate={handleGenerate}
                handleExport={handleExport}
              />
            )}
            
            {activeTab === 'judicial' && (
              <JudicialDecisionsTab 
                isGenerating={isGenerating}
                handleGenerate={handleGenerate}
                handleExport={handleExport}
              />
            )}
          </TabsContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxCompensationReportsPanel;
