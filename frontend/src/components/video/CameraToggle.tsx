import { Video, VideoOff } from "lucide-react"
import { IconButton, type IconButtonProps } from "../ui/icon-button"

export interface CameraToggleProps extends Omit<IconButtonProps, "icon" | "label" | "active"> {
  off: boolean
}

export function CameraToggle({ off, ...props }: CameraToggleProps) {
  return (
    <IconButton
      icon={off ? <VideoOff /> : <Video />}
      label={off ? "Turn on camera" : "Turn off camera"}
      active={off}
      {...props}
    />
  )
}
