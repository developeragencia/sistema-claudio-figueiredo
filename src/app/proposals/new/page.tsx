import { Metadata } from 'next'
import { ProposalForm } from '@/components/proposals/ProposalForm'

export const metadata: Metadata = {
  title: 'Nova Proposta | Sistema Cláudio Figueiredo',
  description: 'Criar nova proposta comercial',
}

export default function NewProposalPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Nova Proposta</h1>
      <ProposalForm />
    </div>
  )
} 