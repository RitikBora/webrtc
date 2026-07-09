import { Mic, MicOff } from "lucide-react"
import { IconButton, type IconButtonProps } from "../ui/icon-button"

export interface MicButtonProps extends Omit<IconButtonProps, "icon" | "label" | "active"> {
  muted: boolean
}

export function MicButton({ muted, ...props }: MicButtonProps) {
  return (
    <IconButton
      icon={muted ? <MicOff /> : <Mic />}
      label={muted ? "Unmute" : "Mute"}
      active={muted}
      {...props}
    />
  )
}
