"use client"

import { usePathname } from "next/navigation"

import { AppBar } from "@/components/Appbar"
import { Footer } from "@/components/Footer"

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col min-h-screen">
      <AppBar/>
      <div className="flex-1 flex flex-col">
        {children}
      </div>
      {pathname === "/" && <Footer/>}
    </div>
  )
}
