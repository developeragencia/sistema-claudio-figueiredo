
import React from 'react';
import IRRFHeaderTitle from './components/IRRFHeaderTitle';
import IRRFActionButtons from './components/IRRFActionButtons';
import NoClientSelectedAlert from './components/NoClientSelectedAlert';

interface IRRFHeaderProps {
  activeClient?: { name: string } | null;
  onNewRecovery: () => void;
  onImportData: () => void;
  onRunCalculation: () => void;
}

const IRRFHeader: React.FC<IRRFHeaderProps> = ({
  activeClient,
  onNewRecovery,
  onImportData,
  onRunCalculation
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <IRRFHeaderTitle />
        
        <IRRFActionButtons 
          onNewRecovery={onNewRecovery}
          onImportData={onImportData}
          onRunCalculation={onRunCalculation}
        />
      </div>
      
      {!activeClient && <NoClientSelectedAlert />}
    </>
  );
};

export default IRRFHeader;
