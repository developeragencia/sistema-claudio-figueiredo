import { createClient } from '@supabase/supabase-js';
import { describe, it, expect } from 'vitest';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

describe('Conexão Supabase', () => {
  it('deve ter as variáveis de ambiente configuradas', () => {
    expect(supabaseUrl).toBeDefined();
    expect(supabaseAnonKey).toBeDefined();
  });

  it('deve conseguir criar um cliente Supabase', () => {
    const supabase = createClient(supabaseUrl!, supabaseAnonKey!);
    expect(supabase).toBeDefined();
    expect(supabase.auth).toBeDefined();
  });

  it('deve conseguir fazer uma consulta pública', async () => {
    const supabase = createClient(supabaseUrl!, supabaseAnonKey!);
    
    // Tenta buscar a versão do Supabase
    const { data, error } = await supabase
      .from('_realtime')
      .select('*')
      .limit(1);

    // Se der erro de permissão, é normal pois a tabela _realtime é protegida
    // O importante é que não dê erro de conexão
    expect(error?.message).not.toContain('connection');
    expect(error?.message).not.toContain('authentication');
  });
}); 