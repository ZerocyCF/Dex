''use client'

import { createConfig, WagmiConfig, configureChains } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
})

// Configure chains with providers; using Alchemy demo key + public provider as fallback.
// Replace 'demo' with your real ALCHEMY_API_KEY in production.
const { publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: 'demo' }),
    publicProvider(),
  ]
)

const config = createConfig({
  publicClient,
  // connecters can be added later when wiring wallets (MetaMask, WalletConnect, etc.)
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiConfig>
  )
}
