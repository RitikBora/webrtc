import { useEffect, useState} from "react"


export const Receiver = () => {

    const [pc , setPC] = useState<RTCPeerConnection | null>(null);

    useEffect(() => {
        

        const socket = new WebSocket('ws://localhost:8080');
        const pc = new RTCPeerConnection();
        setPC(pc);

        socket.onopen = () =>
        {
            socket.send(JSON.stringify({type : "receiver"}));
        }

        
         pc.ontrack = (event) => {
            console.log(event.track);
            const video = document.createElement('video');
            document.body.appendChild(video);
            video.srcObject = new MediaStream([event.track]);
            video.muted = true;
            video.play();
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
    return(
        <div>
            reciever
            <button onClick={getCameraStreamAndSend}>send video</button>
        </div>
    )
}