import React, { useState, useMemo } from 'react';
import { useTransactions } from '@/hooks/useTransactions';
import TransactionTable from '@/components/transactions/TransactionTable';
import TransactionDetails from '@/components/transactions/TransactionDetails';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useClientStore } from '@/hooks/useClientStore';
import ActiveClientHeader from '@/components/ActiveClientHeader';
import { useNavigate  } from "@/hooks/use-router";
import { ArrowLeft } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

export default function Transactions() {
  const { activeClient } = useClientStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedClientId, setSelectedClientId] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    data: transactionsData,
    isLoading,
    isError,
    error
  } = useTransactions({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: searchTerm,
    status: selectedStatus,
    type: selectedType,
    clientId: selectedClientId
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedTransaction(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setCurrentPage(1);
  };

  const handleClientChange = (value: string) => {
    setSelectedClientId(value);
    setCurrentPage(1);
  };

  if (isError) {
    toast({
      variant: "destructive",
      title: "Erro ao carregar transações",
      description: error?.message || "Ocorreu um erro ao carregar as transações. Tente novamente mais tarde."
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <ActiveClientHeader />
      <div className="container mx-auto p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Transações</h1>
            <p className="text-muted-foreground mt-1">
              Visualize e gerencie todas as transações de créditos tributários
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-4">
            <Input
              placeholder="Buscar transações..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <Select value={selectedStatus} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="completed">Concluída</SelectItem>
                <SelectItem value="failed">Falha</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="deposit">Depósito</SelectItem>
                <SelectItem value="withdrawal">Saque</SelectItem>
                <SelectItem value="transfer">Transferência</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedClientId} onValueChange={handleClientChange}>
              <SelectTrigger>
                <SelectValue placeholder="Cliente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                {/* Adicionar itens dinamicamente com base nos clientes disponíveis */}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <TransactionTable
            transactions={transactionsData?.transactions || []}
            onTransactionClick={handleTransactionClick}
            currentPage={currentPage}
            totalPages={Math.ceil((transactionsData?.total || 0) / ITEMS_PER_PAGE)}
            onPageChange={handlePageChange}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        )}

        {selectedTransaction && (
          <TransactionDetails
            transaction={selectedTransaction}
            isOpen={isDetailsOpen}
            onClose={handleCloseDetails}
          />
        )}
      </div>
    </div>
  );
}
