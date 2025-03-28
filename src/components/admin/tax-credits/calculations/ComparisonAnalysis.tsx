
import React from 'react';
import SummaryCards from './comparison-analysis/SummaryCards';
import ComparisonFilters from './comparison-analysis/ComparisonFilters';
import ComparisonTable from './comparison-analysis/ComparisonTable';
import { useComparisonAnalysis } from './comparison-analysis/useComparisonAnalysis';
import { ComparisonStatus } from './comparison-analysis/types';

const ComparisonAnalysis: React.FC = () => {
  const {
    data,
    filteredData,
    filter,
    setFilter,
    totalRecoverable,
    totalDivergent,
  } = useComparisonAnalysis();

  const handleFilterChange = (newFilter: ComparisonStatus | null) => {
    setFilter(newFilter);
  };

  return (
    <div className="space-y-6">
      <SummaryCards 
        totalRecoverable={totalRecoverable}
        totalDivergent={totalDivergent}
        totalItems={data.length}
      />
      
      <ComparisonFilters 
        filter={filter}
        onFilterChange={handleFilterChange}
      />
      
      <ComparisonTable data={filteredData} />
    </div>
  );
};

export default ComparisonAnalysis;
