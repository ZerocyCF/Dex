import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Web3Provider } from '@/components/Web3Provider'
import AnimatedBackground from '@/components/AnimatedBackground'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nexus DEX | Decentralized Exchange',
  description: 'Ultra-modern decentralized exchange with glassmorphism design',
  keywords: ['DeFi', 'DEX', 'Swap', 'Ethereum', 'Web3'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-x-hidden">
        {/* Animated Background Elements (client component with smoother motion & parallax) */}
        <AnimatedBackground />

        <Web3Provider>
          <main className="relative z-10">
            {children}
          </main>
        </Web3Provider>
        
        <Toaster 
          position="bottom-right"
          toastOptions={{
            className: 'glassmorphism-dark text-sm',
            style: {
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#00ff9d',
                secondary: '#000',
              },
            },
            error: {
              iconTheme: {
                primary: '#ff4757',
                secondary: '#000',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
