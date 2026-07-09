import { useEffect, useRef, useState } from 'react'
import { Receiver } from './Receiver';
import {useRecoilValue, useSetRecoilState } from 'recoil';
import {IsMicOnAtom , IsVideoOnAtom, VideoRefAtom} from '../../../recoil/atoms'
import { MediaControls } from './MediaControls';
import { EndCallPopup } from './EndCallPopup';
import {shareMedia} from "../../../utils/videoUtils"
import {motion} from 'framer-motion'
import { ParticipantTile } from '../video/ParticipantTile';

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
      const socket = new WebSocket("ws://localhost:8082")
      // const socket = new WebSocket('ws://ritikboradev.com:8082');
      const pc = new RTCPeerConnection();
      setPC(pc);


const urlParams = new URLSearchParams(window.location.search);
      const roomId = urlParams.get("roomId");

      socket.onopen = () =>
      {
          socket.send(JSON.stringify({roomId : roomId , type : "connect"}));
      }


      pc.onnegotiationneeded = async () =>
        {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket.send(JSON.stringify({type : "createOffer" , sdp : offer , roomId: roomId}));
        }

         pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.send(JSON.stringify({
                    type: 'iceCandidate',
                    candidate: event.candidate,
                    roomId : roomId
                }));
            }
        }

        pc.ontrack = (event) =>
        {
          setIsPeerConnected(true);
          setTimeout(() =>{
            if (peerVideoRef.current) {
              peerVideoRef.current.srcObject = new MediaStream([event.track]);
              peerVideoRef.current.muted = true;
              peerVideoRef.current.play();
            }
          } , 500)


        }

          socket.onmessage = async (event) =>
        {

            const data = JSON.parse(event.data);
            switch(data.type)
            {

                case "createAnswer": {
                    const answer = data.sdp;
                    await pc.setRemoteDescription(answer);
                    break;}

                case "roomCreated" :
                {
                    break;
                }

                case "iceCandidate":
                    pc.addIceCandidate(data.candidate);
                    break;
                 case "createOffer":{
                    pc.setRemoteDescription(data.sdp);
                    const answer = await pc.createAnswer();
                    pc.setLocalDescription(answer);
                    socket.send(JSON.stringify({type : "createAnswer" , sdp : answer , roomId : roomId}));
                    break;
                 }
            }
        }

         return () => {
            socket.close();
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
