"use client"

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRoomActions } from "@/context/RoomActionsContext";
import { Reveal } from "./Reveal";

export function CtaSection() {
  const { createRoom } = useRoomActions();

  return (
    <section className="bg-violet-600">
      <Reveal className="mx-auto max-w-[1200px] px-5 py-20 text-center sm:px-10 lg:py-[88px]">
        <h2 className="mx-auto max-w-[640px] font-display text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-4xl lg:text-[46px]">
          Your next meeting is one click away.
        </h2>
        <p className="mx-auto mt-[18px] max-w-[480px] font-body text-lg leading-[1.55] text-white/80">
          No sign-up. No download. Create a room and send the link — that's the whole setup.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button variant="secondary" size="lg" onClick={createRoom}>
            <Plus className="h-[18px] w-[18px]" />
            Create room
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
