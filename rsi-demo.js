function calculateRSI(prices, period = 14) {
  if (prices.length < period + 1) {
    return Array(prices.length).fill(null)
  }

  const deltas = prices.slice(1).map((price, index) => price - prices[index])
  const gains = deltas.map((delta) => (delta > 0 ? delta : 0))
  const losses = deltas.map((delta) => (delta < 0 ? -delta : 0))

  let avgGain = gains.slice(0, period).reduce((sum, gain) => sum + gain, 0) / period
  let avgLoss = losses.slice(0, period).reduce((sum, loss) => sum + loss, 0) / period

  const rsiValues = []
  rsiValues.push(100 - 100 / (1 + avgGain / (avgLoss || 1e-6)))

  for (let i = period; i < prices.length - 1; i++) {
    avgGain = (avgGain * (period - 1) + gains[i]) / period
    avgLoss = (avgLoss * (period - 1) + losses[i]) / period
    const rs = avgGain / (avgLoss || 1e-6)
    rsiValues.push(100 - 100 / (1 + rs))
  }

  return Array(period).fill(null).concat(rsiValues)
}

// Generate mock price data
const generatePrices = (days) => {
  let price = 100
  return Array.from({ length: days }, () => {
    price += (Math.random() - 0.5) * 2
    return Number.parseFloat(price.toFixed(2))
  }).reverse() // Reverse to match the expected format (newest first)
}

const prices = generatePrices(50)
const rsiPeriod = 14
const rsiValues = calculateRSI(prices, rsiPeriod)

console.log("Date\t\tPrice\t\tRSI")
console.log("----\t\t-----\t\t---")
prices.forEach((price, index) => {
  const date = new Date()
  date.setDate(date.getDate() - (prices.length - 1 - index))
  const dateStr = date.toISOString().split("T")[0]
  const rsi = rsiValues[index] !== null ? rsiValues[index].toFixed(2) : "N/A"
  console.log(`${dateStr}\t$${price.toFixed(2)}\t${rsi}`)
})

console.log(`\nCurrent ${rsiPeriod}-day RSI: ${rsiValues[rsiValues.length - 1].toFixed(2)}`)

