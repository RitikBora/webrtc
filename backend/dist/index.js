"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const Room_1 = require("./Room");
//Signaling server
const wss = new ws_1.default.Server({ port: 8082 });
const rooms = [];
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        const type = data.type;
        switch (type) {
            case "connect":
                {
                    const roomId = data.roomId;
                    let room = rooms.find(room => room.roomId === roomId);
                    if (!room) {
                        room = new Room_1.Room(roomId);
                        room.addUser1(ws);
                        rooms.push(room);
                        ws.send(JSON.stringify({ type: "roomCreated" }));
                    }
                    else {
                        room.addUser2(ws);
                    }
                    break;
                }
            case "createOffer":
                {
                    const roomId = data.roomId;
                    let room = rooms.find(room => room.roomId === roomId);
                    if (room && room.user1 && room.user2) {
                        if (ws === room.user1)
                            room.user2.send(JSON.stringify({ type: "createOffer", sdp: data.sdp }));
                        else
                            room.user1.send(JSON.stringify({ type: "createOffer", sdp: data.sdp }));
                    }
                    break;
                }
            case "createAnswer":
                {
                    const roomId = data.roomId;
                    let room = rooms.find(room => room.roomId === roomId);
                    if (room && room.user1 && room.user2) {
                        if (ws === room.user2)
                            room.user1.send(JSON.stringify({ type: "createAnswer", sdp: data.sdp }));
                        else
                            room.user2.send(JSON.stringify({ type: "createAnswer", sdp: data.sdp }));
                    }
                    break;
                }
            case "iceCandidate":
                {
                    const roomId = data.roomId;
                    let room = rooms.find(room => room.roomId === roomId);
                    if (room && room.user1 && room.user2) {
                        if (ws === room.user1) {
                            room.user2.send(JSON.stringify({ type: 'iceCandidate', candidate: data.candidate }));
                        }
                        else if (ws === room.user2) {
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
