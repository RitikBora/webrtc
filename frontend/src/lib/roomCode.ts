const ADJECTIVES = ["quiet", "bright", "swift", "calm", "bold", "warm", "clever", "lucky", "amber", "north"];
const NOUNS = ["otter", "harbor", "maple", "comet", "willow", "cedar", "falcon", "delta", "ember", "summit"];

function pick<T>(list: T[]) {
  return list[Math.floor(Math.random() * list.length)];
}

export function generateRoomCode() {
  const suffix = Math.floor(Math.random() * 90 + 10);
  return `${pick(ADJECTIVES)}-${pick(NOUNS)}-${suffix}`;
}
