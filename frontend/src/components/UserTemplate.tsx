import { useEffect, useRef, useState } from "react"
import { Bounce, ToastContainer , toast } from "react-toastify";
 import 'react-toastify/dist/ReactToastify.css';
import { VideoCard } from "./cards/VideoCard";
export function UserTemplate() {
    const [pc , setPC] = useState<RTCPeerConnection | null>(null);
    const peerVideoRef = useRef<HTMLVideoElement>(null);
    const selfVideoRef = useRef<HTMLVideoElement>(null);
    const [sentStatus ,  setSentStatus] = useState(false); 

    

   useEffect(() =>
   {
          
         const urlParams = new URLSearchParams(window.location.search);
         const roomId = urlParams.get("roomId");
         
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
   }   , [])  

    function getCameraStreamAndSend()
    {
        setSentStatus(true);
        navigator.mediaDevices.getUserMedia({ video: true , audio: true }).then((stream) => {
             if(selfVideoRef.current)
            {
                selfVideoRef.current.srcObject = stream;
                selfVideoRef.current.muted = true;
                selfVideoRef.current.play();
            }
            stream.getTracks().forEach((track) => {
                pc?.addTrack(track);
            });

        });
    }
       return (
        <div>
            <div className="grid grid-cols-2">
                <div className=" h-screen flex justify-center items-center">
                    <div>
                        <VideoCard type="sender" reference={selfVideoRef}/>
                        <div className='text-3xl w-96 pt-2 flex justify-center'>
                            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 
                            dark:focus:ring-lime-800" onClick={getCameraStreamAndSend}>
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Share Video
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div>
                        <VideoCard type="reciever"  reference={peerVideoRef} />
                    </div>
                </div>
            </div>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
            />
        </div>
    )
}