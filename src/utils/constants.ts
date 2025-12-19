// Simple mock tokens for UI/demo purposes
export const TOKENS = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    // lightweight placeholder icon
    icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    icon: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
  },
  {
    symbol: 'DAI',
    name: 'Dai',
    icon: 'https://assets.coingecko.com/coins/images/9956/small/4943.png',
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    icon: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png',
  },
]

// Mock pool reserves used to calculate price impact (bigger numbers => lower impact)
export const POOL_RESERVES: Record<string, number> = {
  ETH: 5000,
  USDC: 5_000_000,
  DAI: 5_000_000,
  WBTC: 100,
}
