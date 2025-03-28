
export type ComparisonStatus = 'recuperável' | 'correto' | 'divergente';

export type ComparisonItem = {
  id: string;
  invoiceNumber: string;
  supplierName: string;
  date: string;
  value: number;
  retainedValue: number;
  correctValue: number;
  difference: number;
  status: ComparisonStatus;
};
