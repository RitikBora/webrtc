import { Github, Linkedin, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

export const Footer = () =>
{
    return(
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t" style={{ backgroundColor: "#f3d2c1", borderColor: "#001858" }}>
        <p className="text-xs" style={{ color: "#001858" }}>© 2025 Bora Meet Platform. All rights reserved.</p>
       
       
      </footer>
    )
}


