import WebSocket from "ws";

//Signaling server
const wss = new WebSocket.Server({ port: 8080 });


let senderSocket : WebSocket | null = null;
let receiverSocket : WebSocket | null = null;
wss.on('connection', (ws) => {
    

    
    ws.on('message', (message : string) => {
       const data = JSON.parse(message);
       const type = data.type;
   
       switch(type)
       {
         case "sender" : 
            console.log('Sender connected');
            senderSocket = ws;
            break;

         case "receiver" :
            console.log('Receiver connected');
            receiverSocket = ws;
            break;

         case "createOffer" :
            receiverSocket?.send(JSON.stringify({type: "createOffer" , sdp : data.sdp}));
            break;

         case "createAnswer" :
            senderSocket?.send(JSON.stringify({type: "createAnswer" , sdp : data.sdp}));
            break;

         case "iceCandidate" : 
            if(ws === senderSocket)
                receiverSocket?.send(JSON.stringify({type: "iceCandidate" , candidate : data.candidate}));
            else if(ws === receiverSocket)
                senderSocket?.send(JSON.stringify({type: "iceCandidate" , candidate : data.candidate}));
       }

    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
