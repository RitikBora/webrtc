"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
//Signaling server
const wss = new ws_1.default.Server({ port: 8080 });
let senderSocket = null;
let receiverSockets = [];
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        const type = data.type;
        console.log(type);
        switch (type) {
            case "sender":
                // console.log('Sender connected');
                senderSocket = ws;
                break;
            case "receiver":
                // console.log('Receiver connected');
                receiverSockets.push(ws);
                senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: "addReceiver" }));
                break;
            case "createOffer":
                receiverSockets[data.index].send(JSON.stringify({ type: "createOffer", sdp: data.sdp, index: data.index }));
                break;
            case "createAnswer":
                senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: "createAnswer", sdp: data.sdp, index: data.index }));
                break;
            case "iceCandidate":
                if (ws === senderSocket)
                    receiverSockets[data.index].send(JSON.stringify({ type: "iceCandidate", candidate: data.candidate }));
                else if (receiverSockets.find(socket => socket === ws))
                    senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: "iceCandidate", candidate: data.candidate }));
        }
    });
    ws.on('close', () => {
        receiverSockets = receiverSockets.filter(socket => socket !== ws);
        console.log('Client disconnected');
    });
});
