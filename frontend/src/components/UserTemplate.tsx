import { useEffect, useRef, useState } from "react"

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
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
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
                    <div className="text-2xl font-bold">Your Video</div>
                    <div>
                        <video ref={selfVideoRef} >
                            <source src="your-video-source.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    {
                     !sentStatus && <div>
                        <button onClick={getCameraStreamAndSend}>Send Video</button>
                    </div>
                    }
                </div>
           </div>
           <div className="flex justify-center items-center">
                <div>
                    <div className="text-2xl font-bold">Peer Video</div>
                    <div>
                        <video ref={peerVideoRef} >
                            <source src="your-video-source.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
           </div>
           </div>
        </div>
    )
}