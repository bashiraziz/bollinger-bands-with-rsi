"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchStockData } from "../actions"

interface ClosingPrice {
  date: string
  price: number
}

export default function ClosingPricesPage() {
  const [closingPrices, setClosingPrices] = useState<ClosingPrice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [pageData, setPageData] = useState<{ ticker: string; timeRange: number } | null>(null)

  useEffect(() => {
    // Get parameters directly from URL
    const params = new URLSearchParams(window.location.search)
    const ticker = params.get("ticker")
    const timeRange = params.get("timeRange")

    if (!ticker || !timeRange) {
      window.location.href = "/"
      return
    }

    setPageData({
      ticker,
      timeRange: Number.parseInt(timeRange, 10),
    })

    const fetchPrices = async () => {
      setIsLoading(true)
      setError("")

      try {
        const { prices, dates } = await fetchStockData(ticker, Number.parseInt(timeRange, 10))
        const formattedPrices: ClosingPrice[] = dates.map((date: string, index: number) => ({
          date,
          price: prices[index],
        }))
        setClosingPrices(formattedPrices)
      } catch (err) {
        console.error("Error fetching prices:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch closing prices")
        setClosingPrices([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrices()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-secondary via-background to-muted">
        <div className="text-center bg-card p-8 rounded-lg shadow-md">
          <div className="mb-4 text-foreground">Loading...</div>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Back to Chart</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-secondary via-background to-muted min-h-screen">
        <div className="text-center mt-8 bg-card p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-destructive">Error</h2>
          <p className="text-destructive mb-4">{error}</p>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Back to Chart</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!pageData) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-secondary via-background to-muted min-h-screen">
      <div className="mb-8">
        <Link href="/">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Back to Chart</Button>
        </Link>
      </div>
      <div className="bg-card p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-foreground">Closing Prices for {pageData.ticker}</h1>
        <p className="mb-4 text-muted-foreground">Displaying {closingPrices.length} days of closing prices.</p>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left font-medium text-foreground pr-8">Date</TableHead>
                <TableHead className="text-right font-medium text-foreground pl-8">Closing Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {closingPrices.map((item) => (
                <TableRow key={item.date}>
                  <TableCell className="text-left text-muted-foreground pr-8">{item.date}</TableCell>
                  <TableCell className="text-right tabular-nums text-muted-foreground pl-8">
                    ${item.price.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-8">
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Back to Chart</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}