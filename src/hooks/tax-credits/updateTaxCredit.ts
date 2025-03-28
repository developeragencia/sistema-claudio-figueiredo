
import { supabase } from '@/integrations/supabase/client';
import { TaxCredit } from '@/types/tax-credits';
import { toast } from 'sonner';
import { prepareUpdateFields } from './taxCreditTransformers';

/**
 * Updates an existing tax credit in the database
 */
export const updateTaxCredit = async (creditId: string, creditData: Partial<TaxCredit>): Promise<boolean> => {
  console.log('Updating credit:', creditId, creditData);
  
  if (!creditId) {
    console.error('Error: No credit ID provided for update');
    toast.error('Erro ao atualizar crédito', {
      description: 'ID do crédito não fornecido',
    });
    return false;
  }
  
  try {
    // Transform camelCase to snake_case for DB
    const dbData = prepareUpdateFields(creditData);
    console.log('Transformed update data for DB:', dbData);
    
    // Update in Supabase
    const { data, error } = await supabase
      .from('tax_credits')
      .update(dbData)
      .eq('id', creditId)
      .select();
      
    if (error) {
      console.error('Error updating tax credit:', error);
      toast.error('Erro ao atualizar crédito', {
        description: `Não foi possível atualizar o crédito tributário: ${error.message}`,
      });
      return false;
    }
    
    toast.success('Crédito atualizado', {
      description: 'O crédito tributário foi atualizado com sucesso',
    });
    
    console.log('Updated credit data:', data);
    return true;
  } catch (error: any) {
    console.error('Error in updateCredit:', error);
    toast.error('Erro ao atualizar crédito', {
      description: `Não foi possível atualizar o crédito tributário: ${error?.message || 'Erro desconhecido'}`,
    });
    return false;
  }
};
