import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <Link href="/">
          <Button>Back to Chart</Button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6">About Our Stock Analysis Application</h1>

      <p className="mb-4">
        Our stock analysis application uses various data points and calculations to provide insights into stock
        performance. Here&apos;s a comprehensive list of the data fetched and used for our calculations:
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">1. Data Fetched</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Closing prices: The daily closing prices of the stock for the selected time range.</li>
        <li>Dates: The corresponding dates for each closing price.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">2. Data Used for Calculations</h2>
      <h3 className="text-xl font-semibold mb-2">a. For Bollinger Bands:</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Closing prices: Used to calculate the Simple Moving Average (SMA) and standard deviation.</li>
        <li>Selected Bollinger Band period: Used to determine the number of days for the SMA calculation.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">b. For Relative Strength Index (RSI):</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Closing prices: Used to calculate price changes and determine gains and losses.</li>
        <li>Selected RSI period: Used to determine the number of days for the RSI calculation.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">3. Calculated Data</h2>
      <h3 className="text-xl font-semibold mb-2">a. Bollinger Bands:</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Upper Band: SMA + (standard deviation * 2)</li>
        <li>Middle Band: Simple Moving Average (SMA)</li>
        <li>Lower Band: SMA - (standard deviation * 2)</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">b. RSI:</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>RSI values: Ranging from 0 to 100, indicating overbought (above 70) or oversold (below 30) conditions.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">4. Additional Data Used in the Chart</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Stock ticker symbol: Used for labeling and identification.</li>
        <li>Time range: Used to determine the amount of historical data to fetch and display.</li>
      </ul>

      <p className="mt-6">
        This data is fetched from the Polygon API, processed using our calculation functions, and then used to create
        the chart and provide the stock analysis. The user can adjust the time range, Bollinger Band period, and RSI
        period, which affects how this data is calculated and displayed.
      </p>

      <div className="mt-8">
        <Link href="/">
          <Button>Back to Chart</Button>
        </Link>
      </div>
    </div>
  )
}
