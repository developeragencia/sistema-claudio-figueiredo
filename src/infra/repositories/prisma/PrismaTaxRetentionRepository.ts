import { PrismaClient } from '@prisma/client';
import { TaxRetention } from '@/domain/entities/TaxRetention';
import { TaxRetentionRepository } from '@/domain/repositories/TaxRetentionRepository';

export class PrismaTaxRetentionRepository implements TaxRetentionRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<TaxRetention | null> {
    const taxRetention = await this.prisma.taxRetention.findUnique({
      where: { id }
    });

    if (!taxRetention) return null;

    return new TaxRetention({
      id: taxRetention.id,
      codigoCnae: taxRetention.codigoCnae,
      descricao: taxRetention.descricao,
      aliquotaIRRF: taxRetention.aliquotaIRRF,
      aliquotaPIS: taxRetention.aliquotaPIS,
      aliquotaCOFINS: taxRetention.aliquotaCOFINS,
      aliquotaCSLL: taxRetention.aliquotaCSLL,
      aliquotaISS: taxRetention.aliquotaISS,
      valorMinimo: taxRetention.valorMinimo,
      dataCadastro: taxRetention.dataCadastro,
      dataAtualizacao: taxRetention.dataAtualizacao
    });
  }

  async findByCnae(codigoCnae: string): Promise<TaxRetention | null> {
    const taxRetention = await this.prisma.taxRetention.findUnique({
      where: { codigoCnae }
    });

    if (!taxRetention) return null;

    return new TaxRetention({
      id: taxRetention.id,
      codigoCnae: taxRetention.codigoCnae,
      descricao: taxRetention.descricao,
      aliquotaIRRF: taxRetention.aliquotaIRRF,
      aliquotaPIS: taxRetention.aliquotaPIS,
      aliquotaCOFINS: taxRetention.aliquotaCOFINS,
      aliquotaCSLL: taxRetention.aliquotaCSLL,
      aliquotaISS: taxRetention.aliquotaISS,
      valorMinimo: taxRetention.valorMinimo,
      dataCadastro: taxRetention.dataCadastro,
      dataAtualizacao: taxRetention.dataAtualizacao
    });
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{
    data: TaxRetention[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10, search } = params;

    const where = search
      ? {
          OR: [
            { codigoCnae: { contains: search } },
            { descricao: { contains: search, mode: 'insensitive' } }
          ]
        }
      : {};

    const [taxRetentions, total] = await Promise.all([
      this.prisma.taxRetention.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit
      }),
      this.prisma.taxRetention.count({ where })
    ]);

    return {
      data: taxRetentions.map(
        (taxRetention) =>
          new TaxRetention({
            id: taxRetention.id,
            codigoCnae: taxRetention.codigoCnae,
            descricao: taxRetention.descricao,
            aliquotaIRRF: taxRetention.aliquotaIRRF,
            aliquotaPIS: taxRetention.aliquotaPIS,
            aliquotaCOFINS: taxRetention.aliquotaCOFINS,
            aliquotaCSLL: taxRetention.aliquotaCSLL,
            aliquotaISS: taxRetention.aliquotaISS,
            valorMinimo: taxRetention.valorMinimo,
            dataCadastro: taxRetention.dataCadastro,
            dataAtualizacao: taxRetention.dataAtualizacao
          })
      ),
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  async create(taxRetention: TaxRetention): Promise<void> {
    await this.prisma.taxRetention.create({
      data: {
        id: taxRetention.id,
        codigoCnae: taxRetention.codigoCnae,
        descricao: taxRetention.descricao,
        aliquotaIRRF: taxRetention.aliquotaIRRF,
        aliquotaPIS: taxRetention.aliquotaPIS,
        aliquotaCOFINS: taxRetention.aliquotaCOFINS,
        aliquotaCSLL: taxRetention.aliquotaCSLL,
        aliquotaISS: taxRetention.aliquotaISS,
        valorMinimo: taxRetention.valorMinimo,
        dataCadastro: taxRetention.dataCadastro,
        dataAtualizacao: taxRetention.dataAtualizacao
      }
    });
  }

  async update(taxRetention: TaxRetention): Promise<void> {
    await this.prisma.taxRetention.update({
      where: { id: taxRetention.id },
      data: {
        codigoCnae: taxRetention.codigoCnae,
        descricao: taxRetention.descricao,
        aliquotaIRRF: taxRetention.aliquotaIRRF,
        aliquotaPIS: taxRetention.aliquotaPIS,
        aliquotaCOFINS: taxRetention.aliquotaCOFINS,
        aliquotaCSLL: taxRetention.aliquotaCSLL,
        aliquotaISS: taxRetention.aliquotaISS,
        valorMinimo: taxRetention.valorMinimo,
        dataAtualizacao: taxRetention.dataAtualizacao
      }
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.taxRetention.delete({
      where: { id }
    });
  }
} 