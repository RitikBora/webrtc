import * as React from "react"
import { PhoneOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { IconButton } from "../ui/icon-button"
import { MicButton } from "./MicButton"
import { CameraToggle } from "./CameraToggle"

export interface CallControlsBarProps extends React.HTMLAttributes<HTMLDivElement> {
  muted: boolean
  onToggleMute: () => void
  cameraOff: boolean
  onToggleCamera: () => void
  onLeave: () => void
}

export function CallControlsBar({
  muted,
  onToggleMute,
  cameraOff,
  onToggleCamera,
  onLeave,
  className,
  ...props
}: CallControlsBarProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-pill bg-[rgba(13,12,19,0.72)] p-2 shadow-lg backdrop-blur-xl",
        className
      )}
      {...props}
    >
      <MicButton muted={muted} onClick={onToggleMute} variant="ghost" className="text-white" />
      <CameraToggle off={cameraOff} onClick={onToggleCamera} variant="ghost" className="text-white" />
      <div className="mx-0.5 h-6 w-px bg-white/15" />
      <IconButton icon={<PhoneOff />} label="Leave call" variant="danger" onClick={onLeave} />
    </div>
  )
}
