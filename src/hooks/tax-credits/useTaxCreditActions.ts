
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useTaxCreditActions = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Start listening for real-time updates
  const startListening = useCallback(() => {
    console.log("Started listening to tax credits changes");
    setIsListening(true);
  }, []);

  // Stop listening for real-time updates
  const stopListening = useCallback(() => {
    console.log("Stopped listening to tax credits changes");
    setIsListening(false);
  }, []);

  // Refresh data
  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setIsLoading(false);
      startListening();
      
      toast.success('Dados atualizados', {
        description: 'Lista de créditos atualizada com sucesso',
      });
    }, 1000);
  }, [startListening]);

  // Navigate to create credit form
  const handleCreateCredit = useCallback(() => {
    console.log("Open create credit form");
    // This is handled in the component
  }, []);

  // Navigate to credit details
  const handleViewDetails = useCallback((creditId: string) => {
    navigate(`/credits/details/${creditId}`);
  }, [navigate]);

  // Export data
  const handleExportData = useCallback(() => {
    toast.info('Exportação iniciada', {
      description: 'Os dados estão sendo exportados. Você receberá uma notificação quando estiver pronto.',
    });
  }, []);

  return {
    isLoading,
    setIsLoading,
    isListening,
    setIsListening,
    startListening,
    stopListening,
    handleRefresh,
    handleCreateCredit,
    handleViewDetails,
    handleExportData
  };
};
