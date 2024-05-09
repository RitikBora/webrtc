import { useEffect, useRef, useState } from "react"

export function Sender() {
    const [pc , setPC] = useState<RTCPeerConnection | null>(null);
    const selfVideoRef = useRef<HTMLVideoElement>(null)

   useEffect(() =>
   {

        const socket = new WebSocket('ws://localhost:8080');
        const pc = new RTCPeerConnection();
        setPC(pc);

        socket.onopen = () =>
        {
            socket.send(JSON.stringify({type : "sender"}));
        }

        pc.onnegotiationneeded = async () =>
        {
            
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket?.send(JSON.stringify({type : "createOffer" , sdp : offer}));
        }

         pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.send(JSON.stringify({
                    type: 'iceCandidate',
                    candidate: event.candidate
                }));
            }
        }
        
        pc.ontrack = (event) =>
        {
            const video = document.createElement('video');
            document.body.appendChild(video);
            video.srcObject = new MediaStream([event.track]);
            video.muted = true;
            video.play();
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
                    socket.send(JSON.stringify({type : "createAnswer" , sdp : answer}));
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
            <div>
                        <video ref={selfVideoRef} >
                            <source src="your-video-source.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
            <div>
                <button onClick={getCameraStreamAndSend}>Send Video</button>
            </div>
        </div>
    )
}