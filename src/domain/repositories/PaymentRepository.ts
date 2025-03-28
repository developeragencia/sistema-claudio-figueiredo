import { Payment } from '../entities/Payment';

export interface PaymentRepository {
  findById(id: string): Promise<Payment | null>;
  findByClientAndPeriod(clientId: string, startDate: Date, endDate: Date): Promise<Payment[]>;
  findAll(params: {
    page?: number;
    limit?: number;
    search?: string;
    clientId?: string;
    supplierId?: string;
    startDate?: Date;
    endDate?: Date;
    status?: string;
  }): Promise<{
    data: Payment[];
    total: number;
    page: number;
    totalPages: number;
  }>;
  create(payment: Payment): Promise<void>;
  update(payment: Payment): Promise<void>;
  delete(id: string): Promise<void>;
} 