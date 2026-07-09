import { Moon, Sun } from "lucide-react"

import { IconButton } from "./ui/icon-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useTheme } from "./theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          label="Toggle theme"
          icon={
            <>
              <Sun className="absolute h-[18px] w-[18px] scale-100 rotate-0 transition-all duration-slow ease-smooth dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[18px] w-[18px] scale-0 rotate-90 transition-all duration-slow ease-smooth dark:scale-100 dark:rotate-0" />
            </>
          }
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem data-active={theme === "light"} onClick={() => setTheme("light")} className="data-[active=true]:text-primary">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem data-active={theme === "dark"} onClick={() => setTheme("dark")} className="data-[active=true]:text-primary">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem data-active={theme === "system"} onClick={() => setTheme("system")} className="data-[active=true]:text-primary">
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
