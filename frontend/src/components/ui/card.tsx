import * as React from "react"

import { cn } from "@/lib/utils"

const PADDING = {
  sm: "p-3.5",
  md: "p-5",
  lg: "p-7",
} as const

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: keyof typeof PADDING
  elevated?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding = "md", elevated = false, onClick, ...props }, ref) => {
    const clickable = !!onClick
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          "rounded-lg border border-border bg-card font-body transition-all duration-base ease-smooth",
          PADDING[padding],
          elevated ? "shadow-md" : "shadow-xs",
          clickable && "cursor-pointer hover:-translate-y-0.5 hover:shadow-md",
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

export { Card }
