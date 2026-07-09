// TypeScript's bundled DOM lib doesn't type the View Transitions API yet.
interface ViewTransition {
  ready: Promise<void>
  finished: Promise<void>
  updateCallbackDone: Promise<void>
  skipTransition: () => void
}

interface Document {
  startViewTransition?: (callback: () => void | Promise<void>) => ViewTransition
}
