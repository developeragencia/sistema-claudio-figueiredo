export interface SupplierProps {
  id: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  atividadePrincipal: string;
  codigoCnae: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  email: string;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
}

export class Supplier {
  private readonly id: string;
  private cnpj: string;
  private razaoSocial: string;
  private nomeFantasia: string;
  private atividadePrincipal: string;
  private codigoCnae: string;
  private endereco: string;
  private cidade: string;
  private estado: string;
  private cep: string;
  private telefone: string;
  private email: string;
  private dataCadastro: Date;
  private dataAtualizacao: Date;

  constructor(props: SupplierProps) {
    this.id = props.id;
    this.cnpj = props.cnpj;
    this.razaoSocial = props.razaoSocial;
    this.nomeFantasia = props.nomeFantasia;
    this.atividadePrincipal = props.atividadePrincipal;
    this.codigoCnae = props.codigoCnae;
    this.endereco = props.endereco;
    this.cidade = props.cidade;
    this.estado = props.estado;
    this.cep = props.cep;
    this.telefone = props.telefone;
    this.email = props.email;
    this.dataCadastro = props.dataCadastro || new Date();
    this.dataAtualizacao = props.dataAtualizacao || new Date();
    this.validate();
  }

  private validate(): void {
    if (!this.cnpj) {
      throw new Error('CNPJ é obrigatório');
    }
    if (!this.razaoSocial) {
      throw new Error('Razão Social é obrigatória');
    }
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getCnpj(): string {
    return this.cnpj;
  }

  getRazaoSocial(): string {
    return this.razaoSocial;
  }

  getNomeFantasia(): string {
    return this.nomeFantasia;
  }

  getAtividadePrincipal(): string {
    return this.atividadePrincipal;
  }

  getCodigoCnae(): string {
    return this.codigoCnae;
  }

  getEndereco(): string {
    return this.endereco;
  }

  getCidade(): string {
    return this.cidade;
  }

  getEstado(): string {
    return this.estado;
  }

  getCep(): string {
    return this.cep;
  }

  getTelefone(): string {
    return this.telefone;
  }

  getEmail(): string {
    return this.email;
  }

  getDataCadastro(): Date {
    return this.dataCadastro;
  }

  getDataAtualizacao(): Date {
    return this.dataAtualizacao;
  }

  // Setters
  updateFromCnpjWS(data: {
    razaoSocial: string;
    nomeFantasia: string;
    atividadePrincipal: string;
    codigoCnae: string;
    endereco: string;
    cidade: string;
    estado: string;
    cep: string;
    telefone: string;
    email: string;
  }): void {
    this.razaoSocial = data.razaoSocial;
    this.nomeFantasia = data.nomeFantasia;
    this.atividadePrincipal = data.atividadePrincipal;
    this.codigoCnae = data.codigoCnae;
    this.endereco = data.endereco;
    this.cidade = data.cidade;
    this.estado = data.estado;
    this.cep = data.cep;
    this.telefone = data.telefone;
    this.email = data.email;
    this.dataAtualizacao = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      cnpj: this.cnpj,
      razaoSocial: this.razaoSocial,
      nomeFantasia: this.nomeFantasia,
      atividadePrincipal: this.atividadePrincipal,
      codigoCnae: this.codigoCnae,
      endereco: this.endereco,
      cidade: this.cidade,
      estado: this.estado,
      cep: this.cep,
      telefone: this.telefone,
      email: this.email,
      dataCadastro: this.dataCadastro,
      dataAtualizacao: this.dataAtualizacao
    };
  }
} 