import './globals.css'

import { Inter } from 'next/font/google'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Vivisce',
  description:
    'Transforme seu sentimento em palavras e crie o pedido de namoro perfeito. O amor começa com o gesto certo!'
}

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin-ext'],
  display: 'swap'
})

function AppLayout(props: React.PropsWithChildren) {
  return (
    <html lang="en" className={inter.className}>
      <body>{props.children}</body>
    </html>
  )
}

export default AppLayout
