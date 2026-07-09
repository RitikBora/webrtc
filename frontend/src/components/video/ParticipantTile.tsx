import * as React from "react"
import { MicOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar } from "../ui/avatar"

export interface ParticipantTileProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  videoOn: boolean
  muted?: boolean
  speaking?: boolean
  children?: React.ReactNode
}

export function ParticipantTile({
  name,
  videoOn,
  muted = false,
  speaking = false,
  children,
  className,
  ...props
}: ParticipantTileProps) {
  return (
    <div
      className={cn(
        "relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-md bg-ink-900 font-body transition-shadow duration-base ease-smooth",
        speaking ? "shadow-[0_0_0_3px_var(--status-connected),var(--shadow-md)]" : "shadow-sm",
        className
      )}
      {...props}
    >
      {/* video/content stays mounted so callers can keep a live media stream attached even while camera is off */}
      <div className="h-full w-full [&>video]:h-full [&>video]:w-full [&>video]:object-cover">{children}</div>
      {!videoOn && (
        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(120%_140%_at_30%_20%,#2A2560_0%,#16151F_60%)]">
          <Avatar name={name} size="lg" />
        </div>
      )}
      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-pill bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
        {muted && <MicOff className="h-3 w-3 text-[#FF8079]" />}
        {name}
      </div>
    </div>
  )
}
