import { Supplier } from '../entities/Supplier';

export interface SupplierRepository {
  findById(id: string): Promise<Supplier | null>;
  findByCnpj(cnpj: string): Promise<Supplier | null>;
  findAll(params: {
    page?: number;
    limit?: number;
    search?: string;
    codigoCnae?: string;
  }): Promise<{
    data: Supplier[];
    total: number;
    page: number;
    totalPages: number;
  }>;
  create(supplier: Supplier): Promise<void>;
  update(supplier: Supplier): Promise<void>;
  delete(id: string): Promise<void>;
} 