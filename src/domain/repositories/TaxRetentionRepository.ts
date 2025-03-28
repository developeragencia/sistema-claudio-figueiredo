import { TaxRetention } from '../entities/TaxRetention';

export interface TaxRetentionRepository {
  findById(id: string): Promise<TaxRetention | null>;
  findByCnae(codigoCnae: string): Promise<TaxRetention | null>;
  findAll(params: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{
    data: TaxRetention[];
    total: number;
    page: number;
    totalPages: number;
  }>;
  create(taxRetention: TaxRetention): Promise<void>;
  update(taxRetention: TaxRetention): Promise<void>;
  delete(id: string): Promise<void>;
} 