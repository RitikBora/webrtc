"use client"

import { Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRoomActions } from "@/context/RoomActionsContext";
import { CharacterTile } from "./CharacterTile";
import { DecorativeCallControls } from "./DecorativeCallControls";
import { heroPeople } from "./people";

export function HeroSection() {
  const { createRoom, openJoinDialog } = useRoomActions();

  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-5 py-16 sm:px-10 md:py-20 lg:grid-cols-2 lg:gap-12 lg:py-[88px]">
        <div>
          <Badge tone="violet" dot>
            No sign-up required
          </Badge>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-[60px] lg:leading-[1.04]">
            Meetings that start the moment you do.
          </h1>
          <p className="mt-5 max-w-[470px] font-body text-lg leading-[1.55] text-muted-foreground">
            No accounts, no downloads, no waiting rooms. Create a room, share the link, and you're talking — with enterprise-grade security running quietly underneath.
          </p>

          <div className="mt-8 flex max-w-[450px] flex-col gap-4">
            <div className="flex flex-wrap gap-2.5">
              <Button size="lg" onClick={createRoom}>
                <Plus className="h-[18px] w-[18px]" />
                Create room
              </Button>
              <Button size="lg" variant="secondary" onClick={openJoinDialog}>
                Join with code
              </Button>
            </div>
            <div className="flex items-center gap-2 font-body text-sm text-muted-foreground">
              <span className="h-[7px] w-[7px] rounded-full bg-connected" />
              Free forever for rooms up to 12 · SOC 2 Type II &amp; end-to-end encrypted
            </div>
          </div>
        </div>

        <div className="[animation:mwFloat_7s_var(--ease-smooth)_infinite]">
          <div className="rounded-lg bg-ink-900 p-3.5 shadow-[0_34px_80px_-34px_rgba(37,24,97,0.55)]">
            <div className="flex items-center justify-between px-1.5 pb-3 pt-1">
              <div className="flex items-center gap-2 font-body text-sm font-medium text-white">
                Q3 planning
                <span className="inline-flex items-center gap-1.5 rounded-pill bg-[rgba(46,217,163,0.16)] px-2.5 py-[3px] font-body text-xs text-green-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 [animation:mwDot_2s_var(--ease-smooth)_infinite]" />
                  Live
                </span>
              </div>
              <span className="font-body text-xs text-white/60">04:12</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {heroPeople.map((p) => (
                <CharacterTile key={p.label} {...p} />
              ))}
            </div>
            <div className="mt-3.5 flex justify-center">
              <DecorativeCallControls />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
