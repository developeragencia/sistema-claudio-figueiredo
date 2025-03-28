
import { Json } from '@/integrations/supabase/types';
import { TaxCredit } from '@/types/tax-credits';

// Define proper types for database interaction
export type DbTaxCredit = {
  id: string;
  client_name: string | null;
  client_id: string | null;
  document_number: string | null;
  credit_type: string | null;
  credit_amount: number | null;
  original_amount: number | null;
  period_start: string | null;
  period_end: string | null;
  status: string | null;
  notes: string | null;
  attachments: Json | null;
  created_at: string | null;
  updated_at: string | null;
  approved_at: string | null;
  created_by: string | null;
  attachments_count: number | null;
  description: string | null;
};
