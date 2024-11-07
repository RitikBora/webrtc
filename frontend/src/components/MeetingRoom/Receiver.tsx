
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";



export const Receiver = ({roomId} : {roomId : string}) =>
{
   const [isPeerConnected, setIsPeerConnected] = useState(false);

    const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    toast.success('Room ID Copied!', {
        position:"top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        });
  };

  return(
    <div className="flex-1 bg-[#f3d2c1] rounded-lg overflow-hidden shadow-lg min-h-96">
          {isPeerConnected ? (
            <div className="relative h-full">
              <video
                className="w-full h-full object-cover"
                src="/placeholder.svg?height=720&width=1280"
                autoPlay
                playsInline
              />
              <div className="absolute bottom-4 left-4 bg-[#f582ae] text-[#001858] px-2 py-1 rounded">
                Peer
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4">
              <h2 className="text-2xl font-bold text-[#001858] mb-4">Waiting for peer to join...</h2>
              <div className="w-full max-w-md space-y-4">
                <Input
                  value={roomId}
                  readOnly
                  className="bg-[#fef6e4] text-[#001858] border-[#001858] text-center"
                />
                <Button
                  onClick={copyRoomId}
                  className="w-full bg-[#f582ae] text-[#001858] hover:bg-[#f582ae]/80"
                >
                  <Copy className="h-4 w-4 mr-2" /> Copy Room ID
                </Button>
              </div>
            </div>
          )}
        </div>
  )
}


