import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DataInfoProps {
  ticker: string
  timeRange: number
  bollingerPeriod: number
  rsiPeriod: number
  dataPoints: number
}

export function DataInfo({ ticker, timeRange, bollingerPeriod, rsiPeriod, dataPoints }: DataInfoProps) {
  return (
    <Card className="w-full max-w-4xl mt-8">
      <CardHeader>
        <CardTitle>Data Used for Calculations</CardTitle>
        <CardDescription>Information about the fetched and calculated data</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Stock Ticker:</strong> {ticker}
          </li>
          <li>
            <strong>Time Range:</strong> {timeRange} days
          </li>
          <li>
            <strong>Number of Data Points:</strong> {dataPoints}
          </li>
          <li>
            <strong>Data Fetched:</strong> Daily closing prices and corresponding dates
          </li>
          <li>
            <strong>Bollinger Bands Calculation:</strong>
            <ul className="list-circle pl-6 mt-1">
              <li>Period: {bollingerPeriod} days</li>
              <li>Used for: Simple Moving Average (SMA) and Standard Deviation</li>
            </ul>
          </li>
          <li>
            <strong>RSI Calculation:</strong>
            <ul className="list-circle pl-6 mt-1">
              <li>Period: {rsiPeriod} days</li>
              <li>Used for: Determining price changes, gains, and losses</li>
            </ul>
          </li>
          <li>
            <strong>Calculated Data:</strong>
            <ul className="list-circle pl-6 mt-1">
              <li>Bollinger Bands: Upper Band, Middle Band (SMA), Lower Band</li>
              <li>
                RSI: Values ranging from 0 to 100 (standard scale where 70+ indicates overbought and 30- indicates
                oversold conditions)
              </li>
            </ul>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

