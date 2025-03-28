import { PrismaClient } from '@prisma/client';
import { Payment } from '@/domain/entities/Payment';
import { PaymentRepository } from '@/domain/repositories/PaymentRepository';

export class PrismaPaymentRepository implements PaymentRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Payment | null> {
    const payment = await this.prisma.payment.findUnique({
      where: { id }
    });

    if (!payment) return null;

    return new Payment({
      id: payment.id,
      clientId: payment.clientId,
      supplierId: payment.supplierId,
      valor: payment.valor,
      dataEmissao: payment.dataEmissao,
      dataPagamento: payment.dataPagamento,
      numeroDocumento: payment.numeroDocumento,
      descricao: payment.descricao,
      status: payment.status,
      dataCadastro: payment.dataCadastro,
      dataAtualizacao: payment.dataAtualizacao
    });
  }

  async findByClientAndPeriod(
    clientId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Payment[]> {
    const payments = await this.prisma.payment.findMany({
      where: {
        clientId,
        dataPagamento: {
          gte: startDate,
          lte: endDate
        }
      }
    });

    return payments.map(
      (payment) =>
        new Payment({
          id: payment.id,
          clientId: payment.clientId,
          supplierId: payment.supplierId,
          valor: payment.valor,
          dataEmissao: payment.dataEmissao,
          dataPagamento: payment.dataPagamento,
          numeroDocumento: payment.numeroDocumento,
          descricao: payment.descricao,
          status: payment.status,
          dataCadastro: payment.dataCadastro,
          dataAtualizacao: payment.dataAtualizacao
        })
    );
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    clientId?: string;
    supplierId?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<{
    data: Payment[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const {
      page = 1,
      limit = 10,
      clientId,
      supplierId,
      startDate,
      endDate
    } = params;

    const where = {
      ...(clientId && { clientId }),
      ...(supplierId && { supplierId }),
      ...(startDate &&
        endDate && {
          dataPagamento: {
            gte: startDate,
            lte: endDate
          }
        })
    };

    const [payments, total] = await Promise.all([
      this.prisma.payment.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit
      }),
      this.prisma.payment.count({ where })
    ]);

    return {
      data: payments.map(
        (payment) =>
          new Payment({
            id: payment.id,
            clientId: payment.clientId,
            supplierId: payment.supplierId,
            valor: payment.valor,
            dataEmissao: payment.dataEmissao,
            dataPagamento: payment.dataPagamento,
            numeroDocumento: payment.numeroDocumento,
            descricao: payment.descricao,
            status: payment.status,
            dataCadastro: payment.dataCadastro,
            dataAtualizacao: payment.dataAtualizacao
          })
      ),
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  async create(payment: Payment): Promise<void> {
    await this.prisma.payment.create({
      data: {
        id: payment.id,
        clientId: payment.clientId,
        supplierId: payment.supplierId,
        valor: payment.valor,
        dataEmissao: payment.dataEmissao,
        dataPagamento: payment.dataPagamento,
        numeroDocumento: payment.numeroDocumento,
        descricao: payment.descricao,
        status: payment.status,
        dataCadastro: payment.dataCadastro,
        dataAtualizacao: payment.dataAtualizacao
      }
    });
  }

  async update(payment: Payment): Promise<void> {
    await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        clientId: payment.clientId,
        supplierId: payment.supplierId,
        valor: payment.valor,
        dataEmissao: payment.dataEmissao,
        dataPagamento: payment.dataPagamento,
        numeroDocumento: payment.numeroDocumento,
        descricao: payment.descricao,
        status: payment.status,
        dataAtualizacao: payment.dataAtualizacao
      }
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.payment.delete({
      where: { id }
    });
  }
} 