import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Video, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

import { HeroSection } from "./Hero";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.1
    }
  },
  tap: {
    scale: 0.95
  }
}

export function Homepage() {
  const navigate = useNavigate();
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [roomId, setRoomId] = useState("");

  function generateRoomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let length = 8;
    let roomId = '';
    for (let i = 0; i < length; i++) {
      roomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return roomId;
  }

  function createRoom() {
    const roomId = generateRoomId();
    navigate("/room?roomId=" + roomId);
  }

  function openJoinDialog() {
    setIsJoinDialogOpen(true);
  }

  function joinRoom() {
    if (roomId) {
      navigate("/room?roomId=" + roomId);
    }
  }

  return (
    <main className="flex-grow">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <motion.div
          className="container px-4 md:px-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col items-center gap-4 space-y-4 text-center">
            <motion.div className="space-y-2" variants={itemVariants}>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none" style={{ color: "#001858" }}>
                Connect Anywhere, Anytime
              </h1>
              <p className="mx-auto max-w-[700px] text-lg sm:text-xl" style={{ color: "#172c66" }}>
                Your go-to platform for seamless video meetings. Create or join a meeting with just one click.
              </p>
            </motion.div>
            <motion.div className="space-x-4" variants={itemVariants}>
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="inline-block"
              >
                <Button 
                  className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-lg font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50" 
                  style={{ backgroundColor: "#f582ae", color: "#001858" }}
                  onClick={createRoom}
                >
                  <Video style={{ width: "1.5rem", height: "1.5rem" }} className="pt-0.5" />
                  Create Meeting
                </Button>
              </motion.div>
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="inline-block"
              >
                <Button 
                  variant="outline" 
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 px-4 py-2 text-lg font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50" 
                  style={{ borderColor: "#f582ae", color: "#001858" }}
                  onClick={openJoinDialog}
                >
                  <UserPlus style={{ width: "1.5rem", height: "1.5rem" }} className="pt-0.5" />
                  Join Meeting
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
      <section className="w-full py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#f3d2c1" }}>
        <HeroSection/>
      </section>

      <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
        <DialogContent className="sm:max-w-[425px]" style={{ backgroundColor: "#fef6e4", color: "#001858" }}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Join Meeting</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="roomId"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              style={{ borderColor: "#f582ae", color: "#001858" }}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={joinRoom}
              style={{ backgroundColor: "#f582ae", color: "#001858" }}
            >
              Join
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}