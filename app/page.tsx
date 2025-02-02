"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { fetchStockData } from "./actions"
import { calculateBollingerBands, calculateRSI } from "@/utils/calculateIndicators"
import BollingerRSIChart from "@/components/BollingerRSIChart"
import { StockAnalysisExplanation } from "@/components/StockAnalysisExplanation"
import { DataInfo } from "@/components/DataInfo"
import { Logo } from "@/components/Logo"
import { useAppState } from "@/context/AppStateContext"

const TIME_RANGES = [
  { label: "3 Months", value: 90 },
  { label: "6 Months", value: 180 },
  { label: "1 Year", value: 365 },
]

const BOLLINGER_PERIODS = [
  { label: "10 Days (Short-term)", value: 10 },
  { label: "20 Days (Standard)", value: 20 },
  { label: "21 Days (Monthly)", value: 21 },
  { label: "50 Days (Long-term)", value: 50 },
]

const RSI_PERIODS = [
  { label: "9 Days", value: 9 },
  { label: "14 Days (Standard)", value: 14 },
  { label: "21 Days", value: 21 },
  { label: "30 Days", value: 30 },
]

const DEFAULT_VALUES = {
  timeRange: 180,
  bollingerPeriod: 20,
  rsiPeriod: 14,
}

export default function Home() {
  const { appState, setAppState } = useAppState()
  const { ticker, timeRange, bollingerPeriod, rsiPeriod, stockData } = appState

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [inputTicker, setInputTicker] = useState("")

  useEffect(() => {
    setAppState((prevState) => ({ ...prevState, stockData: null }))
  }, [setAppState])

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!inputTicker) {
        setError("Please enter a stock ticker")
        return
      }

      if (isLoading) {
        return // Prevent multiple simultaneous requests
      }

      setIsLoading(true)
      setError("")
      try {
        const { prices, dates } = await fetchStockData(inputTicker, timeRange)

        if (!prices || !dates || prices.length === 0 || dates.length === 0) {
          throw new Error("No data received from the API")
        }

        const bollingerBands = calculateBollingerBands(prices, bollingerPeriod)
        const rsi = calculateRSI(prices, rsiPeriod)

        const chartData = dates.map((date: string, index: number) => ({
          date,
          price: prices[index],
          upper: bollingerBands.upper[index],
          middle: bollingerBands.middle[index],
          lower: bollingerBands.lower[index],
          rsi: rsi[index],
        }))

        setAppState((prevState) => ({ ...prevState, ticker: inputTicker, stockData: chartData }))
        setError("")
      } catch (err) {
        console.error("Error analyzing stock:", err)
        setError(err instanceof Error ? err.message : "An unexpected error occurred while analyzing stock data")
        setAppState((prevState) => ({ ...prevState, stockData: null }))
      } finally {
        setIsLoading(false)
      }
    },
    [inputTicker, timeRange, bollingerPeriod, rsiPeriod, setAppState, isLoading],
  )

  const resetForm = () => {
    setAppState({
      ticker: "",
      timeRange: DEFAULT_VALUES.timeRange,
      bollingerPeriod: DEFAULT_VALUES.bollingerPeriod,
      rsiPeriod: DEFAULT_VALUES.rsiPeriod,
      stockData: null,
    })
    setInputTicker("")
    setError("")
  }

  const handleViewClosingPrices = () => {
    if (!ticker) {
      setError("Please analyze a stock before viewing closing prices")
      return
    }
    window.location.href = `/closing-prices?ticker=${ticker}&timeRange=${timeRange}`
  }

  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (stockData && chartRef.current) {
      chartRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [stockData])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12 bg-gradient-to-br from-secondary via-background to-muted">
      <div className="w-full max-w-4xl mb-4">
        <Logo />
      </div>
      <h1 className="text-4xl font-bold mb-8 text-foreground">Stock Analysis: Bollinger Bands & RSI</h1>
      <div className="flex justify-center gap-8 mb-8">
        <Link href="/about-technical-analysis">
          <span className="text-primary font-medium hover:text-primary/80 text-sm underline-offset-4 hover:underline transition-colors">
            Learn about technical analysis
          </span>
        </Link>
        <Link href="/trading-strategy">
          <span className="text-primary font-medium hover:text-primary/80 text-sm underline-offset-4 hover:underline transition-colors">
            View trading strategy guide
          </span>
        </Link>
        <Link href="/about">
          <span className="text-primary font-medium hover:text-primary/80 text-sm underline-offset-4 hover:underline transition-colors">
            About this app
          </span>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mb-8 w-full max-w-xl bg-card p-6 rounded-lg shadow-md"
      >
        <div className="flex gap-4">
          <Input
            type="text"
            value={inputTicker}
            onChange={(e) => setInputTicker(e.target.value.toUpperCase())}
            placeholder="Enter stock ticker (e.g., AAPL)"
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {isLoading ? "Loading..." : "Analyze Stock"}
          </Button>
          <Button type="button" variant="outline" onClick={resetForm} className="bg-black text-white hover:bg-black/90">
            Reset
          </Button>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block text-foreground">Time Range</label>
            <Select
              value={timeRange.toString()}
              onValueChange={(value) => setAppState((prevState) => ({ ...prevState, timeRange: Number(value) }))}
            >
              <SelectTrigger className="border-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIME_RANGES.map((range) => (
                  <SelectItem key={range.value} value={range.value.toString()}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block text-foreground">Bollinger Band Period</label>
            <Select
              value={bollingerPeriod.toString()}
              onValueChange={(value) => setAppState((prevState) => ({ ...prevState, bollingerPeriod: Number(value) }))}
            >
              <SelectTrigger className="border-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BOLLINGER_PERIODS.map((p) => (
                  <SelectItem key={p.value} value={p.value.toString()}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block text-foreground">RSI Period</label>
            <Select
              value={rsiPeriod.toString()}
              onValueChange={(value) => setAppState((prevState) => ({ ...prevState, rsiPeriod: Number(value) }))}
            >
              <SelectTrigger className="border-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RSI_PERIODS.map((p) => (
                  <SelectItem key={p.value} value={p.value.toString()}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
      <div className="text-center mb-8 space-y-4 bg-card p-6 rounded-lg shadow-md max-w-xl mx-auto">
        <p className="text-base font-medium text-foreground">This chart combines two powerful technical indicators:</p>
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-foreground font-medium">Bollinger Bands</span>{" "}
            <span className="text-muted-foreground">show volatility with adjustable periods (default: 20 days)</span>
          </p>
          <p>
            <span className="text-foreground font-medium">RSI (Relative Strength Index)</span>{" "}
            <span className="text-muted-foreground">
              measures momentum with customizable periods (default: 14 days)
            </span>
          </p>
          <p className="text-muted-foreground">
            RSI readings above 70 indicate overbought conditions, while readings below 30 suggest oversold conditions.
          </p>
        </div>
      </div>
      {error && (
        <Alert variant="destructive" className="mb-4 max-w-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {stockData && (
        <div ref={chartRef} className="w-full max-w-4xl bg-card p-6 rounded-lg shadow-md mt-8">
          <BollingerRSIChart data={stockData} rsiPeriod={rsiPeriod} />
          <StockAnalysisExplanation data={stockData} ticker={ticker} rsiPeriod={rsiPeriod} />
          <DataInfo
            ticker={ticker}
            timeRange={timeRange}
            bollingerPeriod={bollingerPeriod}
            rsiPeriod={rsiPeriod}
            dataPoints={stockData.length}
          />
          <div className="mt-4">
            <Button
              variant="outline"
              onClick={handleViewClosingPrices}
              className="border-primary text-primary hover:bg-primary/10"
            >
              View Closing Prices
            </Button>
          </div>
        </div>
      )}
      <Separator className="my-8" />
      <footer className="text-center text-sm text-muted-foreground">Created by Bashir Aziz (aka Rowshni)</footer>
    </main>
  )
}

