import { supabase } from '@/lib/supabase';
import { Client } from '@/types/user';

class ClientService {
  private static instance: ClientService;

  private constructor() {}

  public static getInstance(): ClientService {
    if (!ClientService.instance) {
      ClientService.instance = new ClientService();
    }
    return ClientService.instance;
  }

  async fetchUserClients(): Promise<Client[]> {
    const { data: clients, error } = await supabase
      .from('clients')
      .select('*')
      .order('corporateName');

    if (error) {
      throw new Error('Erro ao buscar clientes: ' + error.message);
    }

    return clients;
  }

  async fetchClientById(id: string): Promise<Client> {
    const { data: client, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error('Erro ao buscar cliente: ' + error.message);
    }

    return client;
  }

  async createClient(client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
    const { data, error } = await supabase
      .from('clients')
      .insert([{
        ...client,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      throw new Error('Erro ao criar cliente: ' + error.message);
    }

    return data;
  }

  async updateClient(id: string, updates: Partial<Client>): Promise<Client> {
    const { data, error } = await supabase
      .from('clients')
      .update({
        ...updates,
        updatedAt: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error('Erro ao atualizar cliente: ' + error.message);
    }

    return data;
  }

  async toggleClientStatus(id: string, active: boolean): Promise<void> {
    const { error } = await supabase
      .from('clients')
      .update({
        active,
        updatedAt: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      throw new Error('Erro ao alterar status do cliente: ' + error.message);
    }
  }

  async assignUsersToClient(clientId: string, userIds: string[]): Promise<void> {
    const { error } = await supabase
      .from('clients')
      .update({
        assignedUsers: userIds,
        updatedAt: new Date().toISOString()
      })
      .eq('id', clientId);

    if (error) {
      throw new Error('Erro ao atribuir usuários ao cliente: ' + error.message);
    }
  }
}

export const clientService = ClientService.getInstance(); 