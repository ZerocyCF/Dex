'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Copy, Check, ExternalLink, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'

export function WalletConnection() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState('')
  const [copied, setCopied] = useState(false)

  // Mock connection
  const mockAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'

  const handleConnect = async () => {
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnected(true)
      setAddress(mockAddress)
      toast.success('Wallet connected successfully!')
    }, 500)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setAddress('')
    toast('Wallet disconnected')
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    toast.success('Address copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <div className="relative">
      {isConnected ? (
        <div className="flex items-center space-x-3">
          {/* Network Indicator */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-green-400">Mainnet</span>
          </div>

          {/* Address Display */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 glassmorphism px-4 py-2 rounded-xl"
          >
            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse-glow" />
            <span className="font-mono text-sm">{formatAddress(address)}</span>
            
            {/* Copy Button */}
            <button
              onClick={handleCopyAddress}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              {copied ? (
                <Check size={16} className="text-neon-green" />
              ) : (
                <Copy size={16} className="text-gray-400" />
              )}
            </button>

            {/* View on Explorer */}
            <a
              href={`https://etherscan.io/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <ExternalLink size={16} className="text-gray-400" />
            </a>

            {/* Disconnect */}
            <button
              onClick={handleDisconnect}
              className="p-1 hover:bg-red-500/20 rounded transition-colors group"
            >
              <LogOut size={16} className="text-gray-400 group-hover:text-red-400" />
            </button>
          </motion.div>

          {/* Balance */}
          <div className="hidden md:block glassmorphism px-4 py-2 rounded-xl">
            <div className="text-sm text-gray-400">Balance</div>
            <div className="font-bold">$4,892.56</div>
          </div>
        </div>
      ) : (
        <motion.button
          onClick={handleConnect}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative glassmorphism px-6 py-3 rounded-xl flex items-center space-x-2 backdrop-blur-md">
            <Wallet size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Connect Wallet</span>
          </div>
        </motion.button>
      )}
    </div>
  )
}
