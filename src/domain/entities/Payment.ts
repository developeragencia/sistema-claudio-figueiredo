export class Payment {
  constructor(
    private readonly id: string,
    private clientId: string,
    private supplierId: string,
    private valor: number,
    private dataEmissao: Date,
    private dataPagamento: Date,
    private numeroDocumento: string,
    private descricao: string,
    private status: 'PENDENTE' | 'PAGO' | 'CANCELADO' = 'PENDENTE',
    private dataCadastro: Date = new Date(),
    private dataAtualizacao: Date = new Date()
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.clientId) {
      throw new Error('Cliente é obrigatório');
    }
    if (!this.supplierId) {
      throw new Error('Fornecedor é obrigatório');
    }
    if (!this.valor || this.valor <= 0) {
      throw new Error('Valor deve ser maior que zero');
    }
    if (!this.dataEmissao) {
      throw new Error('Data de emissão é obrigatória');
    }
    if (!this.dataPagamento) {
      throw new Error('Data de pagamento é obrigatória');
    }
    if (!this.numeroDocumento) {
      throw new Error('Número do documento é obrigatório');
    }
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getClientId(): string {
    return this.clientId;
  }

  getSupplierId(): string {
    return this.supplierId;
  }

  getValor(): number {
    return this.valor;
  }

  getDataEmissao(): Date {
    return this.dataEmissao;
  }

  getDataPagamento(): Date {
    return this.dataPagamento;
  }

  getNumeroDocumento(): string {
    return this.numeroDocumento;
  }

  getDescricao(): string {
    return this.descricao;
  }

  getStatus(): string {
    return this.status;
  }

  getDataCadastro(): Date {
    return this.dataCadastro;
  }

  getDataAtualizacao(): Date {
    return this.dataAtualizacao;
  }

  // Setters
  updateStatus(status: 'PENDENTE' | 'PAGO' | 'CANCELADO'): void {
    this.status = status;
    this.dataAtualizacao = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      clientId: this.clientId,
      supplierId: this.supplierId,
      valor: this.valor,
      dataEmissao: this.dataEmissao,
      dataPagamento: this.dataPagamento,
      numeroDocumento: this.numeroDocumento,
      descricao: this.descricao,
      status: this.status,
      dataCadastro: this.dataCadastro,
      dataAtualizacao: this.dataAtualizacao
    };
  }
} 