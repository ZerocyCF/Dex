'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { WalletConnection } from '@/components/WalletConnection'
import { TokenSelector } from '@/components/TokenSelector'
import { PriceChart } from '@/components/PriceChart'
import { LiquidityPool } from '@/components/LiquidityPool'
import { TransactionHistory } from '@/components/TransactionHistory'
import { SwapTerminal } from '@/components/SwapTerminal'
import { Menu, X, BarChart3, TrendingUp, Zap, Shield } from 'lucide-react'

// Dynamic imports for performance
const NetworkStatus = dynamic(() => import('@/components/NetworkStatus'), {
  ssr: false,
  loading: () => <div className="h-10 w-32 bg-white/5 rounded-lg animate-pulse" />
})

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen text-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 glassmorphism-dark border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-xl blur opacity-30" />
                  <div className="relative bg-black/50 rounded-xl p-3">
                    <Zap className="w-6 h-6 text-neon-cyan" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-neon-cyan to-white bg-clip-text text-transparent">
                    Nexus DEX
                  </h1>
                  <p className="text-xs text-gray-400">v2.0 • Ultra-fast</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <nav className="flex items-center space-x-6">
                <a href="#" className="flex items-center space-x-2 hover:text-neon-cyan transition-colors">
                  <TrendingUp size={18} />
                  <span>Markets</span>
                </a>
                <a href="#" className="flex items-center space-x-2 hover:text-neon-cyan transition-colors">
                  <BarChart3 size={18} />
                  <span>Analytics</span>
                </a>
                <a href="#" className="flex items-center space-x-2 hover:text-neon-cyan transition-colors">
                  <Shield size={18} />
                  <span>Security</span>
                </a>
              </nav>
              
              <div className="w-px h-6 bg-white/10" />
              
              <NetworkStatus />
              <WalletConnection />
            </div>

            <div className="lg:hidden">
              <WalletConnection />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-8">
            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glassmorphism-dark p-4 rounded-2xl">
                <p className="text-sm text-gray-400">24h Volume</p>
                <p className="text-2xl font-bold">$42.8M</p>
                <p className="text-xs text-neon-green">+12.4%</p>
              </div>
              <div className="glassmorphism-dark p-4 rounded-2xl">
                <p className="text-sm text-gray-400">Total Liquidity</p>
                <p className="text-2xl font-bold">$186.2M</p>
                <p className="text-xs text-neon-green">+8.2%</p>
              </div>
              <div className="glassmorphism-dark p-4 rounded-2xl">
                <p className="text-sm text-gray-400">Active Pairs</p>
                <p className="text-2xl font-bold">1,248</p>
                <p className="text-xs text-neon-green">+24</p>
              </div>
              <div className="glassmorphism-dark p-4 rounded-2xl">
                <p className="text-sm text-gray-400">Avg. Fee</p>
                <p className="text-2xl font-bold">0.18%</p>
                <p className="text-xs text-gray-400">$0.42 per swap</p>
              </div>
            </div>

            {/* Swap Terminal */}
            <SwapTerminal />

            {/* Chart */}
            <div className="glassmorphism-dark rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Market Analytics</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    24H
                  </button>
                  <button className="px-3 py-1 text-sm rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    7D
                  </button>
                  <button className="px-3 py-1 text-sm rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    1M
                  </button>
                </div>
              </div>
              <PriceChart />
            </div>
          </div>

          {/* Sidebar */}
          <div className={`lg:w-1/3 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="space-y-8">
              {/* Token Selector */}
              <div className="glassmorphism-dark rounded-3xl p-6">
                <h2 className="text-xl font-bold mb-6">Top Tokens</h2>
                <TokenSelector />
              </div>

              {/* Liquidity Pools */}
              <div className="glassmorphism-dark rounded-3xl p-6">
                <h2 className="text-xl font-bold mb-6">Liquidity Pools</h2>
                <LiquidityPool />
              </div>

              {/* Transaction History */}
              <div className="glassmorphism-dark rounded-3xl p-6">
                <h2 className="text-xl font-bold mb-6">Recent Swaps</h2>
                <TransactionHistory />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-3">
                <Zap className="w-8 h-8 text-neon-cyan" />
                <span className="text-2xl font-bold">Nexus DEX</span>
              </div>
              <p className="mt-2 text-sm text-gray-400">The future of decentralized trading</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Documentation</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">GitHub</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Discord</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-xs text-gray-500">
              © 2024 Nexus DEX. All smart contracts are audited. Trading involves risk.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
              }
