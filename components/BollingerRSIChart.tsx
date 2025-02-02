"use client"

import React from "react" // Import React
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, ReferenceLine } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

interface ChartData {
  date: string
  price: number
  upper: number
  middle: number
  lower: number
  rsi: number | null
}

export default function BollingerRSIChart({ data, rsiPeriod }: { data: ChartData[]; rsiPeriod: number }) {
  // Reverse the data array to have ascending dates
  const reversedData = [...data].reverse()

  const renderTooltipContent = React.useCallback(
    ({ active, payload }: { active: boolean | undefined; payload: Array<{ payload: ChartData }> | undefined }) => {
      if (active && payload && payload.length) {
        const data = payload[0].payload
        return (
          <Card className="p-2 shadow-md bg-background border-primary">
            <CardContent className="p-2">
              <p className="font-semibold">{new Date(data.date).toLocaleDateString()}</p>
              <p>Price: ${data.price.toFixed(2)}</p>
              <p>Upper Band: ${data.upper.toFixed(2)}</p>
              <p>Middle Band: ${data.middle.toFixed(2)}</p>
              <p>Lower Band: ${data.lower.toFixed(2)}</p>
              <p>RSI: {data.rsi !== null ? data.rsi.toFixed(2) : "N/A"}</p>
            </CardContent>
          </Card>
        )
      }
      return null
    },
    [],
  )

  return (
    <Card className="w-full max-w-4xl bg-background">
      <CardHeader>
        <CardTitle>Bollinger Bands and RSI Chart</CardTitle>
        <CardDescription>Stock price with Bollinger Bands and RSI indicator ({rsiPeriod}-day RSI)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            price: {
              label: "Price",
              color: "hsl(214, 90%, 52%)", // Bright blue
            },
            upper: {
              label: "Upper Band",
              color: "hsl(0, 91%, 71%)", // Bright red
            },
            middle: {
              label: "Middle Band",
              color: "hsl(280, 87%, 65%)", // Bright purple
            },
            lower: {
              label: "Lower Band",
              color: "hsl(145, 63%, 49%)", // Bright green
            },
            rsi: {
              label: "RSI",
              color: "hsl(32, 95%, 44%)", // Bright orange
            },
          }}
          className="h-[500px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={reversedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                label={{ value: "Date", position: "insideBottom", offset: -5 }}
              />
              <YAxis yAxisId="left" label={{ value: "Price", angle: -90, position: "insideLeft" }} />
              <YAxis
                yAxisId="rsi"
                orientation="right"
                domain={[0, 100]}
                label={{ value: "RSI", angle: 90, position: "insideRight" }}
                axisLine={{ stroke: "hsl(32, 95%, 44%)" }}
                tick={{ fill: "hsl(32, 95%, 44%)" }}
                tickLine={{ stroke: "hsl(32, 95%, 44%)" }}
              />
              <ChartTooltip content={renderTooltipContent} />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="price"
                stroke="hsl(214, 90%, 52%)"
                strokeWidth={2}
                dot={{ r: 1 }}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="upper"
                stroke="hsl(0, 91%, 71%)"
                strokeWidth={1.5}
                strokeDasharray="5 5"
                dot={{ r: 1 }}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="middle"
                stroke="hsl(280, 87%, 65%)"
                strokeWidth={1.5}
                strokeDasharray="3 3"
                dot={{ r: 1 }}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="lower"
                stroke="hsl(145, 63%, 49%)"
                strokeWidth={1.5}
                strokeDasharray="5 5"
                dot={{ r: 1 }}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="rsi"
                type="monotone"
                dataKey="rsi"
                stroke="hsl(32, 95%, 44%)"
                strokeWidth={2}
                dot={{ r: 1 }}
                activeDot={{ r: 5 }}
              />
              <ReferenceLine
                yAxisId="rsi"
                y={30}
                stroke="hsl(32, 95%, 44%)"
                strokeOpacity={0.7}
                strokeDasharray="3 3"
              />
              <ReferenceLine
                yAxisId="rsi"
                y={70}
                stroke="hsl(32, 95%, 44%)"
                strokeOpacity={0.7}
                strokeDasharray="3 3"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

