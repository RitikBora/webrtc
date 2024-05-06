import { useEffect, useState } from "react";

export function Sender() {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    
    useEffect(() =>
    {
        const ws = new WebSocket("ws://localhost:8080/");
        setSocket(ws);
        ws.onopen = () =>
        {
            ws.send(JSON.stringify({type : "sender"}));
        }

         return () => {
        setSocket(null);    
        ws.close();
        };

    } , [])

    async function  onsubmit() {

          if (!socket) {
            alert("Socket not found");
            return;
        }

        const pc = new RTCPeerConnection();
        socket.onmessage = async (event) => {
            const data = JSON.parse(event.data);
           if(data.type === "createAnswer")
           {
                if(pc === null) return ;
                await pc.setRemoteDescription(data.sdp);
           }else if (data.type === "addIceCandidate")
           {
                if(pc === null) return ;
                pc.addIceCandidate(data.iceCandidate);
           }
        };


        if(pc == null)  return;

       pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.send(JSON.stringify({
                    type: 'addIceCandidate',
                    candidate: event.candidate
                }));
            }
        }

        pc.onnegotiationneeded = async () =>
        {
            
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket?.send(JSON.stringify({type : "createOffer" , sdp : offer}));
        }

        //connected to reciever
        getCameraStreamAndSend(pc);
    }

     const getCameraStreamAndSend = (pc: RTCPeerConnection) => {
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
            <button onClick={onsubmit}>Send Video</button>
        </div>
    )
}