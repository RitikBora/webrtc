import { WebSocket } from "ws";

export class Room {
    public user1 : WebSocket | null = null;
    public user2 : WebSocket | null = null;
    public roomId : String;

    constructor(roomId : string) 
    {
        this.roomId = roomId;
    }

    public addUser1(ws : WebSocket)
    {
        this.user1 = ws;
    }

    
    public addUser2(ws : WebSocket)
    {
        this.user2 = ws;
    }
}