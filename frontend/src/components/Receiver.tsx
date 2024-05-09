import { useEffect, useRef, useState} from "react"


export const Receiver = () => {

    const [pc , setPC] = useState<RTCPeerConnection | null>(null);
    const peerVideoRef = useRef<HTMLVideoElement>(null);
    const selfVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        

        const socket = new WebSocket('ws://localhost:8080');
        const pc = new RTCPeerConnection();
        setPC(pc);

        socket.onopen = () =>
        {
            socket.send(JSON.stringify({type : "receiver"}));
        }

        
         pc.ontrack = (event) => {
           if (peerVideoRef.current) {
            peerVideoRef.current.srcObject = new MediaStream([event.track]);
            peerVideoRef.current.muted = true;
            peerVideoRef.current.play();
            }
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


        socket.onmessage = async(event) =>
        {
            const data = JSON.parse(event.data);
            switch(data.type)
            {
                case "createOffer":
                    pc.setRemoteDescription(data.sdp);
                    const answer = await pc.createAnswer(); 
                    pc.setLocalDescription(answer);
                    socket.send(JSON.stringify({type : "createAnswer" , sdp : answer}));
                    break;

                case "iceCandidate":
                    pc.addIceCandidate(data.candidate);
                    break;
                case "createAnswer": {
                    const answer = data.sdp;
                    await pc.setRemoteDescription(answer);
                    break;}
            }
        }

    

        return () => {
            socket.close();
        };
       
    }, []);

    const getCameraStreamAndSend = () => {
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
    return(
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
                     <div>
                        <button onClick={getCameraStreamAndSend}>Send Video</button>
                    </div>
                    }
                </div>
           </div>
           <div className="flex justify-center items-center">
                <div>
                    <div className="text-2xl font-bold">User 1 Video</div>
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