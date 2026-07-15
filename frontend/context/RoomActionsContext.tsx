"use client"

import { createContext, useContext, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { generateRoomCode } from "@/lib/roomCode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface RoomActionsContextValue {
  createRoom: () => void;
  openJoinDialog: () => void;
}

const RoomActionsContext = createContext<RoomActionsContextValue | null>(null);

export function RoomActionsProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [roomCode, setRoomCode] = useState("");

  function createRoom() {
    router.push("/room?roomId=" + generateRoomCode());
  }

  function openJoinDialog() {
    setRoomCode("");
    setIsJoinDialogOpen(true);
  }

  function joinRoom() {
    if (roomCode.trim()) {
      router.push("/room?roomId=" + roomCode.trim());
      setIsJoinDialogOpen(false);
    }
  }

  return (
    <RoomActionsContext.Provider value={{ createRoom, openJoinDialog }}>
      {children}
      <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Join with a code</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="roomId"
              placeholder="e.g. quiet-otter-42"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && joinRoom()}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button onClick={joinRoom}>Join</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </RoomActionsContext.Provider>
  );
}

export function useRoomActions() {
  const ctx = useContext(RoomActionsContext);
  if (!ctx) throw new Error("useRoomActions must be used within RoomActionsProvider");
  return ctx;
}
