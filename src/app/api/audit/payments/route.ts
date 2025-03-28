import { NextResponse } from 'next/server';
import { AuditPaymentsUseCase } from '@/application/use-cases/audit/AuditPaymentsUseCase';
import { PrismaPaymentRepository } from '@/infra/repositories/prisma/PrismaPaymentRepository';
import { PrismaSupplierRepository } from '@/infra/repositories/prisma/PrismaSupplierRepository';
import { PrismaTaxRetentionRepository } from '@/infra/repositories/prisma/PrismaTaxRetentionRepository';
import { CnpjService } from '@/services/CnpjService';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { clientId, startDate, endDate } = await request.json();

    const paymentRepository = new PrismaPaymentRepository(prisma);
    const supplierRepository = new PrismaSupplierRepository(prisma);
    const taxRetentionRepository = new PrismaTaxRetentionRepository(prisma);
    const cnpjService = new CnpjService();

    const auditPaymentsUseCase = new AuditPaymentsUseCase(
      paymentRepository,
      supplierRepository,
      taxRetentionRepository,
      cnpjService
    );

    const result = await auditPaymentsUseCase.execute({
      clientId,
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Erro ao auditar pagamentos:', error);
    return NextResponse.json(
      { error: 'Erro ao auditar pagamentos' },
      { status: 500 }
    );
  }
} 