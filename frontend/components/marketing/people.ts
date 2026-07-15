import type { Character } from "./CharacterTile";

const HAIR_PATHS = {
  short: "M35 48 Q35 22 60 22 Q85 22 85 48 Q85 31 60 31 Q35 31 35 48 Z",
  buzz: "M34 46 Q34 20 60 20 Q86 20 86 46 Q86 34 60 34 Q34 34 34 46 Z",
  long: "M33 52 Q31 20 60 20 Q89 20 87 52 Q90 62 88 76 Q84 58 84 48 Q84 32 60 32 Q36 32 36 48 Q36 58 32 76 Q30 62 33 52 Z",
  side: "M36 46 Q34 21 60 21 Q86 21 84 46 Q84 33 60 33 Q36 33 36 46 Z",
  curly:
    "M32 46 Q30 18 60 18 Q90 18 88 46 Q92 40 86 34 Q88 28 80 28 Q78 22 68 24 Q60 18 52 24 Q42 22 40 28 Q32 28 34 34 Q28 40 32 46 Z",
} as const;

interface SpeakOpts {
  muted?: boolean;
  spDur?: number;
  spDelay?: number;
}

function person(
  label: string,
  skin: string,
  skinShadow: string,
  hair: string,
  style: keyof typeof HAIR_PATHS,
  shirt: string,
  dur: number,
  delay: number,
  blinkDur: number,
  blinkDelay: number,
  opts: SpeakOpts = {}
): Character {
  return {
    label,
    skin,
    skinShadow,
    hair,
    hairPath: HAIR_PATHS[style],
    shirt,
    muted: !!opts.muted,
    speaks: !!opts.spDur,
    bobAnim: `mwBob ${dur}s var(--ease-smooth) ${delay}s infinite`,
    blinkAnim: `mwBlink ${blinkDur}s var(--ease-smooth) ${blinkDelay}s infinite`,
    speakAnim: opts.spDur ? `mwSpeak ${opts.spDur}s var(--ease-smooth) ${opts.spDelay ?? 0}s infinite` : "none",
  };
}

export const ava = person("Ava Chen", "#F2CBA6", "#E3B48C", "#2B2733", "short", "#6F51F7", 4.0, 0.0, 5.0, 0.0, { spDur: 8, spDelay: 0 });
export const marcus = person("Marcus Lee", "#CE9468", "#B87E52", "#16141C", "buzz", "#ABA6C4", 4.6, 0.6, 5.4, 1.6, { spDur: 9, spDelay: 3.5 });
export const priya = person("Priya Rao", "#D89A66", "#C4854F", "#1B1620", "long", "#9B8AFB", 5.0, 1.1, 6.0, 3.1, { muted: true });
export const you = person("You", "#ECBB8E", "#D9A577", "#3A2A1D", "side", "#46405F", 4.3, 0.3, 5.2, 2.2, {});
export const diego = person("Diego M.", "#B87A50", "#A2673E", "#100F16", "curly", "#2E2C3F", 4.8, 0.9, 5.8, 0.8, { spDur: 10, spDelay: 6 });
export const lena = person("Lena K.", "#EEC29A", "#DBAB80", "#4A2CDC", "long", "#615A85", 4.4, 1.4, 5.6, 4.0, {});
export const sam = person("Sam O.", "#D69C6E", "#C0855A", "#211F2E", "short", "#837CA3", 4.9, 0.2, 5.1, 2.8, { spDur: 11, spDelay: 8 });

export const heroPeople: Character[] = [ava, marcus, priya, you];
export const showPeople: Character[] = [ava, marcus, diego, priya, lena, sam];
export const sidePeople: Character[] = [marcus, diego, lena, { ...sam, muted: true, speaks: false, speakAnim: "none" }];
export const speaker: Character = ava;
