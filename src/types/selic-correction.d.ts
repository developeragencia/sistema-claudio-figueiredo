
export interface SelicRate {
  month: number;
  year: number;
  date?: string;
  rate: number;
  accumulated: number;
}

export interface MonetaryCorrection {
  id: string;
  originalValue: number;
  startDate: string;
  endDate: string;
  selicRate: number;
  correctedValue: number;
  correctionValue: number;
  status: 'pending' | 'applied' | 'rejected';
  createdAt: string;
  updatedAt: string;
  description?: string;
  clientId?: string;
  clientName?: string;
  creditId?: string;
  difference?: number;
  correctionDate?: string;
  months?: number;
  accumulatedRate?: number;
}

export interface SelicCorrectionHookReturn {
  rates: SelicRate[];
  isLoading: boolean;
  error: string | null;
  fetchRates: () => Promise<void>;
  calculateCorrection: (value: number, startDate: string, endDate?: string) => {
    correctedValue: number;
    correctionValue: number;
    selicRate: number;
  };
  applyCorrection: (params: {
    originalValue: number;
    startDate: string;
    endDate?: string;
    description?: string;
  }) => Promise<MonetaryCorrection>;
  history: MonetaryCorrection[];
  clearHistory: () => void;
}
