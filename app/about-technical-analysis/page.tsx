import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutTechnicalAnalysis() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <Link href="/">
          <Button>Back to Chart</Button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6">Understanding Technical Analysis in Stock Trading</h1>

      <p className="mb-4">
        Technical analysis is a method used by traders to evaluate securities and identify trading opportunities. Unlike
        fundamental analysis, which examines a company&apos;s financial health and market position, technical analysis
        focuses on statistical trends gathered from trading activity, such as price movement and volume.
      </p>

      <p className="mb-4">
        The core assumption of technical analysis is that all known fundamentals are factored into price; thus,
        there&apos;s no need to pay close attention to them. Technical analysts believe that prices move in trends and
        history tends to repeat itself when it comes to the market&apos;s overall psychology.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Key Concepts in Technical Analysis:</h2>

      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Trends:</strong> The general direction of a market or asset&apos;s price.
        </li>
        <li>
          <strong>Support and Resistance:</strong> Price levels where a downtrend or uptrend is expected to pause due to
          concentration of demand (support) or supply (resistance).
        </li>
        <li>
          <strong>Volume:</strong> The number of shares or contracts traded in a security or market during a given
          period of time.
        </li>
        <li>
          <strong>Charts:</strong> Visual representations of price movements over time.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Popular Technical Indicators:</h2>

      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Moving Averages:</strong> Help smooth out price data to identify the trend direction.
        </li>
        <li>
          <strong>Relative Strength Index (RSI):</strong> Measures the speed and change of price movements, indicating
          overbought or oversold conditions.
        </li>
        <li>
          <strong>Bollinger Bands:</strong> Consist of a middle band (usually a simple moving average) and two outer
          bands that expand and contract based on volatility.
        </li>
        <li>
          <strong>MACD (Moving Average Convergence Divergence):</strong> Shows the relationship between two moving
          averages of a security&apos;s price.
        </li>
      </ul>

      <p className="mb-4">
        While technical analysis can be a powerful tool, it&apos;s important to remember that no single method of
        analysis guarantees success in the stock market. Many traders use a combination of technical and fundamental
        analysis, along with proper risk management strategies, to make informed trading decisions.
      </p>

      <p className="mb-4">
        Always conduct thorough research and consider seeking advice from financial professionals before making
        investment decisions. The stock market involves risk, and past performance does not guarantee future results.
      </p>

      <div className="mt-8">
        <Link href="/">
          <Button>Back to Chart</Button>
        </Link>
      </div>
    </div>
  )
}