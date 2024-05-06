import WebSocket from "ws";

//Signaling server
const wss = new WebSocket.Server({ port: 8080 });


let senderSocket : WebSocket | null = null;
let recieverSocket : WebSocket | null = null;
wss.on('connection', (ws) => {
    console.log('Client connected');

    
    ws.on('message', (message : string) => {
       const data = JSON.parse(message);
       const type = data.type;
        
       switch(type)
       {
         case "sender" : 
            senderSocket = ws;
            break;

         case "reciever" :
            recieverSocket = ws;
            break;

         case "createOffer" :
            recieverSocket?.send(JSON.stringify({type: "createOffer" , sdp : data.sdp}));
            break;

         case "createAnswer" :
            senderSocket?.send(JSON.stringify({type: "createAnswer" , sdp : data.sdp}));
            break;

         case "addIceCandidate" : 
            if(ws === senderSocket)
                recieverSocket?.send(JSON.stringify({type: "addIceCandidate" , iceCandidate : data.iceCandidate}));
            else if(ws === recieverSocket)
                senderSocket?.send(JSON.stringify({type: "addIceCandidate" , iceCandidate : data.iceCandidate}));
       }

    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
