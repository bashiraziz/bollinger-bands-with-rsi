"use client"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Tooltip,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"

interface ChartData {
  date: string
  price: number
  upper: number
  middle: number
  lower: number
  rsi: number | null
}

const CustomTooltip = ({
  active,
  payload,
}: { active?: boolean; payload?: { color: string; name: string; value: number; payload: ChartData }[] }) => {
  if (!active || !payload || payload.length === 0) return null

  return (
    <div className="bg-white p-2 border border-gray-300 rounded shadow-lg">
      <p className="font-bold">{new Date(payload[0].payload.date).toLocaleDateString()}</p>
      {payload.map((entry, index) => (
        <p key={index} style={{ color: entry.color }}>
          {entry.name}: {entry.value.toFixed(2)}
        </p>
      ))}
    </div>
  )
}

export default function BollingerRSIChart({ data, rsiPeriod }: { data: ChartData[]; rsiPeriod: number }) {
  const reversedData = [...data].reverse()

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
              color: "hsl(214, 90%, 52%)",
            },
            upper: {
              label: "Upper Band",
              color: "hsl(0, 91%, 71%)",
            },
            lower: {
              label: "Lower Band",
              color: "hsl(145, 63%, 49%)",
            },
            rsi: {
              label: "RSI",
              color: "hsl(32, 95%, 44%)",
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
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="price"
                stroke="var(--color-price)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2 }}
                name="Price"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="upper"
                stroke="var(--color-upper)"
                strokeWidth={1.5}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2 }}
                name="Upper Band"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="lower"
                stroke="var(--color-lower)"
                strokeWidth={1.5}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2 }}
                name="Lower Band"
              />
              <Line
                yAxisId="rsi"
                type="monotone"
                dataKey="rsi"
                stroke="var(--color-rsi)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2 }}
                name="RSI"
              />
              <ReferenceLine yAxisId="rsi" y={30} stroke="var(--color-rsi)" strokeOpacity={0.7} strokeDasharray="3 3" />
              <ReferenceLine yAxisId="rsi" y={70} stroke="var(--color-rsi)" strokeOpacity={0.7} strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}