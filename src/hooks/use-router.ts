'use client'

import { useRouter as useNextRouter, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export function useNavigate() {
  const router = useNextRouter()
  return (path: string) => router.push(path)
}

export function useParams<T extends Record<string, string>>(): T {
  const pathname = usePathname()
  const segments = pathname.split('/')
  return segments.reduce((params, segment, index) => {
    if (segment.startsWith(':')) {
      const paramName = segment.slice(1)
      params[paramName] = segments[index + 1] || ''
    }
    return params
  }, {} as T)
}

export function useLocation() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  return {
    pathname,
    search: searchParams.toString(),
    hash: typeof window !== 'undefined' ? window.location.hash : ''
  }
}

export { usePathname, useSearchParams, Link } 