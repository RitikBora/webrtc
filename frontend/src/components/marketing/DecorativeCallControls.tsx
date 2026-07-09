import { useState } from "react";

import { CallControlsBar } from "@/components/video/CallControlsBar";

export function DecorativeCallControls({ className }: { className?: string }) {
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  return (
    <CallControlsBar
      className={className}
      muted={muted}
      onToggleMute={() => setMuted((m) => !m)}
      cameraOff={cameraOff}
      onToggleCamera={() => setCameraOff((c) => !c)}
      onLeave={() => {}}
    />
  );
}
