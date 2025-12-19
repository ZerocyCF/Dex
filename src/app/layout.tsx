import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Web3Provider } from '@/components/Web3Provider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
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
    <html lang="en" className={`${inter.variable} ${geist.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-x-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-grid bg-[size:50px_50px] opacity-10" />
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-neon-purple/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-float animation-delay-2000" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-neon-pink/10 rounded-full blur-3xl animate-float animation-delay-4000" />
        </div>
        
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
