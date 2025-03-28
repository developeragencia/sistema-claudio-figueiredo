
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Deletes a tax credit from the database
 */
export const deleteTaxCredit = async (creditId: string): Promise<boolean> => {
  console.log('Deleting credit with ID:', creditId);
  
  if (!creditId) {
    console.error('Error: No credit ID provided for deletion');
    toast.error('Erro ao excluir crédito', {
      description: 'ID do crédito não fornecido',
    });
    return false;
  }
  
  try {
    // Delete from Supabase
    const { error } = await supabase
      .from('tax_credits')
      .delete()
      .eq('id', creditId);
      
    if (error) {
      console.error('Error deleting tax credit:', error);
      toast.error('Erro ao excluir crédito', {
        description: `Não foi possível excluir o crédito tributário: ${error.message}`,
      });
      return false;
    }
    
    toast.success('Crédito excluído', {
      description: 'O crédito tributário foi excluído com sucesso',
    });
    
    return true;
  } catch (error: any) {
    console.error('Error in deleteCredit:', error);
    toast.error('Erro ao excluir crédito', {
      description: `Não foi possível excluir o crédito tributário: ${error?.message || 'Erro desconhecido'}`,
    });
    return false;
  }
};
