import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"

import { IconButton } from "./ui/icon-button"
import { useTheme } from "./theme-provider"

type DocumentWithViewTransitions = Document & {
  startViewTransition?: (cb: () => void | Promise<void>) => {
    ready: Promise<void>
  }
}

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  function handleToggle(event: React.MouseEvent<HTMLButtonElement>) {
    const next = resolvedTheme === "dark" ? "light" : "dark"
    const doc = document as DocumentWithViewTransitions

    if (!doc.startViewTransition) {
      setTheme(next)
      return
    }

    // Origin of the circular reveal — the toggle button's click point.
    const x = event.clientX
    const y = event.clientY

    const transition = doc.startViewTransition(() => {
      flushSync(() => setTheme(next))
    })

    transition.ready.then(() => {
      // Reach the farthest corner so the circle covers the whole viewport.
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 450,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })
  }

  return (
    <IconButton
      label="Toggle theme"
      onClick={handleToggle}
      icon={
        <>
          <Sun className="absolute h-[18px] w-[18px] scale-100 rotate-0 transition-all duration-slow ease-smooth dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[18px] w-[18px] scale-0 rotate-90 transition-all duration-slow ease-smooth dark:scale-100 dark:rotate-0" />
        </>
      }
    />
  )
}
