import { Payment } from '@/domain/entities/Payment';
import { Supplier } from '@/domain/entities/Supplier';
import { TaxRetention } from '@/domain/entities/TaxRetention';
import { PaymentRepository } from '@/domain/repositories/PaymentRepository';
import { SupplierRepository } from '@/domain/repositories/SupplierRepository';
import { TaxRetentionRepository } from '@/domain/repositories/TaxRetentionRepository';
import { CnpjService } from '@/services/CnpjService';

interface AuditPaymentsInput {
  clientId: string;
  startDate: Date;
  endDate: Date;
}

interface AuditPaymentOutput {
  payment: {
    id: string;
    valor: number;
    dataEmissao: Date;
    dataPagamento: Date;
    numeroDocumento: string;
    descricao: string;
  };
  supplier: {
    cnpj: string;
    razaoSocial: string;
    atividadePrincipal: string;
    codigoCnae: string;
  };
  retencoes: {
    irrf: number;
    pis: number;
    cofins: number;
    csll: number;
    iss: number;
    total: number;
  };
}

export class AuditPaymentsUseCase {
  constructor(
    private paymentRepository: PaymentRepository,
    private supplierRepository: SupplierRepository,
    private taxRetentionRepository: TaxRetentionRepository,
    private cnpjService: CnpjService
  ) {}

  async execute(input: AuditPaymentsInput): Promise<AuditPaymentOutput[]> {
    // Busca todos os pagamentos do cliente no período
    const payments = await this.paymentRepository.findByClientAndPeriod(
      input.clientId,
      input.startDate,
      input.endDate
    );

    const auditResults: AuditPaymentOutput[] = [];

    for (const payment of payments) {
      // Busca o fornecedor
      let supplier = await this.supplierRepository.findById(payment.getSupplierId());

      // Se não encontrar o fornecedor, busca na API do CNPJ.ws
      if (!supplier) {
        const cnpjData = await this.cnpjService.consultarCnpj(payment.getSupplierId());
        supplier = new Supplier(
          crypto.randomUUID(),
          payment.getSupplierId(),
          cnpjData.razaoSocial,
          cnpjData.nomeFantasia,
          cnpjData.atividadePrincipal,
          cnpjData.codigoCnae,
          cnpjData.endereco,
          cnpjData.cidade,
          cnpjData.estado,
          cnpjData.cep,
          cnpjData.telefone,
          cnpjData.email
        );
        await this.supplierRepository.create(supplier);
      }

      // Busca as regras de retenção para o CNAE do fornecedor
      const taxRetention = await this.taxRetentionRepository.findByCnae(supplier.getCodigoCnae());

      // Calcula as retenções
      const retencoes = taxRetention ? taxRetention.calcularRetencoes(payment.getValor()) : {
        irrf: 0,
        pis: 0,
        cofins: 0,
        csll: 0,
        iss: 0,
        total: 0
      };

      auditResults.push({
        payment: {
          id: payment.getId(),
          valor: payment.getValor(),
          dataEmissao: payment.getDataEmissao(),
          dataPagamento: payment.getDataPagamento(),
          numeroDocumento: payment.getNumeroDocumento(),
          descricao: payment.getDescricao()
        },
        supplier: {
          cnpj: supplier.getCnpj(),
          razaoSocial: supplier.getRazaoSocial(),
          atividadePrincipal: supplier.getAtividadePrincipal(),
          codigoCnae: supplier.getCodigoCnae()
        },
        retencoes
      });
    }

    return auditResults;
  }
} 