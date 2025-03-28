import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { contractService } from '@/services/contracts'
import { ContractFilters, CreateContractData, UpdateContractData } from '@/types/contract'

export function useContracts(filters: ContractFilters = {}) {
  const queryClient = useQueryClient()
  return {
    ...useQuery({
      queryKey: ['contracts', filters],
      queryFn: () => contractService.listContracts(filters)
    }),
    createContract: useMutation({
      mutationFn: (data: CreateContractData) => contractService.createContract(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['contracts'] })
        toast.success('Contrato criado com sucesso')
      }
    }).mutate,
    updateContract: useMutation({
      mutationFn: ({ id, data }: { id: string; data: UpdateContractData }) =>
        contractService.updateContract(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['contracts'] })
        toast.success('Contrato atualizado com sucesso')
      }
    }).mutate
  }
}

export function useContract(id: string) {
  return useQuery({
    queryKey: ['contracts', id],
    queryFn: () => contractService.getContract(id),
    enabled: !!id
  })
} 