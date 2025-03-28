
import { useMemo } from 'react';
import { TaxCredit, TaxCreditSummary } from '@/types/tax-credits';

export const useTaxCreditSummary = (credits: TaxCredit[]) => {
  const summary = useMemo(() => {
    // Total credits amount calculation
    const totalAmount = credits.reduce((acc, credit) => acc + credit.creditAmount, 0);
    
    // Count credits by status
    const pendingCount = credits.filter(credit => credit.status === 'PENDING').length;
    const approvedCount = credits.filter(credit => credit.status === 'APPROVED').length;
    const rejectedCount = credits.filter(credit => credit.status === 'REJECTED').length;
    const analyzingCount = credits.filter(credit => credit.status === 'ANALYZING').length;
    const recoveredCount = credits.filter(credit => credit.status === 'RECOVERED').length;
    
    // Approved credits amount calculation
    const approvedAmount = credits
      .filter(credit => credit.status === 'APPROVED')
      .reduce((acc, credit) => acc + credit.creditAmount, 0);
    
    return {
      // Summary card data
      total: credits.length,
      approved: approvedCount,
      pending: pendingCount,
      rejected: rejectedCount,
      analyzing: analyzingCount,
      recovered: recoveredCount,
      
      // Legacy compatibility fields
      totalCredits: credits.length,
      pendingCredits: pendingCount,
      approvedCredits: approvedCount,
      rejectedCredits: rejectedCount,
      recoveredCredits: recoveredCount,
      pendingCount,
      approvedCount,
      rejectedCount,
      totalValue: totalAmount,
      pendingValue: totalAmount - approvedAmount,
      approvedValue: approvedAmount,
    };
  }, [credits]);

  return summary;
};
