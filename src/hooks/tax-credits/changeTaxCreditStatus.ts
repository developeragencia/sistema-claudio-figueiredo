
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Changes the status of a tax credit in the database
 */
export const changeTaxCreditStatus = async (
  creditId: string, 
  newStatus: string, 
  notes: string,
  existingNotes?: string
) => {
  console.log('Changing status:', creditId, 'to', newStatus);
  
  if (!creditId) {
    console.error('Error: No credit ID provided for status change');
    toast.error('Erro ao alterar status', {
      description: 'ID do crédito não fornecido',
    });
    return false;
  }

  if (!newStatus) {
    console.error('Error: No new status provided for status change');
    toast.error('Erro ao alterar status', {
      description: 'Novo status não fornecido',
    });
    return false;
  }
  
  try {
    // Normalize status to lowercase
    const normalizedStatus = newStatus.toLowerCase();
    
    // Prepare update data
    const updateData: Record<string, any> = {
      status: normalizedStatus,
      updated_at: new Date().toISOString(),
    };
    
    // Append notes if provided
    if (notes) {
      const datePrefix = new Date().toLocaleString('pt-BR');
      const statusNote = `[${datePrefix} - Status alterado para ${newStatus}] ${notes}`;
      updateData.notes = existingNotes 
        ? `${existingNotes}\n\n${statusNote}`
        : statusNote;
    }
    
    // Update approved_at timestamp if status is 'approved'
    if (normalizedStatus === 'approved') {
      updateData.approved_at = new Date().toISOString();
    }
    
    console.log('Update data for status change:', updateData);
    
    // Update in Supabase
    const { data, error } = await supabase
      .from('tax_credits')
      .update(updateData)
      .eq('id', creditId)
      .select();
      
    if (error) {
      console.error('Error changing tax credit status:', error);
      toast.error('Erro ao alterar status', {
        description: `Não foi possível alterar o status do crédito tributário: ${error.message}`,
      });
      return false;
    }
    
    console.log('Status changed successfully. Updated data:', data);
    
    toast.success('Status alterado', {
      description: `O status foi alterado para ${newStatus} com sucesso`,
    });
    
    return true;
  } catch (error: any) {
    console.error('Error in changeStatus:', error);
    toast.error('Erro ao alterar status', {
      description: `Não foi possível alterar o status do crédito tributário: ${error.message || 'Erro desconhecido'}`,
    });
    return false;
  }
};
