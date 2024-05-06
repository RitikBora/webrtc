"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
// Create a WebSocket server instance
const wss = new ws_1.default.Server({ port: 8080 });
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        const type = data.type;
        console.log(type);
        switch (type) {
            case "sender":
                () => {
                    console.log("****************");
                };
                break;
        }
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
