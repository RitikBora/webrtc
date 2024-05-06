import { useEffect, useRef } from "react"


export const Receiver = () => {

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: 'reciever'
            }));
        }

    

        startReceiving(socket);
    }, []);

   async function startReceiving(socket : WebSocket)
   {
        const video = document.createElement('video');
        document.body.appendChild(video);

        const pc = new RTCPeerConnection();
        pc.ontrack = (event) => {
            video.srcObject = new MediaStream([event.track]);
            video.muted = true;
            video.play();
        }

        socket.onmessage = async(event) => {
            const data = JSON.parse(event.data);
            switch(data.type)
            {
                case "createOffer" : 
                    pc.setRemoteDescription(data.sdp);
                    const answer = await pc.createAnswer();
                    pc.setLocalDescription(answer);
                    socket.send(JSON.stringify({type: "createAnswer" , sdp : answer}));
                    break;

                case "addIceCandidate":
                    
                    pc.addIceCandidate(data.iceCandidate); 
            }
        }       
        
   }

    return(
        <div>
            reciever
        </div>
    )
}