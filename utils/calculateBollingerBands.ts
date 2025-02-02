export function calculateBollingerBands(prices: number[], period = 20, multiplier = 2) {
  // Ensure we have enough data points for the selected period
  if (prices.length < period) {
    throw new Error(`Not enough data points for ${period}-day Bollinger Bands calculation`)
  }

  const sma = prices.map((_, index, array) => {
    const start = Math.max(0, index - period + 1)
    const slice = array.slice(start, index + 1)
    return slice.reduce((sum, price) => sum + price, 0) / slice.length
  })

  const standardDeviation = prices.map((_, index, array) => {
    const start = Math.max(0, index - period + 1)
    const slice = array.slice(start, index + 1)
    const mean = sma[index]
    const squareDiffs = slice.map((value) => Math.pow(value - mean, 2))
    const variance = squareDiffs.reduce((sum, squareDiff) => sum + squareDiff, 0) / slice.length
    return Math.sqrt(variance)
  })

  const upper = sma.map((value, index) => value + multiplier * standardDeviation[index])
  const lower = sma.map((value, index) => value - multiplier * standardDeviation[index])

  return { upper, middle: sma, lower }
}

