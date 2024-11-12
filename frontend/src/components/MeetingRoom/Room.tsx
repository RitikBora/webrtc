import { useEffect, useRef, useState } from 'react'
import { Receiver } from './Receiver';
import {useRecoilValue } from 'recoil';
import {IsMicOnAtom , IsVideoOnAtom} from '../../../recoil/atoms'
import { MediaControls } from './MediaControls';
import { EndCallPopup } from './EndCallPopup';
// import {shareMedia} from "../../../utils/videoUtils"



export const Room = () => {

  const isMicOn = useRecoilValue(IsMicOnAtom);
  const isVideoOn  = useRecoilValue(IsVideoOnAtom);


  const [pc , setPC] = useState<RTCPeerConnection | null>(null);
  const peerVideoRef = useRef<HTMLVideoElement>(null);
  const selfVideoRef = useRef<HTMLVideoElement>(null);
  const [isPeerConnected, setIsPeerConnected] = useState(false);





  useEffect(() =>
  {
      // const socket = new WebSocket('ws://ritikboradev.com:8082');
      const socket = new WebSocket("ws://localhost:8082")
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
    if(pc)
      shareMedia(selfVideoRef , pc , isVideoOn , isMicOn);
 } , [isVideoOn , isMicOn , pc]);




 
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
        <Receiver peerVideoRef={peerVideoRef} isPeerConnected={isPeerConnected}/>
      </main>
      <MediaControls selfVideoRef={selfVideoRef} peerVideoRef={peerVideoRef}/>
      <EndCallPopup/>
    </div>
  );
};





function shareMedia(
    selfVideoRef: React.RefObject<HTMLVideoElement>,
    pc: RTCPeerConnection | null,
    isVideoOn: boolean,
    isMicOn: boolean
) {
    if (selfVideoRef.current && selfVideoRef.current.srcObject) {
        // Close the existing stream and start a new one
        modifyExistingMediaStream(selfVideoRef.current.srcObject as MediaStream, selfVideoRef, isVideoOn, isMicOn, pc);
    } else {
        // If there's no stream yet, create a new one
        createMediaStream(selfVideoRef, pc, isVideoOn, isMicOn);
    }
}

const modifyExistingMediaStream = (
    existingStream: MediaStream,
    selfVideoRef: React.RefObject<HTMLVideoElement>,
    isVideoOn: boolean,
    isMicOn: boolean,
    pc: RTCPeerConnection | null
) => {
    // Close and stop the existing stream
    closeMediaStream(existingStream);

    // Create and attach a new media stream
    createMediaStream(selfVideoRef, pc, isVideoOn, isMicOn);
};

const createMediaStream = (
    selfVideoRef: React.RefObject<HTMLVideoElement>,
    pc: RTCPeerConnection | null,
    isVideoOn: boolean,
    isMicOn: boolean
) => {
    navigator.mediaDevices
        .getUserMedia({ video: isVideoOn, audio: isMicOn })
        .then((newStream) => {
            // Set the new stream to the video element
            if (selfVideoRef.current) {
                selfVideoRef.current.srcObject = newStream;
                selfVideoRef.current.muted = true;
                selfVideoRef.current.play(); // Ensure video plays
            }

            // Add the new tracks to the peer connection
            newStream.getTracks().forEach((track) => {
                pc?.addTrack(track, newStream);
            });
        })
        .catch((err) => {
            console.error('Error accessing media devices:', err);
        });
};

export const closeMediaStream = (existingStream: MediaStream , peerStream ?: MediaStream) => {
    existingStream.getTracks().forEach((track) => track.stop()); // Stop all tracks

    if(peerStream)  peerStream.getTracks().forEach((track) => track.stop())
};