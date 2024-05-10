import WebSocket from "ws";
import { Room } from "./Room";
//Signaling server
const wss = new WebSocket.Server({ port: 8082 });

const rooms : Room[]= []; 

wss.on('connection', (ws) => {
        
    ws.on('message', (message : string) => {
       const data = JSON.parse(message);
       const type = data.type;
       switch(type)
       {
         case "connect":
            {
              const roomId = data.roomId;
              let room = rooms.find(room => room.roomId === roomId);
              if(!room)
              {
                room = new Room(roomId);
                room.addUser1(ws);
                rooms.push(room);
              }else
              {
                room.addUser2(ws);
              }
              break;
            }
           case "createOffer":
           {
              const roomId = data.roomId;
              let room = rooms.find(room => room.roomId === roomId);
              if(room && room.user1 && room.user2)
              {
                 if(ws === room.user1)
                  room.user2.send(JSON.stringify({type : "createOffer" , sdp : data.sdp}));
              else  
                  room.user1.send(JSON.stringify({type : "createOffer" , sdp : data.sdp}));
              }
              break;
           }
            case "createAnswer":
            {
              const roomId = data.roomId;
              let room = rooms.find(room => room.roomId === roomId);
              
              if(room && room.user1 && room.user2)
              {
                  if(ws === room.user2)
                    room.user1.send(JSON.stringify({type : "createAnswer" , sdp : data.sdp}));
                  else 
                    room.user2.send(JSON.stringify({type : "createAnswer" , sdp : data.sdp}));
              }
              
              break;
            }
             case "iceCandidate":
             {
                const roomId = data.roomId;
                let room = rooms.find(room => room.roomId === roomId);
              
                if(room && room.user1 && room.user2){
                  if (ws === room.user1) {
                  room.user2.send(JSON.stringify({ type: 'iceCandidate', candidate: data.candidate }));
                  } else if (ws === room.user2) {
                    room.user1.send(JSON.stringify({ type: 'iceCandidate', candidate: data.candidate }));
                  }
                }
                break;
             }
         
       }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
