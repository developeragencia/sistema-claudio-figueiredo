'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Metadata } from 'next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: 'Dashboard | Secure Bridge Connect',
}

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/login')
  }, [router])

  return null
} 