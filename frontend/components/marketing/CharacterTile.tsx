import { MicOff } from "lucide-react";

export interface Character {
  label: string;
  skin: string;
  skinShadow: string;
  hair: string;
  hairPath: string;
  shirt: string;
  muted?: boolean;
  speaks?: boolean;
  bobAnim: string;
  blinkAnim: string;
  speakAnim: string;
}

export function CharacterTile({
  label,
  skin,
  skinShadow,
  hair,
  hairPath,
  shirt,
  muted,
  speaks,
  bobAnim,
  blinkAnim,
  speakAnim,
  className,
}: Character & { className?: string }) {
  return (
    <div
      className={`relative w-full aspect-[16/10] overflow-hidden rounded-md shadow-sm ${className ?? ""}`}
      style={{ background: "radial-gradient(120% 140% at 30% 20%, #2A2560 0%, #16151F 60%)" }}
    >
      <div className="absolute inset-0 flex items-end justify-center">
        <svg viewBox="0 0 120 122" style={{ height: "90%", width: "auto", animation: bobAnim }}>
          <path d="M20 122 Q20 84 60 84 Q100 84 100 122 Z" fill={shirt} />
          <rect x="53" y="66" width="14" height="20" rx="7" fill={skinShadow} />
          <circle cx="60" cy="48" r="25" fill={skin} />
          <path d={hairPath} fill={hair} />
          <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: blinkAnim }}>
            <circle cx="51" cy="49" r="2.6" fill="#1F1B2E" />
            <circle cx="69" cy="49" r="2.6" fill="#1F1B2E" />
          </g>
          <path d="M53 57 Q60 62 67 57" stroke="#1F1B2E" strokeWidth={2.4} fill="none" strokeLinecap="round" />
        </svg>
      </div>
      {speaks && (
        <div
          className="pointer-events-none absolute inset-0 rounded-md opacity-0"
          style={{ boxShadow: "inset 0 0 0 3px var(--green-500)", animation: speakAnim }}
        />
      )}
      <div className="absolute left-2.5 bottom-2.5 flex items-center gap-1.5 rounded-pill bg-[rgba(13,12,19,0.55)] px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md font-body">
        {muted && <MicOff className="h-3 w-3 text-[#FF8079]" />}
        {label}
      </div>
    </div>
  );
}
