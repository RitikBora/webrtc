import { Video } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { VideoRefAtom } from "../../recoil/atoms"
import { closeMediaStream } from "../../utils/videoUtils"
import { ModeToggle } from "./mode-toggle"


export const AppBar = () => {

  const videoRef = useRecoilValue(VideoRefAtom);
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-5">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2" onClick={(event) => {
            event.preventDefault();
            if(videoRef)
            {

              closeMediaStream(videoRef);
            }

            navigate("/")

          }}>
            <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-primary text-primary-foreground">
              <Video className="h-[18px] w-[18px]" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight text-foreground">Meetwise</span>
          </Link>
        </div>

        <ModeToggle />
      </div>
    </header>
  )
}
