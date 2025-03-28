
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ActiveClientHeader from '@/components/ActiveClientHeader';
import DetailHeader from '@/components/declarations/DetailHeader';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

// Import refactored components
import CreditDetailsCard from '@/components/tax-credits/CreditDetailsCard';
import FinancialSummaryCard from '@/components/tax-credits/FinancialSummaryCard';
import CreditDocumentsTab from '@/components/tax-credits/CreditDocumentsTab';
import CreditHistoryTab from '@/components/tax-credits/CreditHistoryTab';
import CreditNotFound from '@/components/tax-credits/CreditNotFound';
import CompanyInfoCard from '@/components/declarations/CompanyInfoCard';

// Import hooks and forms
import { useCreditDetail } from '@/hooks/useCreditDetail';
import StatusChangeDialog from '@/components/admin/tax-credits/components/StatusChangeDialog';
import DeleteConfirmDialog from '@/components/admin/tax-credits/components/DeleteConfirmDialog';
import TaxCreditForm from '@/components/admin/tax-credits/forms/TaxCreditForm';

const CreditDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const {
    credit,
    documents,
    history,
    isLoading,
    formatCurrency,
    formatDate,
    formatDateTime,
    handleStatusChange,
    handleEditCredit
  } = useCreditDetail(id);
  
  const handleExportReport = () => {
    toast({
      title: "Relatório gerado",
      description: "O relatório do crédito foi gerado e está pronto para download.",
    });
  };
  
  const handleDeleteCredit = (creditId: string) => {
    toast({
      title: "Crédito excluído",
      description: "O crédito tributário foi excluído com sucesso.",
      variant: "destructive",
    });
    navigate('/admin');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <ActiveClientHeader />
        <div className="container mx-auto p-4 sm:p-6 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full mb-4"></div>
            <p className="text-muted-foreground">Carregando detalhes do crédito...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!credit) {
    return (
      <div className="min-h-screen bg-background">
        <ActiveClientHeader />
        <CreditNotFound />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <ActiveClientHeader />
      <div className="container mx-auto p-4 sm:p-6">
        <DetailHeader title="Detalhes do Crédito" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <CreditDetailsCard 
              credit={credit}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
              onEditClick={() => setIsEditDialogOpen(true)}
              onStatusChangeClick={() => setIsStatusDialogOpen(true)}
              onExportReportClick={handleExportReport}
              onDeleteClick={() => setIsDeleteDialogOpen(true)}
            />
            
            <Tabs defaultValue="documents" className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="documents">Documentos</TabsTrigger>
                <TabsTrigger value="history">Histórico</TabsTrigger>
              </TabsList>
              
              <TabsContent value="documents" className="pt-4">
                <CreditDocumentsTab 
                  documents={documents}
                  formatDate={formatDate}
                />
              </TabsContent>
              
              <TabsContent value="history" className="pt-4">
                <CreditHistoryTab 
                  history={history}
                  formatDateTime={formatDateTime}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card className="mb-6">
              <CompanyInfoCard declaration={credit as any} />
            </Card>
            
            <FinancialSummaryCard 
              credit={credit}
              formatCurrency={formatCurrency}
            />
          </div>
        </div>
      </div>
      
      {/* Dialogs */}
      <StatusChangeDialog
        open={isStatusDialogOpen}
        onClose={() => setIsStatusDialogOpen(false)}
        credit={credit}
        onStatusChange={handleStatusChange}
      />
      
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        credit={credit}
        onConfirm={handleDeleteCredit}
      />
      
      <TaxCreditForm
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleEditCredit}
        initialData={credit}
        isEdit={true}
      />
    </div>
  );
};

export default CreditDetails;
