import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function TradingStrategy() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <Link href="/">
          <Button>Back to Chart</Button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6">Bollinger Bands and RSI Trading Strategy Guide</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Understanding the Indicators</h2>

        <h3 className="text-xl font-semibold mb-2">Bollinger Bands</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Calculation:</strong> Typically a 20-period Simple Moving Average (SMA) with two outer bands set 2
            standard deviations above and below the SMA.
          </li>
          <li>
            <strong>Interpretation:</strong>
            <ul className="list-disc pl-6">
              <li>Price near upper band: Potentially overbought or upside stretch</li>
              <li>Price near lower band: Potentially oversold or downside stretch</li>
              <li>Contracted bands: Low volatility</li>
              <li>Expanded bands: High volatility</li>
            </ul>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Relative Strength Index (RSI)</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Calculation:</strong> Momentum oscillator ranging from 0 to 100, based on average gains vs. losses
            over a lookback period (often 14).
          </li>
          <li>
            <strong>Interpretation:</strong>
            <ul className="list-disc pl-6">
              <li>RSI above 70: Typically "overbought"</li>
              <li>RSI below 30: Typically "oversold"</li>
              <li>RSI crossing key levels (30, 50, 70): Potential momentum shifts</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Basic Strategy Logic</h2>
        <ol className="list-decimal pl-6">
          <li className="mb-2">
            <strong>Identify Overbought or Oversold Conditions</strong>
            <ul className="list-disc pl-6">
              <li>Oversold: Price near lower Bollinger Band AND RSI &lt; 30</li>
              <li>Overbought: Price near upper Bollinger Band AND RSI &gt; 70</li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>Look for Momentum Confirmation</strong>
            <ul className="list-disc pl-6">
              <li>Long trade: RSI crosses above threshold (e.g., 30 or 40) after being oversold</li>
              <li>Short trade: RSI crosses below threshold (e.g., 70 or 60) after being overbought</li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>Plan Entries and Exits</strong>
            <ul className="list-disc pl-6">
              <li>Entry: When both indicators confirm potential reversal</li>
              <li>Stop-Loss: Beyond recent swing high/low or Bollinger Band</li>
              <li>Take-Profit: At moving average, fixed profit target, or use trailing stop</li>
            </ul>
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Example Entry and Exit Criteria</h2>

        <h3 className="text-xl font-semibold mb-2">Long Entry (Oversold Scenario)</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Trigger Conditions:</strong>
            <ul className="list-disc pl-6">
              <li>Price closes below or touches lower Bollinger Band</li>
              <li>RSI is below 30 (oversold)</li>
              <li>Bullish candlestick pattern or RSI closes back above 30</li>
            </ul>
          </li>
          <li>
            <strong>Action:</strong> Enter long position on next open
          </li>
          <li>
            <strong>Stop-Loss:</strong> Below lower Bollinger Band or recent swing low
          </li>
          <li>
            <strong>Profit Target:</strong> Middle Bollinger Band (20-SMA) or trail stop
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Short Entry (Overbought Scenario)</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Trigger Conditions:</strong>
            <ul className="list-disc pl-6">
              <li>Price closes above or touches upper Bollinger Band</li>
              <li>RSI is above 70 (overbought)</li>
              <li>Bearish candlestick pattern or RSI closes back below 70</li>
            </ul>
          </li>
          <li>
            <strong>Action:</strong> Enter short position on next open
          </li>
          <li>
            <strong>Stop-Loss:</strong> Above upper Bollinger Band or recent swing high
          </li>
          <li>
            <strong>Profit Target:</strong> Middle Bollinger Band (20-SMA) or predefined risk-reward ratio
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Risk Management</h2>
        <ul className="list-disc pl-6">
          <li>
            <strong>Position Sizing:</strong> Risk only 1-2% of trading capital per trade
          </li>
          <li>
            <strong>Stop-Loss Placement:</strong> Set where initial rationale is invalidated
          </li>
          <li>
            <strong>Take-Profit Plans:</strong> Use risk-reward ratio or scale out at multiple targets
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Optimize and Test</h2>
        <ol className="list-decimal pl-6">
          <li>Select appropriate markets and timeframes</li>
          <li>Backtest strategy on historical data</li>
          <li>Forward test (paper trade) to verify live performance</li>
          <li>Refine parameters (RSI levels, Bollinger Band settings, filters)</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Considerations and Tips</h2>
        <ul className="list-disc pl-6">
          <li>Avoid choppy or highly volatile markets</li>
          <li>Consider combining with other technical tools</li>
          <li>Look for RSI divergence near Bollinger Bands</li>
          <li>Be cautious around major news events</li>
        </ul>
      </section>

      <p className="text-sm text-gray-600 mb-8">
        <strong>Disclaimer:</strong> This information is for educational purposes only and does not constitute financial
        advice. Always do your own research and consult a financial advisor if necessary. Past performance does not
        guarantee future results.
      </p>

      <div className="mt-8">
        <Link href="/">
          <Button>Back to Chart</Button>
        </Link>
      </div>
      <Separator className="my-8" />
      <footer className="text-center text-sm text-gray-500">Created by Rowshni</footer>
    </div>
  )
}

