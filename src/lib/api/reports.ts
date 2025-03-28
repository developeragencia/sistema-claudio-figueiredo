import { api } from '../api';

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

export const reportsApi = {
  generate: async (params: ReportsParams): Promise<ReportData> => {
    const response = await api.post<ReportData>('/reports/generate', params);
    return response.data;
  },

  export: async (params: ReportsParams & { format: 'json' | 'csv' | 'xlsx' }): Promise<Blob> => {
    const response = await api.post<Blob>('/reports/export', params, {
      responseType: 'blob'
    });
    return response.data;
  }
}; 