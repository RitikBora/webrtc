import WebSocket from "ws";

//Signaling server
const wss = new WebSocket.Server({ port: 8080 });


let senderSocket : WebSocket | null = null;
let receiverSockets : WebSocket[]= [];
wss.on('connection', (ws) => {
    

    
    ws.on('message', (message : string) => {
       const data = JSON.parse(message);
       const type = data.type;

       console.log(type);
       switch(type)
       {
         case "sender" : 
            // console.log('Sender connected');
            senderSocket = ws;
            break;

         case "receiver" :
            // console.log('Receiver connected');
            receiverSockets.push(ws);
            senderSocket?.send(JSON.stringify({type : "addReceiver"}))
            break;

         case "createOffer" :
            receiverSockets[data.index].send(JSON.stringify({type: "createOffer" , sdp : data.sdp , index : data.index}));
            break;

         case "createAnswer" :
            senderSocket?.send(JSON.stringify({type: "createAnswer" , sdp : data.sdp , index : data.index}));
            break;

         case "iceCandidate" : 
            if(ws === senderSocket)
                receiverSockets[data.index].send(JSON.stringify({type: "iceCandidate" , candidate : data.candidate}));
            else if(receiverSockets.find(socket => socket === ws))
                senderSocket?.send(JSON.stringify({type: "iceCandidate" , candidate : data.candidate}));
       }

    });

    ws.on('close', () => {
         receiverSockets = receiverSockets.filter(socket => socket !== ws);
        console.log('Client disconnected');
    });
});
