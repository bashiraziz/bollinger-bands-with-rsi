export function calculateBollingerBands(prices: number[], period = 20, multiplier = 2) {
  if (prices.length < period) {
    throw new Error(`Not enough data points for ${period}-day Bollinger Bands calculation`)
  }

  // Reverse prices to have oldest first, like the RSI calculation
  const oldestFirst = [...prices].reverse()

  // Calculate SMA and standard deviation for each point
  const result = oldestFirst.map((_, currentIndex, array) => {
    // Get the window of prices for this calculation point
    // We want 'period' number of prices up to and including the current price
    const endIndex = currentIndex + 1
    const startIndex = Math.max(0, endIndex - period)
    const priceWindow = array.slice(startIndex, endIndex)

    // Only calculate if we have enough data points
    if (priceWindow.length < period) {
      return { sma: array[currentIndex], std: 0 }
    }

    // Calculate SMA
    const sma = priceWindow.reduce((sum, price) => sum + price, 0) / priceWindow.length

    // Calculate standard deviation
    const squaredDiffs = priceWindow.map((price) => Math.pow(price - sma, 2))
    const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / priceWindow.length
    const standardDeviation = Math.sqrt(variance)

    return { sma, std: standardDeviation }
  })

  // Generate the bands
  const middle = result.map((r) => r.sma)
  const upper = result.map((r, i) => r.sma + multiplier * r.std)
  const lower = result.map((r, i) => r.sma - multiplier * r.std)

  // Reverse the results back to newest first to match the original order
  return {
    upper: upper.reverse(),
    middle: middle.reverse(),
    lower: lower.reverse(),
  }
}

export function calculateRSI(prices: number[], period = 14): number[] {
  if (prices.length < period + 1) {
    return Array(prices.length).fill(null)
  }

  // Reverse the prices array to have oldest data first
  const oldestFirst = [...prices].reverse()

  // Calculate price changes
  const deltas = oldestFirst.slice(1).map((price, index) => price - oldestFirst[index])
  const gains = deltas.map((delta) => (delta > 0 ? delta : 0))
  const losses = deltas.map((delta) => (delta < 0 ? -delta : 0))

  let avgGain = gains.slice(0, period).reduce((sum, gain) => sum + gain, 0) / period
  let avgLoss = losses.slice(0, period).reduce((sum, loss) => sum + loss, 0) / period

  const rsiValues: number[] = []
  rsiValues.push(100 - 100 / (1 + avgGain / (avgLoss || 1e-6)))

  for (let i = period; i < oldestFirst.length - 1; i++) {
    avgGain = (avgGain * (period - 1) + gains[i]) / period
    avgLoss = (avgLoss * (period - 1) + losses[i]) / period
    const rs = avgGain / (avgLoss || 1e-6)
    rsiValues.push(100 - 100 / (1 + rs))
  }

  // Add null values for the initial period where RSI is not calculated
  return Array(period).fill(null).concat(rsiValues).reverse()
}

