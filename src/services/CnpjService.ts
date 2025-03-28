import axios from 'axios';

const CNPJ_WS_API_KEY = 'l7voA9Wjb7XLFe0nUVjCmrwEXV5wK076D7XFVx4M3Z27';
const CNPJ_WS_BASE_URL = 'https://api.cnpj.ws/v1';

interface CnpjWSResponse {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  cnae_fiscal: string;
  cnae_fiscal_descricao: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  telefone1: string;
  email: string;
}

export class CnpjService {
  private api = axios.create({
    baseURL: CNPJ_WS_BASE_URL,
    headers: {
      'Authorization': `Bearer ${CNPJ_WS_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  async consultarCnpj(cnpj: string): Promise<{
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
  }> {
    try {
      const cnpjLimpo = cnpj.replace(/[^\d]/g, '');
      const response = await this.api.get<CnpjWSResponse>(`/cnpj/${cnpjLimpo}`);
      const data = response.data;

      return {
        razaoSocial: data.razao_social,
        nomeFantasia: data.nome_fantasia || data.razao_social,
        atividadePrincipal: data.cnae_fiscal_descricao,
        codigoCnae: data.cnae_fiscal,
        endereco: `${data.logradouro}, ${data.numero}${data.complemento ? ` - ${data.complemento}` : ''} - ${data.bairro}`,
        cidade: data.cidade,
        estado: data.uf,
        cep: data.cep,
        telefone: data.telefone1,
        email: data.email
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('CNPJ não encontrado');
        }
        if (error.response?.status === 429) {
          throw new Error('Limite de requisições excedido');
        }
        throw new Error(`Erro ao consultar CNPJ: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }
} 