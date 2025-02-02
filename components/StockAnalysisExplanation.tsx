import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

interface StockData {
  date: string
  price: number
  upper: number
  middle: number
  lower: number
  rsi: number | null
}

interface StockAnalysisExplanationProps {
  data: StockData[]
  ticker: string
  rsiPeriod: number
}

export function StockAnalysisExplanation({ data, ticker, rsiPeriod }: StockAnalysisExplanationProps) {
  const latestData = data[0]
  const previousData = data[1]

  if (!latestData || !previousData) {
    return null
  }

  // Add small buffer to avoid floating point comparison issues
  const buffer = 0.0001
  const isOverBought = latestData.rsi !== null && latestData.rsi > 70
  const isOverSold = latestData.rsi !== null && latestData.rsi < 30
  const isTrendingUp = latestData.price > previousData.price
  const isTrendingDown = latestData.price < previousData.price
  const isWithinBands = latestData.price > latestData.lower - buffer && latestData.price < latestData.upper + buffer
  const isAboveBands = latestData.price >= latestData.upper + buffer
  const isBelowBands = latestData.price <= latestData.lower - buffer

  const rsiValue = latestData.rsi !== null ? latestData.rsi.toFixed(2) : "N/A"

  return (
    <Card className="w-full max-w-4xl mt-8">
      <CardHeader>
        <CardTitle>Analysis for {ticker}</CardTitle>
        <CardDescription>Based on Bollinger Bands and RSI</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            <strong>Current Price:</strong> ${latestData.price.toFixed(2)}
          </p>
          <p>
            <strong>Bollinger Bands:</strong> The stock is currently
            {isWithinBands && " within the Bollinger Bands, suggesting normal volatility."}
            {isAboveBands &&
              " above the upper Bollinger Band, which might indicate overbought conditions or a strong uptrend."}
            {isBelowBands &&
              " below the lower Bollinger Band, which might indicate oversold conditions or a strong downtrend."}
          </p>
          {latestData.rsi !== null && (
            <p>
              <strong>RSI:</strong> The current {rsiPeriod}-day RSI is {rsiValue}.
              {isOverBought && " This suggests the stock may be overbought and could be due for a pullback."}
              {isOverSold && " This suggests the stock may be oversold and could be due for a bounce."}
              {!isOverBought &&
                !isOverSold &&
                " This is within the neutral range, suggesting balanced buying and selling pressure."}
            </p>
          )}
          <p>
            <strong>Recent Trend:</strong> The stock is currently
            {isTrendingUp && " trending upwards, which could indicate bullish momentum."}
            {isTrendingDown && " trending downwards, which could indicate bearish pressure."}
            {!isTrendingUp && !isTrendingDown && " stable, showing no significant trend in the very short term."}
          </p>
          <p>
            <strong>Potential Strategy:</strong>
            {isOverBought &&
              isAboveBands &&
              " Consider taking profits or setting tighter stop losses as the stock might be due for a correction."}
            {isOverSold &&
              isBelowBands &&
              " This could present a buying opportunity, but be aware of potential further downside."}
            {isWithinBands &&
              !isOverBought &&
              !isOverSold &&
              " The stock is showing normal behavior. Consider your longer-term analysis and overall market conditions for decision-making."}
            {((isOverBought && !isAboveBands) || (isOverSold && !isBelowBands)) &&
              " There's a divergence between price action and momentum. Watch for potential trend reversals."}
          </p>
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Note: This analysis is based on technical indicators and should be used in conjunction with fundamental
              analysis and overall market conditions. Past performance does not guarantee future results.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  )
}

