"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type React from "react" // Import React

interface ChartData {
  date: string
  price: number
  upper: number
  middle: number
  lower: number
}

interface TooltipContentProps {
  active?: boolean
  payload?: Array<{
    value: number
    dataKey: string
    payload: ChartData
  }>
}

const CustomTooltip: React.FC<TooltipContentProps> = ({ active, payload }) => {
  if (!active || !payload?.length) return null

  const data = payload[0].payload
  return (
    <ChartTooltipContent>
      <p className="font-semibold">{data.date}</p>
      <p>Price: ${data.price.toFixed(2)}</p>
      <p>Upper Band: ${data.upper.toFixed(2)}</p>
      <p>Middle Band: ${data.middle.toFixed(2)}</p>
      <p>Lower Band: ${data.lower.toFixed(2)}</p>
    </ChartTooltipContent>
  )
}

export default function BollingerChart({ data }: { data: ChartData[] }) {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Bollinger Bands Chart</CardTitle>
        <CardDescription>Stock price with upper and lower Bollinger Bands</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            price: {
              label: "Price",
              color: "hsl(var(--chart-1))",
            },
            upper: {
              label: "Upper Band",
              color: "hsl(var(--chart-2))",
            },
            middle: {
              label: "Middle Band",
              color: "hsl(var(--chart-3))",
            },
            lower: {
              label: "Lower Band",
              color: "hsl(var(--chart-4))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={CustomTooltip} />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="var(--color-price)" dot={false} />
              <Line type="monotone" dataKey="upper" stroke="var(--color-upper)" dot={false} />
              <Line type="monotone" dataKey="middle" stroke="var(--color-middle)" dot={false} />
              <Line type="monotone" dataKey="lower" stroke="var(--color-lower)" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}