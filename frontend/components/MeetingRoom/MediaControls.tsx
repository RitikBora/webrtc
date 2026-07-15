"use client"

import { useRecoilState, useSetRecoilState } from "recoil";
import { IsCallEnded, IsMicOnAtom, IsVideoOnAtom } from "../../recoil/atoms";
import { closeMediaStream } from "../../utils/videoUtils";
import { CallControlsBar } from "../video/CallControlsBar";

export const MediaControls = ({selfVideoRef , peerVideoRef} : {selfVideoRef :React.RefObject<HTMLVideoElement>, peerVideoRef :React.RefObject<HTMLVideoElement>}) =>
{
    const [isMicOn , setIsMicOn] = useRecoilState(IsMicOnAtom);
    const [isVideoOn, setIsVideoOn] = useRecoilState(IsVideoOnAtom);
    const setIsCallEnded = useSetRecoilState(IsCallEnded);

    return(
        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
            <CallControlsBar
                muted={!isMicOn}
                onToggleMute={() => setIsMicOn(!isMicOn)}
                cameraOff={!isVideoOn}
                onToggleCamera={() => setIsVideoOn(!isVideoOn)}
                onLeave={() => {
                    if(selfVideoRef.current?.srcObject)
                    {
                        closeMediaStream(selfVideoRef.current.srcObject as MediaStream);
                    }
                    if(peerVideoRef.current?.srcObject)
                    {
                        closeMediaStream(peerVideoRef.current.srcObject as MediaStream);
                    }
                    setIsCallEnded(true)
                }}
            />
      </div>
    )
}
