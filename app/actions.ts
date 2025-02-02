"use server"

interface PolygonResult {
  c: number // closing price
  t: number // timestamp
}

interface PolygonResponse {
  results?: PolygonResult[]
  error?: string
}

export async function fetchStockData(ticker: string, days = 100) {
  try {
    const API_KEY = process.env.POLYGON_API_KEY
    if (!API_KEY) {
      throw new Error("Polygon API key is not set")
    }

    const endDate = new Date().toISOString().split("T")[0]
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${endDate}?apiKey=${API_KEY}`

    const response = await fetch(url)
    const data = (await response.json()) as PolygonResponse

    if (!response.ok) {
      throw new Error(`API Error: ${data.error || response.statusText}`)
    }

    if (!data.results || !Array.isArray(data.results)) {
      throw new Error("Invalid data format received from API")
    }

    if (data.results.length === 0) {
      throw new Error("No data available for this ticker")
    }

    const prices = data.results.map((result) => result.c).reverse() // closing prices
    const dates = data.results.map((result) => new Date(result.t).toISOString().split("T")[0]).reverse()

    return { prices, dates }
  } catch (error) {
    console.error("Error in fetchStockData:", error)
    throw new Error(
      error instanceof Error
        ? error.message
        : typeof error === "object" && error !== null && "message" in error
          ? String(error.message)
          : "An unexpected error occurred while fetching stock data",
    )
  }
}