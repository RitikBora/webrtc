"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"
type ResolvedTheme = "light" | "dark"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }
  return theme
}

function applyThemeClass(resolved: ResolvedTheme) {
  const root = window.document.documentElement
  root.classList.remove("light", "dark")
  root.classList.add(resolved)
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "meetwise-ui-theme",
  ...props
}: ThemeProviderProps) {

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme
  })
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    typeof window === "undefined" ? initialState.resolvedTheme : resolveTheme(theme)
  )

  useEffect(() => {
    const resolved = resolveTheme(theme)
    applyThemeClass(resolved)
    setResolvedTheme(resolved)
  }, [theme])

  useEffect(() => {
    if (theme !== "system") return
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const listener = () => {
      const resolved = media.matches ? "dark" : "light"
      applyThemeClass(resolved)
      setResolvedTheme(resolved)
    }
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [theme])

  const value: ThemeProviderState = {
    theme,
    resolvedTheme,
    setTheme: (nextTheme: Theme) => {
      localStorage.setItem(storageKey, nextTheme)
      // Apply synchronously (not just via the effect above) so callers that
      // wrap this in flushSync — to drive the View Transitions circular
      // reveal from a click point — see the DOM update immediately.
      applyThemeClass(resolveTheme(nextTheme))
      setThemeState(nextTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
