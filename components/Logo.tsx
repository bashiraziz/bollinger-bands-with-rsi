import { BarChart3 } from "lucide-react"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <BarChart3 className="h-8 w-8 text-primary" />
      <span className="font-bold text-2xl text-foreground">StockAnalyzer</span>
    </div>
  )
}

