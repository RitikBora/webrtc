"use client"

import { useEffect, useRef, useState } from 'react'
import { Receiver } from './Receiver';
import {useRecoilValue, useSetRecoilState } from 'recoil';
import {IsMicOnAtom , IsVideoOnAtom, VideoRefAtom} from '../../recoil/atoms'
import { MediaControls } from './MediaControls';
import { EndCallPopup } from './EndCallPopup';
import {shareMedia} from "../../utils/videoUtils"
import {motion} from 'framer-motion'
import { ParticipantTile } from '../video/ParticipantTile';
import { createRealtime } from '../../lib/ablyClient';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
}


export const Room = () => {

  const isMicOn = useRecoilValue(IsMicOnAtom);
  const isVideoOn  = useRecoilValue(IsVideoOnAtom);
  const setVideoRef = useSetRecoilState(VideoRefAtom);


  const [pc , setPC] = useState<RTCPeerConnection | null>(null);
  const peerVideoRef = useRef<HTMLVideoElement>(null);
  const selfVideoRef = useRef<HTMLVideoElement>(null);
  const [isPeerConnected, setIsPeerConnected] = useState(false);






  useEffect(() =>
  {
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });
      setPC(pc);

      const urlParams = new URLSearchParams(window.location.search);
      const roomId = urlParams.get("roomId");

      // Unique id for this browser tab (the Ably clientId), used to pick a
      // deterministic "polite" peer for perfect negotiation.
      const selfId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2);

      // Perfect-negotiation state (replaces the old server-side offer/answer relay).
      let polite = false;
      let makingOffer = false;
      let ignoreOffer = false;
      // Only negotiate once the other peer is actually in the room. Otherwise the
      // first offer is published into an empty channel and lost (Ably does not
      // replay), leaving this peer stuck in "have-local-offer".
      let peerPresent = false;
      let negotiationPending = false;

      const ably = createRealtime(selfId);
      const channel = ably.channels.get(`room:${roomId}`);

      const sendSignal = (payload: object) => channel.publish("signal", payload);

      const makeOffer = async () => {
        try {
          makingOffer = true;
          await pc.setLocalDescription();
          sendSignal({ description: pc.localDescription });
        } catch (err) {
          console.error(err);
        } finally {
          makingOffer = false;
        }
      };

      pc.onnegotiationneeded = () => {
        if (!peerPresent) {
          negotiationPending = true;
          return;
        }
        makeOffer();
      };

      pc.onicecandidate = (event) => {
        if (event.candidate) sendSignal({ candidate: event.candidate });
      };

      pc.ontrack = (event) => {
        setIsPeerConnected(true);
        setTimeout(() => {
          if (peerVideoRef.current) {
            peerVideoRef.current.srcObject = new MediaStream([event.track]);
            peerVideoRef.current.muted = true;
            peerVideoRef.current.play();
          }
        }, 500);
      };

      // React to presence: pick the polite peer (smaller id) and, once the other
      // peer is here, run any negotiation that was deferred while alone.
      const updatePresence = async () => {
        const members = await channel.presence.get();
        const other = members
          .map((m) => m.clientId)
          .find((id) => id && id !== selfId);
        peerPresent = !!other;
        if (other) polite = selfId < other;
        if (peerPresent && negotiationPending) {
          negotiationPending = false;
          makeOffer();
        }
      };

      channel.presence.subscribe(updatePresence);

      channel.subscribe("signal", async (message) => {
        const { description, candidate } = message.data || {};
        try {
          if (description) {
            const offerCollision =
              description.type === "offer" &&
              (makingOffer || pc.signalingState !== "stable");
            ignoreOffer = !polite && offerCollision;
            if (ignoreOffer) return;

            await pc.setRemoteDescription(description);
            if (description.type === "offer") {
              await pc.setLocalDescription();
              sendSignal({ description: pc.localDescription });
            }
          } else if (candidate) {
            try {
              await pc.addIceCandidate(candidate);
            } catch (err) {
              if (!ignoreOffer) throw err;
            }
          }
        } catch (err) {
          console.error(err);
        }
      });

      // Enter, then check for a peer that is already here (subscribe covers later joins).
      channel.presence.enter().then(updatePresence);

      return () => {
        channel.presence.leave();
        ably.close();
        pc.close();
      };

  } , []);




 useEffect(() =>
 {
    init();
 } , [isVideoOn , isMicOn , pc]);

 const init = async() =>
 {
  if(pc)
    {

      const stream = await shareMedia(selfVideoRef , pc , isVideoOn , isMicOn);
       setVideoRef(stream);
    }
 }





  return (
   <div className="dark flex-1 bg-ink-950">
    <motion.div className='relative flex-1 pt-16 min-h-[calc(100vh-4rem)] flex flex-col'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <main className="flex-1 grid grid-cols-1 content-center gap-4 p-4 pb-28 md:grid-cols-2 md:gap-6 md:p-6 md:pb-32">
        <ParticipantTile name="You" videoOn={isVideoOn} muted={!isMicOn}>
          <video
            ref={selfVideoRef}
            autoPlay
            playsInline
          />
        </ParticipantTile>
        <Receiver peerVideoRef={peerVideoRef} isPeerConnected={isPeerConnected}/>
      </main>
      <MediaControls selfVideoRef={selfVideoRef} peerVideoRef={peerVideoRef}/>
      <EndCallPopup/>
    </motion.div>
   </div>
  );
};
