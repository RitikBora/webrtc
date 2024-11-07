import { Video } from "lucide-react"
import { Link } from "react-router-dom"

export const AppBar = () => {

  return (
    <header className="sticky top-0 z-50 w-full border-b" style={{ backgroundColor: "#fef6e4", borderColor: "#001858" }}>
      <div className="container flex h-16 items-center justify-between px-5">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Video className="h-8 w-8 pt-1" style={{ color: "#f582ae" }} />
            <span className="text-2xl font-bold" style={{ color: "#001858" }}>Meetwise</span>
          </Link>
        </div>
        
      </div>
    </header>
  )
}
