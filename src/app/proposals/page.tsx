import { Metadata } from 'next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { ProposalList } from '@/components/proposals/ProposalList'

export const metadata: Metadata = {
  title: 'Propostas | Sistema Cláudio Figueiredo',
  description: 'Gerenciamento de propostas',
}

export default async function ProposalsPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: proposals } = await supabase
    .from('proposals')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Propostas</h1>
      <ProposalList proposals={proposals || []} />
    </div>
  )
} 