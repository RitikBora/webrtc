"use client"

import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"
import { RecoilRoot } from "recoil"
import { ThemeProvider } from "@/components/theme-provider"
import { RoomActionsProvider } from "@/context/RoomActionsContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="meetwise-ui-theme">
      <RecoilRoot>
        <RoomActionsProvider>
          <ToastContainer />
          {children}
        </RoomActionsProvider>
      </RecoilRoot>
    </ThemeProvider>
  )
}
