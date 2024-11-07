import { useRecoilState } from "recoil";
import { isMutedAtom, IsVideoOnAtom } from "recoil/atoms";
import { Button } from "../ui/button";
import { Mic, MicOff, PhoneOff, Video, VideoOff } from "lucide-react";

export const MediaControls = () =>
{
    const [isMuted, setIsMuted] = useRecoilState(isMutedAtom);
    const [isVideoOn, setIsVideoOn] = useRecoilState(IsVideoOnAtom);

    return(
         <footer className="bg-[#fef6e4] p-4 border-t-2 border-[#001858]">
        <div className="container mx-auto flex justify-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className="bg-[#f582ae] text-[#001858] hover:bg-[#f582ae]/80 hover:text-[#001858] border-[#001858]"
          >
            {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsVideoOn(!isVideoOn)}
            className="bg-[#f582ae] text-[#001858] hover:bg-[#f582ae]/80 hover:text-[#001858] border-[#001858]"
          >
            {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-[#f582ae] text-[#001858] hover:bg-[#f582ae]/80 hover:text-[#001858] border-[#001858]"
          >
            <PhoneOff className="h-6 w-6" />
          </Button>
        </div>
      </footer>
    )
}