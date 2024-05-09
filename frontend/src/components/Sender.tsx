import { useEffect, useRef, useState } from "react"

export function Sender() {
    const [pc , setPC] = useState<RTCPeerConnection | null>(null);

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
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();
            // this is wrong, should propogate via a component
            document.body.appendChild(video);
            stream.getTracks().forEach((track) => {
                pc?.addTrack(track);
            });
        });
    }
    return (
        <div>
            sender
            <button onClick={getCameraStreamAndSend}>send video</button>
        </div>
    )
}