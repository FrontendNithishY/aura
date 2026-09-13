import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aura - Social Community Platform',
  description: 'A modern social community platform combining forums, microblogging, and visual media.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="app-container">
          <Navigation />
          <main className="main-content">
            {children}
          </main>
          {/* Mobile bottom navigation will go here or inside Navigation component */}
        </div>
      </body>
    </html>
  )
}
