
import { supabase } from '@/integrations/supabase/client';
import { TaxCredit } from '@/types/tax-credits';
import { toast } from 'sonner';
import { dbToTaxCredit, taxCreditToDbForCreate } from './taxCreditTransformers';

/**
 * Creates a new tax credit in the database
 */
export const createTaxCredit = async (creditData: Partial<TaxCredit>) => {
  console.log('Creating credit with data:', creditData);
  
  try {
    // Transform camelCase to snake_case for DB
    const dbData = taxCreditToDbForCreate(creditData);
    console.log('Transformed data for DB:', dbData);
    
    // Save to Supabase
    const { data, error } = await supabase
      .from('tax_credits')
      .insert(dbData)
      .select()
      .single();
      
    if (error) {
      console.error('Error creating tax credit:', error);
      toast.error('Erro ao criar crédito', {
        description: 'Não foi possível salvar o crédito tributário: ' + error.message,
      });
      
      // Return a temporary object for UI continuity
      return {
        ...creditData,
        id: `temp-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: (creditData.status || 'pending').toLowerCase()
      } as TaxCredit;
    }
    
    if (!data) {
      console.error('No data returned from insert operation');
      throw new Error('No data returned from insert operation');
    }
    
    // Transform back to camelCase for frontend
    const savedCredit = dbToTaxCredit(data);
    console.log('Successfully created credit:', savedCredit);
    
    toast.success('Crédito criado', {
      description: 'O crédito tributário foi criado com sucesso',
    });
    
    return savedCredit;
  } catch (error) {
    console.error('Error in createCredit:', error);
    toast.error('Erro ao criar crédito', {
      description: 'Não foi possível salvar o crédito tributário',
    });
    
    // Return a temporary object for UI continuity
    return {
      ...creditData,
      id: `temp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: (creditData.status || 'pending').toLowerCase()
    } as TaxCredit;
  }
};
