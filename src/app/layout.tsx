'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from './contexts/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Secure Bridge Connect',
  description: 'Sistema de gestão de documentos e processos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
} 