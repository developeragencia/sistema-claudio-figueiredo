
import { supabase } from '@/integrations/supabase/client';
import { TaxCredit } from '@/types/tax-credits';
import { dbToTaxCredit } from './taxCreditTransformers';
import { toast } from 'sonner';

/**
 * Fetches all tax credits from the database
 */
export const fetchTaxCredits = async (): Promise<TaxCredit[]> => {
  try {
    console.log('Fetching tax credits');
    const { data, error } = await supabase
      .from('tax_credits')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching tax credits:', error);
      toast.error('Erro ao buscar créditos', {
        description: `Falha ao carregar os créditos: ${error.message}`,
      });
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log('No tax credits found');
      return [];
    }
    
    console.log('Fetched tax credits:', data.length);
    
    // Transform snake_case DB fields to camelCase for frontend
    return data.map(dbToTaxCredit);
  } catch (error: any) {
    console.error('Error in fetchTaxCredits:', error);
    toast.error('Erro ao buscar créditos', {
      description: `Falha ao carregar os créditos: ${error?.message || 'Erro desconhecido'}`,
    });
    return [];
  }
};
