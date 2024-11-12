import { Github, Linkedin, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

export const Footer = () =>
{
    return(
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t" style={{ backgroundColor: "#f3d2c1", borderColor: "#001858" }}>
        <p className="text-xs" style={{ color: "#001858" }}>© 2024 Bora Meet Platform. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
         
        </nav>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link to="https://github.com/RitikBora" style={{ color: "#001858" }} target="_blank">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link to="https://x.com/RitikBora11" style={{ color: "#001858" }} target="_blank"> 
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link to="https://www.linkedin.com/in/ritikbora" style={{ color: "#001858" }} target="_blank">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </footer>
    )
}


