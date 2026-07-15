"use client"

import { Menu, Plus, Video } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useRecoilValue } from "recoil"
import { VideoRefAtom } from "../recoil/atoms"
import { closeMediaStream } from "../utils/videoUtils"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { IconButton } from "./ui/icon-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useRoomActions } from "../context/RoomActionsContext"

const NAV_LINKS = [
  { href: "#features", label: "Product" },
  { href: "#showcase", label: "Solutions" },
  { href: "#security", label: "Security" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "Docs" },
]

export const AppBar = () => {

  const videoRef = useRecoilValue(VideoRefAtom);
  const router = useRouter();
  const pathname = usePathname();
  const { createRoom, openJoinDialog } = useRoomActions();
  const isLanding = pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4 px-5">
        <div className="flex items-center gap-9">
          <Link href="/" className="flex shrink-0 items-center space-x-2" onClick={(event) => {
            event.preventDefault();
            if(videoRef)
            {

              closeMediaStream(videoRef);
            }

            router.push("/")

          }}>
            <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-primary text-primary-foreground">
              <Video className="h-[18px] w-[18px]" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight text-foreground">Meetwise</span>
          </Link>

          {isLanding && (
            <nav className="hidden items-center gap-6 lg:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm font-medium text-muted-foreground transition-colors duration-fast ease-smooth hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {isLanding && (
            <>
              <Button variant="ghost" size="sm" className="hidden lg:inline-flex" onClick={openJoinDialog}>
                Join with code
              </Button>
              <Button size="sm" onClick={createRoom} aria-label="Create room">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Create room</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton label="Menu" icon={<Menu />} className="lg:hidden" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {NAV_LINKS.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <a href={link.href}>{link.label}</a>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={openJoinDialog}>Join with code</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
