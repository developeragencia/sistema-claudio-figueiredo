import { useState } from 'react';
import { reportsApi } from '@/lib/api/reports';

interface ReportsParams {
  type: string;
  start_date: string;
  end_date: string;
}

interface ReportItem {
  id: string;
  name?: string;
  email?: string;
  document?: string;
  proposals_count?: number;
  contracts_count?: number;
  total_value?: number;
  title?: string;
  client?: {
    id: string;
    name: string;
    email: string;
  };
  value?: number;
  status?: string;
  created_at?: string;
  start_date?: string;
  end_date?: string;
  month?: string;
  revenue?: number;
  expense?: number;
  profit?: number;
}

interface ReportData {
  items: ReportItem[];
  total: number;
  summary?: {
    total_value?: number;
    total_proposals?: number;
    total_contracts?: number;
    total_revenue?: number;
    total_expense?: number;
    total_profit?: number;
  };
}

export function useReports(params: ReportsParams) {
  const [data, setData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateReport = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await reportsApi.generate(params);
      setData(response);

      return response;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const exportReport = async (format: 'json' | 'csv' | 'xlsx') => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await reportsApi.export({
        ...params,
        format
      });

      return response;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    generateReport,
    exportReport
  };
} 