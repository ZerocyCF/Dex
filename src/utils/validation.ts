export interface ValidationResult {
  isValid: boolean
  message: string
}

export const validateSwapInput = (
  amount: number,
  tokenSymbol: string,
  userBalance: number,
  priceImpact: number
): ValidationResult => {
  if (!amount || isNaN(amount)) {
    return { isValid: false, message: 'Please enter a valid amount' }
  }

  if (amount <= 0) {
    return { isValid: false, message: 'Amount must be greater than 0' }
  }

  if (amount > userBalance) {
    return { 
      isValid: false, 
      message: `Insufficient ${tokenSymbol} balance. Maximum: ${userBalance.toFixed(4)}` 
    }
  }

  if (priceImpact > 50) {
    return { isValid: false, message: 'Price impact exceeds maximum limit (50%)' }
  }

  return { isValid: true, message: 'Valid input' }
}

export const calculatePriceImpact = (
  swapAmount: number,
  poolReserve: number
): number => {
  if (!poolReserve || poolReserve === 0) return 0
  
  // Simplified price impact formula (x*y=k)
  const impact = (swapAmount / (poolReserve + swapAmount)) * 100
  return Math.min(impact, 100)
}

export const validateAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export const validateSlippage = (slippage: number): ValidationResult => {
  if (slippage < 0.01) {
    return { isValid: false, message: 'Slippage too low (min 0.01%)' }
  }
  
  if (slippage > 50) {
    return { isValid: false, message: 'Slippage too high (max 50%)' }
  }
  
  return { isValid: true, message: 'Valid slippage' }
}
