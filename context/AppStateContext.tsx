"use client"

import { createContext, useContext, useState, useEffect } from "react"

interface AppState {
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
}

const DEFAULT_STATE: AppState = {
  ticker: "",
  timeRange: 180,
  bollingerPeriod: 20,
  rsiPeriod: 14,
  stockData: null,
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined)

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [appState, setAppState] = useState<AppState>(DEFAULT_STATE)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    try {
      const savedState = localStorage.getItem("appState")
      if (savedState) {
        setAppState(JSON.parse(savedState))
      }
    } catch (error) {
      console.warn("Failed to load state from localStorage:", error)
    }
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("appState", JSON.stringify(appState))
      } catch (error) {
        console.warn("Failed to save state to localStorage:", error)
      }
    }
  }, [appState, isInitialized])

  // Don't render children until initial state is loaded
  if (!isInitialized) {
    return null
  }

  return <AppStateContext.Provider value={{ appState, setAppState }}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const context = useContext(AppStateContext)
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppStateProvider")
  }
  return context
}

