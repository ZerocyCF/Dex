export const formatCurrency = (value: number | string | undefined): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value ?? 0
  if (isNaN(Number(num))) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(Number(num))
}

export const formatPercentage = (value: number | undefined): string => {
  const num = value ?? 0
  if (isNaN(Number(num))) return '0%'
  return `${Number(num).toFixed(2)}%`
}
