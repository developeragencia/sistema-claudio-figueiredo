
import { useState } from 'react';
import { ComparisonItem, ComparisonStatus } from './types';
import { mockData } from './mock-data';

export function useComparisonAnalysis() {
  const [data, setData] = useState<ComparisonItem[]>(mockData);
  const [filter, setFilter] = useState<ComparisonStatus | null>(null);

  const filteredData = filter ? data.filter(item => item.status === filter) : data;

  const totalRecoverable = data
    .filter(item => item.status === 'recuperável')
    .reduce((acc, item) => acc + item.difference, 0);

  const totalDivergent = data
    .filter(item => item.status === 'divergente')
    .reduce((acc, item) => acc + Math.abs(item.difference), 0);

  return {
    data,
    filteredData,
    filter,
    setFilter,
    totalRecoverable,
    totalDivergent,
  };
}
