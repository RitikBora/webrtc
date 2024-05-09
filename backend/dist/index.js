"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
//Signaling server
const wss = new ws_1.default.Server({ port: 8080 });
let senderSocket = null;
let receiverSocket = null;
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        const type = data.type;
        console.log(type);
        switch (type) {
            case "sender":
                senderSocket = ws;
                break;
            case "receiver":
                receiverSocket = ws;
                break;
            case "createOffer":
                if (ws == senderSocket)
                    receiverSocket === null || receiverSocket === void 0 ? void 0 : receiverSocket.send(JSON.stringify({ type: "createOffer", sdp: data.sdp }));
                else
                    senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: "createOffer", sdp: data.sdp }));
                break;
            case "createAnswer":
                if (ws === receiverSocket)
                    senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: "createAnswer", sdp: data.sdp }));
                else
                    receiverSocket === null || receiverSocket === void 0 ? void 0 : receiverSocket.send(JSON.stringify({ type: "createAnswer", sdp: data.sdp }));
                break;
            case "iceCandidate":
                if (ws === senderSocket) {
                    receiverSocket === null || receiverSocket === void 0 ? void 0 : receiverSocket.send(JSON.stringify({ type: 'iceCandidate', candidate: data.candidate }));
                }
                else if (ws === receiverSocket) {
                    senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: 'iceCandidate', candidate: data.candidate }));
                }
        }
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
