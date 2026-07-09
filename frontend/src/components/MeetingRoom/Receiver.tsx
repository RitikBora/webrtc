import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Copy, Video } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { ParticipantTile } from "../video/ParticipantTile";

export const Receiver = ({ isPeerConnected, peerVideoRef }: { isPeerConnected: boolean, peerVideoRef: React.RefObject<HTMLVideoElement> }) => {
  const [isWaiting, setIsWaiting] = useState(false);

  const copyRoomId = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Meeting link copied!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
    });
    setIsWaiting(true);
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  if (isPeerConnected) {
    return (
      <ParticipantTile name="Peer" videoOn muted={false}>
        <video autoPlay playsInline ref={peerVideoRef} />
      </ParticipantTile>
    );
  }

  return (
    <div className="flex aspect-[16/10] flex-col items-center justify-center rounded-md border border-border bg-ink-900 p-4">
      {!isWaiting ? (
        <>
          <h2 className="mb-4 font-display text-2xl font-bold text-white">Waiting for peer to join</h2>
          <div className="w-full max-w-md space-y-3">
            <Input
              value={window.location.href}
              readOnly
              className="text-center"
            />
            <Button onClick={copyRoomId} className="w-full">
              <Copy className="h-4 w-4" /> Copy meeting link
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <motion.div
            variants={pulseVariants}
            animate="pulse"
          >
            <Video className="h-16 w-16 text-primary" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-xl font-semibold text-white"
          >
            Waiting for peer to connect
          </motion.p>
        </div>
      )}
    </div>
  );
};
