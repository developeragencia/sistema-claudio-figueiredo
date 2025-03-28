
export type SelicRate = {
  month: number;
  year: number;
  date?: string;
  rate: number;
  accumulated: number;
};

export type MonetaryCorrection = {
  id: string;
  creditId?: string;
  originalValue: number;
  correctedValue: number;
  difference: number;
  correctionDate?: string;
  months?: number;
  accumulatedRate?: number;
  clientId?: string;
  clientName?: string;
};

export type SelicAPIResponse = {
  data: {
    date: string;
    value: number;
  }[];
};
