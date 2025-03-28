import { Metadata } from 'next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { ProposalDetails } from '@/components/proposals/ProposalDetails'

export const metadata: Metadata = {
  title: 'Detalhes da Proposta | Sistema Cláudio Figueiredo',
  description: 'Detalhes e gerenciamento da proposta',
}

export default async function ProposalPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: proposal } = await supabase
    .from('proposals')
    .select('*, clients(*)')
    .eq('id', params.id)
    .single()

  if (!proposal) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <ProposalDetails proposal={proposal} />
    </div>
  )
} 