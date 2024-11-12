import { Video } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { VideoRefAtom } from "../../recoil/atoms"
import { closeMediaStream } from "../../utils/videoUtils"


export const AppBar = () => {

  const videoRef = useRecoilValue(VideoRefAtom);
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 w-full border-b" style={{ backgroundColor: "#fef6e4", borderColor: "#001858" }}>
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
            <Video className="h-8 w-8 pt-1" style={{ color: "#f582ae" }} />
            <span className="text-2xl font-bold" style={{ color: "#001858" }}>Meetwise</span>
          </Link>
        </div>
        
      </div>
    </header>
  )
}
