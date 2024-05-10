import { useEffect, useState } from "react"
import { UserTemplate } from "./UserTemplate";

export function Room () {
    const [roomId , setRoomId] = useState("");
    useEffect(() =>
    {
        const url = window.location.href;
        const id = url.split("roomId=")[1];
        setRoomId(id);
    } , [])
    return (
        <div>

        </div>
    )
}