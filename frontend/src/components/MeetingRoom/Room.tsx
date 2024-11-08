import { useEffect, useRef, useState } from 'react'
import { Receiver } from './Receiver';
import {useRecoilValue } from 'recoil';
import {IsMicOnAtom , IsVideoOnAtom} from '../../../recoil/atoms'
import { MediaControls } from './MediaControls';
import { EndCallPopup } from './EndCallPopup';
import { Bounce, toast } from 'react-toastify';
import {shareMedia} from "../../../utils/videoUtils"


export const Room = () => {

  const isMicOn = useRecoilValue(IsMicOnAtom);
  const isVideoOn  = useRecoilValue(IsVideoOnAtom);
  const [roomId, setRoomId] = useState(''); 

  const [pc , setPC] = useState<RTCPeerConnection | null>(null);
  const peerVideoRef = useRef<HTMLVideoElement>(null);
  const selfVideoRef = useRef<HTMLVideoElement>(null);



  useEffect(() =>
  {
      const urlParams = new URLSearchParams(window.location.search);
      const roomId = urlParams.get("roomId");
      if(roomId)
        setRoomId(roomId);
         
  } , [])


  useEffect(() =>
  {
      // const socket = new WebSocket('ws://ritikboradev.com:8082');
      const socket = new WebSocket("ws://localhost:8082")
      const pc = new RTCPeerConnection();
      setPC(pc);

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
            if (peerVideoRef.current) {
            peerVideoRef.current.srcObject = new MediaStream([event.track]);
            peerVideoRef.current.muted = true;
            peerVideoRef.current.play();
            }
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
                    toast.info('Share URL with the receiver', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
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


  } , [])
 

 useEffect(() =>
 {
    shareMedia(selfVideoRef , pc , isVideoOn , isMicOn);
 } , [isVideoOn , isMicOn]);




 
  return (
   <div className='flex-1  pt-16'>
      <main className="flex-grow flex flex-col md:flex-row p-4 gap-8">
        <div className="flex-1 bg-[#f3d2c1] rounded-lg overflow-hidden shadow-lg min-h-96">
          <div className="relative h-full">
            <video
              className={`w-full h-96 object-cover ${isVideoOn ? '' : 'hidden'}`}
              ref={selfVideoRef}
              autoPlay
              playsInline
            />
            {!isVideoOn && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#8bd3dd]">
                <span className="text-[#001858] font-bold">Video Off</span>
              </div>
            )}
            <div className="absolute bottom-4 left-4 bg-[#f582ae] text-[#001858] px-2 py-1 rounded">
              You
            </div>
          </div>
        </div>
        <Receiver roomId={roomId}/>
      </main>
      <MediaControls/>
      <EndCallPopup/>
    </div>
  );
};



