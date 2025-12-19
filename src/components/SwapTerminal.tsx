'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownUp, Zap, Shield, AlertTriangle, Lock, ChevronDown, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import { validateSwapInput, calculatePriceImpact } from '@/utils/validation'
import { formatCurrency, formatPercentage } from '@/utils/format'
import { TOKENS } from '@/utils/constants'

export function SwapTerminal() {
  const [fromToken, setFromToken] = useState(TOKENS[0])
  const [toToken, setToToken] = useState(TOKENS[1])
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [isSwapping, setIsSwapping] = useState(false)
  const [slippage, setSlippage] = useState(0.5)
  const [deadline, setDeadline] = useState(20)
  const [priceImpact, setPriceImpact] = useState(0)
  const [ratesLoaded, setRatesLoaded] = useState(false)
  
  // Mock user balance
  const userBalances = {
    ETH: 2.5,
    USDC: 1500,
    DAI: 1200,
    WBTC: 0.05,
  }

  // Mock exchange rates
  const exchangeRates = {
    'ETH-USDC': 3200,
    'USDC-ETH': 0.0003125,
    'ETH-DAI': 3200,
    'DAI-ETH': 0.0003125,
    'ETH-WBTC': 0.06,
    'WBTC-ETH': 16.67,
  }

  useEffect(() => {
    // Simulate API call for rates
    const timer = setTimeout(() => {
      setRatesLoaded(true)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (fromAmount && parseFloat(fromAmount) > 0 && ratesLoaded) {
      const rateKey = `${fromToken.symbol}-${toToken.symbol}`
      const rate = exchangeRates[rateKey as keyof typeof exchangeRates] || 1
      const calculated = parseFloat(fromAmount) * rate
      setToAmount(calculated.toFixed(6))
      
      // Calculate price impact (simulated)
      const impact = calculatePriceImpact(parseFloat(fromAmount), userBalances[fromToken.symbol as keyof typeof userBalances])
      setPriceImpact(impact)
    } else {
      setToAmount('')
      setPriceImpact(0)
    }
  }, [fromAmount, fromToken, toToken, ratesLoaded])

  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount(toAmount)
  }

  const handleMaxClick = () => {
    const balance = userBalances[fromToken.symbol as keyof typeof userBalances]
    setFromAmount(balance.toString())
  }

  const handleSwap = async () => {
    // Input validation
    const validation = validateSwapInput(
      parseFloat(fromAmount),
      fromToken.symbol,
      userBalances[fromToken.symbol as keyof typeof userBalances],
      priceImpact
    )
    
    if (!validation.isValid) {
      toast.error(validation.message)
      return
    }

    if (priceImpact > 5) {
      toast.error('Price impact too high! Consider reducing swap amount.')
      return
    }

    setIsSwapping(true)
    
    // Simulate swap transaction
    setTimeout(() => {
      toast.success(
        <div>
          <p className="font-semibold">Swap Successful!</p>
          <p className="text-sm opacity-80">
            Swapped {fromAmount} {fromToken.symbol} for {toAmount} {toToken.symbol}
          </p>
        </div>,
        { duration: 5000 }
      )
      setIsSwapping(false)
      setFromAmount('')
      setToAmount('')
    }, 2000)
  }

  const isSwapDisabled = 
    !fromAmount || 
    parseFloat(fromAmount) <= 0 || 
    isSwapping || 
    priceImpact > 5 || 
    !ratesLoaded ||
    parseFloat(fromAmount) > userBalances[fromToken.symbol as keyof typeof userBalances]

  return (
    <div className="glassmorphism-dark rounded-3xl p-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink" />
      
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Swap</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <Shield size={16} className="text-neon-green" />
            <span>Secure Swap</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Zap size={16} className="text-neon-cyan" />
            <span>Instant</span>
          </div>
        </div>
      </div>

      {/* From Token */}
      <div className="glassmorphism rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <label className="text-sm text-gray-400">From</label>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">
              Balance: {formatCurrency(userBalances[fromToken.symbol as keyof typeof userBalances])}
            </span>
            <button
              onClick={handleMaxClick}
              className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
            >
              MAX
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => {
              const value = e.target.value
              if (validateSwapInput(parseFloat(value), fromToken.symbol, userBalances[fromToken.symbol as keyof typeof userBalances], priceImpact).isValid) {
                setFromAmount(value)
              }
            }}
            placeholder="0.0"
            className="w-full bg-transparent text-3xl font-bold outline-none placeholder:text-gray-600"
            min="0"
            step="any"
          />
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 glassmorphism px-4 py-3 rounded-xl hover:bg-white/10 transition-colors">
              <img src={fromToken.icon} alt={fromToken.name} className="w-6 h-6 rounded-full" />
              <span className="font-semibold">{fromToken.symbol}</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <div className="relative my-4">
        <button
          onClick={handleSwapTokens}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 p-3 rounded-full glassmorphism border-4 border-background hover:scale-110 transition-transform duration-200"
        >
          <ArrowDownUp size={20} className="text-neon-cyan" />
        </button>
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* To Token */}
      <div className="glassmorphism rounded-2xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <label className="text-sm text-gray-400">To (Estimated)</label>
          <span className="text-sm text-gray-400">
            Balance: {formatCurrency(userBalances[toToken.symbol as keyof typeof userBalances])}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={toAmount}
            readOnly
            placeholder="0.0"
            className="w-full bg-transparent text-3xl font-bold outline-none placeholder:text-gray-600"
          />
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 glassmorphism px-4 py-3 rounded-xl">
              <img src={toToken.icon} alt={toToken.name} className="w-6 h-6 rounded-full" />
              <span className="font-semibold">{toToken.symbol}</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Swap Details */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Rate</span>
          <span className="font-mono">
            {ratesLoaded ? `1 ${fromToken.symbol} = ${exchangeRates[`${fromToken.symbol}-${toToken.symbol}` as keyof typeof exchangeRates] || 1} ${toToken.symbol}` : 'Loading...'}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Slippage Tolerance</span>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={slippage}
              onChange={(e) => setSlippage(parseFloat(e.target.value))}
              className="w-24 accent-primary"
            />
            <span className="w-12 text-right">{slippage}%</span>
          </div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Transaction Deadline</span>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="1"
              max="60"
              value={deadline}
              onChange={(e) => setDeadline(parseInt(e.target.value))}
              className="w-24 accent-primary"
            />
            <span className="w-12 text-right">{deadline}m</span>
          </div>
        </div>
        
        <div className={`flex justify-between text-sm ${priceImpact > 5 ? 'text-red-400' : 'text-gray-400'}`}>
          <div className="flex items-center space-x-2">
            <span>Price Impact</span>
            {priceImpact > 5 && <AlertTriangle size={14} />}
          </div>
          <span className={priceImpact > 5 ? 'text-red-400' : ''}>
            {formatPercentage(priceImpact)}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Network Fee</span>
          <span>$0.42</span>
        </div>
      </div>

      {/* Swap Button */}
      <motion.button
        onClick={handleSwap}
        disabled={isSwapDisabled}
        whileTap={{ scale: isSwapDisabled ? 1 : 0.98 }}
        className={`w-full py-5 rounded-xl text-lg font-bold transition-all duration-300 ${
          isSwapDisabled
            ? 'bg-gray-800 cursor-not-allowed text-gray-400'
            : priceImpact > 5
            ? 'bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800'
            : 'bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink hover:shadow-[0_0_40px] hover:shadow-neon-purple/30'
        }`}
      >
        {isSwapping ? (
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw size={20} className="animate-spin" />
            <span>Swapping...</span>
          </div>
        ) : !ratesLoaded ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            <span>Loading Rates...</span>
          </div>
        ) : priceImpact > 5 ? (
          <div className="flex items-center justify-center space-x-2">
            <Lock size={20} />
            <span>Price Impact Too High</span>
          </div>
        ) : (
          'Swap Now'
        )}
      </motion.button>

      {/* Security Badge */}
      <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Shield size={16} />
          <span>Smart Contract Audited • No KYC Required • Non-Custodial</span>
        </div>
      </div>
    </div>
  )
      }
