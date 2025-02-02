"use client"

import { createContext, useContext, useState, useEffect } from "react"

export interface AppState {
  ticker: string
  timeRange: number
  bollingerPeriod: number
  rsiPeriod: number
  stockData:
    | {
        date: string
        price: number
        upper: number
        middle: number
        lower: number
        rsi: number | null
      }[]
    | null
}

interface AppStateContextType {
  appState: AppState
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
  resetAppState: () => void
}

const DEFAULT_STATE: AppState = {
  ticker: "",
  timeRange: 180,
  bollingerPeriod: 20,
  rsiPeriod: 14,
  stockData: null,
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined)

function getStorageValue(key: string, defaultValue: any) {
  if (typeof window === "undefined") return defaultValue

  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : defaultValue
  } catch (err) {
    console.warn("Failed to access localStorage:", err)
    return defaultValue
  }
}

function setStorageValue(key: string, value: any) {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.warn("Failed to save to localStorage:", err)
  }
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [appState, setAppState] = useState<AppState>(() => getStorageValue("appState", DEFAULT_STATE))
  const [mounted, setMounted] = useState(false)

  // Only run after component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setStorageValue("appState", appState)
    }
  }, [appState, mounted])

  const resetAppState = () => {
    setAppState(DEFAULT_STATE)
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("appState")
      }
    } catch (err) {
      console.warn("Failed to remove from localStorage:", err)
    }
  }

  return (
    <AppStateContext.Provider value={{ appState, setAppState, resetAppState }}>{children}</AppStateContext.Provider>
  )
}

export function useAppState() {
  const context = useContext(AppStateContext)
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppStateProvider")
  }
  return context
}