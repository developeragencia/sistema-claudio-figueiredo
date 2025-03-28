
import { TaxCredit } from '@/types/tax-credits';

/**
 * Transforms a database tax credit record to the frontend TaxCredit format
 */
export const dbToTaxCredit = (item: any): TaxCredit => ({
  id: item.id,
  clientName: item.client_name || '',
  clientId: item.client_id || '',
  documentNumber: item.document_number || '',
  creditType: item.credit_type || '',
  creditAmount: typeof item.credit_amount === 'number' ? item.credit_amount : 
               parseFloat(item.credit_amount) || 0,
  originalAmount: typeof item.original_amount === 'number' ? item.original_amount : 
                 parseFloat(item.original_amount) || 0,
  periodStart: item.period_start || '',
  periodEnd: item.period_end || '',
  status: (item.status || 'pending').toLowerCase() as TaxCredit['status'],
  notes: item.notes || '',
  createdAt: item.created_at || new Date().toISOString(),
  updatedAt: item.updated_at || undefined,
  approvedAt: item.approved_at || undefined,
  attachmentsCount: item.attachments_count || 0
});

/**
 * Transforms a frontend TaxCredit to database format for creation
 */
export const taxCreditToDbForCreate = (creditData: Partial<TaxCredit>) => {
  console.log('Converting to DB format:', creditData);
  
  // Handle dates properly, ensuring they're in ISO format
  let periodStart = null;
  if (creditData.periodStart) {
    periodStart = typeof creditData.periodStart === 'string' 
      ? creditData.periodStart 
      : creditData.periodStart instanceof Date 
        ? creditData.periodStart.toISOString() 
        : null;
  }
  
  let periodEnd = null;
  if (creditData.periodEnd) {
    periodEnd = typeof creditData.periodEnd === 'string' 
      ? creditData.periodEnd 
      : creditData.periodEnd instanceof Date 
        ? creditData.periodEnd.toISOString() 
        : null;
  }
  
  // Ensure status is lowercase
  const status = creditData.status ? creditData.status.toLowerCase() : 'pending';
  
  return {
    client_name: creditData.clientName || '',
    client_id: creditData.clientId || '',
    document_number: creditData.documentNumber || '',
    credit_type: creditData.creditType || '',
    credit_amount: creditData.creditAmount || 0,
    original_amount: creditData.originalAmount || creditData.creditAmount || 0,
    period_start: periodStart,
    period_end: periodEnd,
    status: status,
    notes: creditData.notes || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
};

/**
 * Transforms fields for updating a tax credit
 */
export const prepareUpdateFields = (creditData: Partial<TaxCredit>) => {
  console.log('Preparing update fields:', creditData);
  
  const dbData: any = {
    updated_at: new Date().toISOString()
  };
  
  // Only include fields that were provided
  if (creditData.clientName !== undefined) dbData.client_name = creditData.clientName;
  if (creditData.clientId !== undefined) dbData.client_id = creditData.clientId;
  if (creditData.documentNumber !== undefined) dbData.document_number = creditData.documentNumber;
  if (creditData.creditType !== undefined) dbData.credit_type = creditData.creditType;
  if (creditData.creditAmount !== undefined) dbData.credit_amount = creditData.creditAmount;
  if (creditData.originalAmount !== undefined) dbData.original_amount = creditData.originalAmount;
  
  // Handle dates properly
  if (creditData.periodStart !== undefined) {
    dbData.period_start = typeof creditData.periodStart === 'string' 
      ? creditData.periodStart 
      : creditData.periodStart instanceof Date 
        ? creditData.periodStart.toISOString() 
        : null;
  }
  
  if (creditData.periodEnd !== undefined) {
    dbData.period_end = typeof creditData.periodEnd === 'string' 
      ? creditData.periodEnd 
      : creditData.periodEnd instanceof Date 
        ? creditData.periodEnd.toISOString() 
        : null;
  }
  
  // Ensure status is lowercase
  if (creditData.status !== undefined) {
    dbData.status = creditData.status.toLowerCase();
    
    // Set approved_at if status is approved
    if (creditData.status.toLowerCase() === 'approved') {
      dbData.approved_at = new Date().toISOString();
    }
  }
  
  if (creditData.notes !== undefined) dbData.notes = creditData.notes;
  
  return dbData;
};
