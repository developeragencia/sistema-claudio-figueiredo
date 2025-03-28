import { PrismaClient } from '@prisma/client';
import { Supplier } from '@/domain/entities/Supplier';
import { SupplierRepository } from '@/domain/repositories/SupplierRepository';

export class PrismaSupplierRepository implements SupplierRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Supplier | null> {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id }
    });

    if (!supplier) return null;

    return new Supplier({
      id: supplier.id,
      cnpj: supplier.cnpj,
      razaoSocial: supplier.name,
      nomeFantasia: supplier.name,
      atividadePrincipal: '',
      codigoCnae: '',
      endereco: supplier.address || '',
      cidade: supplier.city || '',
      estado: supplier.state || '',
      cep: supplier.zip || '',
      telefone: supplier.phone || '',
      email: supplier.email || '',
      dataCadastro: supplier.createdAt,
      dataAtualizacao: supplier.updatedAt
    });
  }

  async findByCnpj(cnpj: string): Promise<Supplier | null> {
    const supplier = await this.prisma.supplier.findUnique({
      where: { cnpj }
    });

    if (!supplier) return null;

    return new Supplier({
      id: supplier.id,
      cnpj: supplier.cnpj,
      razaoSocial: supplier.name,
      nomeFantasia: supplier.name,
      atividadePrincipal: '',
      codigoCnae: '',
      endereco: supplier.address || '',
      cidade: supplier.city || '',
      estado: supplier.state || '',
      cep: supplier.zip || '',
      telefone: supplier.phone || '',
      email: supplier.email || '',
      dataCadastro: supplier.createdAt,
      dataAtualizacao: supplier.updatedAt
    });
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{
    data: Supplier[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10, search } = params;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { cnpj: { contains: search } }
          ]
        }
      : {};

    const [suppliers, total] = await Promise.all([
      this.prisma.supplier.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit
      }),
      this.prisma.supplier.count({ where })
    ]);

    return {
      data: suppliers.map(
        (supplier) =>
          new Supplier({
            id: supplier.id,
            cnpj: supplier.cnpj,
            razaoSocial: supplier.name,
            nomeFantasia: supplier.name,
            atividadePrincipal: '',
            codigoCnae: '',
            endereco: supplier.address || '',
            cidade: supplier.city || '',
            estado: supplier.state || '',
            cep: supplier.zip || '',
            telefone: supplier.phone || '',
            email: supplier.email || '',
            dataCadastro: supplier.createdAt,
            dataAtualizacao: supplier.updatedAt
          })
      ),
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  async create(supplier: Supplier): Promise<void> {
    await this.prisma.supplier.create({
      data: {
        id: supplier.getId(),
        cnpj: supplier.getCnpj(),
        name: supplier.getRazaoSocial(),
        email: supplier.getEmail(),
        phone: supplier.getTelefone(),
        address: supplier.getEndereco(),
        city: supplier.getCidade(),
        state: supplier.getEstado(),
        zip: supplier.getCep()
      }
    });
  }

  async update(supplier: Supplier): Promise<void> {
    await this.prisma.supplier.update({
      where: { id: supplier.getId() },
      data: {
        cnpj: supplier.getCnpj(),
        name: supplier.getRazaoSocial(),
        email: supplier.getEmail(),
        phone: supplier.getTelefone(),
        address: supplier.getEndereco(),
        city: supplier.getCidade(),
        state: supplier.getEstado(),
        zip: supplier.getCep()
      }
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.supplier.delete({
      where: { id }
    });
  }
} 