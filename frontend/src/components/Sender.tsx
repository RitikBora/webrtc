import { useEffect, useState } from "react";

export function Sender() {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [peerCount , setPeerCount] = useState(0);

    
    useEffect(() =>
    {
        const ws = new WebSocket("ws://localhost:8080/");
        setSocket(ws);
        ws.onopen = () =>
        {
            ws.send(JSON.stringify({type : "sender"}));
        }

        ws.onmessage = (event) =>
        {
            const data  = JSON.parse(event.data);
            if(data.type === "addReceiver")
            {
                setPeerCount(count => count + 1);
            }
                
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

        
        
        socket.onmessage = async (event) => {
            const data = JSON.parse(event.data);
           if(data.type === "createAnswer")
           {    
                if(!peerConnections[data.index]) return;
                peerConnections[data.index].setRemoteDescription(data.sdp);
                    
           }else if (data.type === "iceCandidate")
           {
                if(peerConnections[data.index] === null) return ;
                peerConnections[data.index].addIceCandidate(data.candidate);
           }
        };

        const peerConnections : RTCPeerConnection[] = [];

        for(let i = 0 ; i < peerCount ; i ++)
        {
            const pc = new RTCPeerConnection();

            pc.onicecandidate = ((event) => {
            if (event.candidate) {
                socket.send(JSON.stringify({
                    type: 'iceCandidate',
                    candidate: event.candidate,
                    index : i
                }));
            }
            })

             pc.onnegotiationneeded = async () =>
            {
                console.log("negotiation required")
                const offer = await pc.createOffer();
                await pc.setLocalDescription(offer);
                socket?.send(JSON.stringify({type : "createOffer" , sdp : offer , index : i}));
            }
            peerConnections.push(pc);
        }

        //connected to reciever
        getCameraStreamAndSend(peerConnections);
    }

     const getCameraStreamAndSend = (peerConnections : RTCPeerConnection[]) => {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();
            // this is wrong, should propogate via a component
            document.body.appendChild(video);
            stream.getTracks().forEach((track) => {
                peerConnections.forEach(peer => {
                    peer.addTrack(track);
                });
            });
        });
    }
    return (
        
        <div>
            <button onClick={onsubmit}>Send Video</button>
        </div>
    )
}