import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Copy, Video } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export const Receiver = ({ isPeerConnected, peerVideoRef }: { isPeerConnected: boolean, peerVideoRef: React.RefObject<HTMLVideoElement> }) => {
  const [isWaiting, setIsWaiting] = useState(false);

  const copyRoomId = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Room ID Copied!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
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

  return (
    <div className="flex-1 bg-[#f3d2c1] rounded-lg overflow-hidden shadow-lg min-h-96">
      {isPeerConnected ? (
        <div className="relative h-full">
          <video
            className="w-full h-96 object-cover"
            src="/placeholder.svg?height=720&width=1280"
            autoPlay
            playsInline
            ref={peerVideoRef}
          />
          <div className="absolute bottom-4 left-4 bg-[#f582ae] text-[#001858] px-2 py-1 rounded">
            Peer
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-4">
          {!isWaiting ? (
            <>
              <h2 className="text-2xl font-bold text-[#001858] mb-4">Waiting for peer to join...</h2>
              <div className="w-full max-w-md space-y-4">
                <Input
                  value={window.location.href}
                  readOnly
                  className="bg-[#fef6e4] text-[#001858] border-[#001858] text-center"
                />
                <Button
                  onClick={copyRoomId}
                  className="w-full bg-[#f582ae] text-[#001858] hover:bg-[#f582ae]/80"
                >
                  <Copy className="h-4 w-4 mr-2" /> Copy Meeting Link
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-6">
              <motion.div
                variants={pulseVariants}
                animate="pulse"
                className="relative"
              >
                <Video className="w-24 h-24 text-[#f582ae]" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-semibold text-[#001858]"
              >
                Waiting for peer to connect...
              </motion.p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};