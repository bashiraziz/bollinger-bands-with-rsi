"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ChartConfig {
  label: string
  color: string
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: Record<string, ChartConfig>
}

export function ChartContainer({ children, config, className, ...props }: ChartContainerProps) {
  React.useEffect(() => {
    if (config) {
      Object.entries(config).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--color-${key}`, value.color)
      })
    }
    return () => {
      if (config) {
        Object.keys(config).forEach((key) => {
          document.documentElement.style.removeProperty(`--color-${key}`)
        })
      }
    }
  }, [config])

  return (
    <div className={cn("relative", className)} {...props}>
      {children}
    </div>
  )
}

interface ChartTooltipProps {
  content: React.ComponentType<any>
}

export function ChartTooltip({ content: Content }: ChartTooltipProps) {
  return <Content />
}

export function ChartTooltipContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-lg border bg-background p-2 shadow-md", className)} {...props} />
}