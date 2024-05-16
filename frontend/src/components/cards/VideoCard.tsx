import { RefObject } from "react";

type VideoCardProps = {
    type : "sender" | "reciever",
    reference : RefObject<HTMLVideoElement> | null,
}
export function VideoCard({type , reference } : VideoCardProps) {

    
   return (
            <div className="bg-gray-900 w-96 h-72 rounded-lg flex justify-center items-center">
                <video className="w-full h-full object-cover" autoPlay muted ref={reference}>
                    <source src="your-video-source.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
    );
}
