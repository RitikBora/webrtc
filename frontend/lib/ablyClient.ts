import * as Ably from "ably";

// Signaling transport for WebRTC. Only pub/sub + presence are used — no server
// of our own. Set NEXT_PUBLIC_ABLY_API_KEY in .env.local and in Vercel.
// echoMessages:false means a client never receives its own published signals.
const apiKey = process.env.NEXT_PUBLIC_ABLY_API_KEY as string;

export function createRealtime(clientId: string) {
  return new Ably.Realtime({ key: apiKey, clientId, echoMessages: false });
}
