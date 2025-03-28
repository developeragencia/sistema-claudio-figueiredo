import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Sistema Cláudio Figueiredo',
    template: '%s | Sistema Cláudio Figueiredo',
  },
  description: 'Sistema de gestão empresarial',
  keywords: ['gestão', 'empresarial', 'propostas', 'clientes', 'contratos'],
  authors: [{ name: 'Cláudio Figueiredo' }],
  creator: 'Cláudio Figueiredo',
  publisher: 'Cláudio Figueiredo',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  manifest: '/manifest.json',
}; 