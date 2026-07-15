import * as React from "react"

import { cn } from "@/lib/utils"

const SIZES = {
  sm: "h-7 w-7 text-[11px]",
  md: "h-9 w-9 text-[13px]",
  lg: "h-12 w-12 text-base",
  xl: "h-[72px] w-[72px] text-2xl",
} as const

const AVATAR_COLORS = [
  "bg-[#6F51F7]",
  "bg-[#22B588]",
  "bg-[#E8A23A]",
  "bg-[#F0594E]",
  "bg-[#4A2CDC]",
]

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("")
}

function colorFor(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % AVATAR_COLORS.length
  return AVATAR_COLORS[h]
}

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string
  src?: string
  size?: keyof typeof SIZES
  status?: "connected"
}

function Avatar({ name, src, size = "md", status, className, ...props }: AvatarProps) {
  const dim = SIZES[size] ?? SIZES.md
  return (
    <span className={cn("relative inline-flex shrink-0", dim, className)} {...props}>
      {src ? (
        <img src={src} alt={name} className="h-full w-full rounded-full object-cover" />
      ) : (
        <span
          className={cn(
            "flex h-full w-full items-center justify-center rounded-full font-display font-semibold text-white",
            colorFor(name)
          )}
        >
          {initials(name) || "?"}
        </span>
      )}
      {status === "connected" && (
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-connected" />
      )}
    </span>
  )
}

export { Avatar }
