import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AppStateProvider } from "@/context/AppStateContext"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StockAnalyzer",
  description: "Analyze stocks using Bollinger Bands and RSI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  )
}

