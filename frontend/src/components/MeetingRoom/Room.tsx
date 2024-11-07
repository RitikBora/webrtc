import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Video, VideoOff, PhoneOff, Copy} from 'lucide-react'
import { Receiver } from './Receiver';


export const Room = () => {

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [roomId, setRoomId] = useState('123-456-789'); 
 

 
  return (
   <div className='flex-1  pt-16'>
      <main className="flex-grow flex flex-col md:flex-row p-4 gap-8">
        <div className="flex-1 bg-[#f3d2c1] rounded-lg overflow-hidden shadow-lg">
          <div className="relative h-full">
            <video
              className={`w-full h-full object-cover ${isVideoOn ? '' : 'hidden'}`}
              src="/placeholder.svg?height=720&width=1280"
              muted
              autoPlay
              playsInline
            />
            {!isVideoOn && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#8bd3dd]">
                <span className="text-[#001858] font-bold">Video Off</span>
              </div>
            )}
            <div className="absolute bottom-4 left-4 bg-[#f582ae] text-[#001858] px-2 py-1 rounded">
              You
            </div>
          </div>
        </div>
        <Receiver roomId={roomId}/>
      </main>

      
    </div>
  );
};



