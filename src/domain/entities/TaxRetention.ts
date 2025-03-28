export class TaxRetention {
  constructor(
    private readonly id: string,
    private codigoCnae: string,
    private descricao: string,
    private aliquotaIRRF: number,
    private aliquotaPIS: number,
    private aliquotaCOFINS: number,
    private aliquotaCSLL: number,
    private aliquotaISS: number,
    private valorMinimo: number,
    private dataCadastro: Date = new Date(),
    private dataAtualizacao: Date = new Date()
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.codigoCnae) {
      throw new Error('Código CNAE é obrigatório');
    }
    if (!this.descricao) {
      throw new Error('Descrição é obrigatória');
    }
    if (this.aliquotaIRRF < 0 || this.aliquotaPIS < 0 || this.aliquotaCOFINS < 0 || 
        this.aliquotaCSLL < 0 || this.aliquotaISS < 0) {
      throw new Error('Alíquotas não podem ser negativas');
    }
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getCodigoCnae(): string {
    return this.codigoCnae;
  }

  getDescricao(): string {
    return this.descricao;
  }

  getAliquotaIRRF(): number {
    return this.aliquotaIRRF;
  }

  getAliquotaPIS(): number {
    return this.aliquotaPIS;
  }

  getAliquotaCOFINS(): number {
    return this.aliquotaCOFINS;
  }

  getAliquotaCSLL(): number {
    return this.aliquotaCSLL;
  }

  getAliquotaISS(): number {
    return this.aliquotaISS;
  }

  getValorMinimo(): number {
    return this.valorMinimo;
  }

  getDataCadastro(): Date {
    return this.dataCadastro;
  }

  getDataAtualizacao(): Date {
    return this.dataAtualizacao;
  }

  // Métodos de cálculo
  calcularRetencoes(valorBruto: number): {
    irrf: number;
    pis: number;
    cofins: number;
    csll: number;
    iss: number;
    total: number;
  } {
    if (valorBruto < this.valorMinimo) {
      return {
        irrf: 0,
        pis: 0,
        cofins: 0,
        csll: 0,
        iss: 0,
        total: 0
      };
    }

    const irrf = valorBruto * (this.aliquotaIRRF / 100);
    const pis = valorBruto * (this.aliquotaPIS / 100);
    const cofins = valorBruto * (this.aliquotaCOFINS / 100);
    const csll = valorBruto * (this.aliquotaCSLL / 100);
    const iss = valorBruto * (this.aliquotaISS / 100);

    return {
      irrf,
      pis,
      cofins,
      csll,
      iss,
      total: irrf + pis + cofins + csll + iss
    };
  }

  toJSON() {
    return {
      id: this.id,
      codigoCnae: this.codigoCnae,
      descricao: this.descricao,
      aliquotaIRRF: this.aliquotaIRRF,
      aliquotaPIS: this.aliquotaPIS,
      aliquotaCOFINS: this.aliquotaCOFINS,
      aliquotaCSLL: this.aliquotaCSLL,
      aliquotaISS: this.aliquotaISS,
      valorMinimo: this.valorMinimo,
      dataCadastro: this.dataCadastro,
      dataAtualizacao: this.dataAtualizacao
    };
  }
} 