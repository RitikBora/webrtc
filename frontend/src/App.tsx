import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Homepage } from "./components/Homepage"
// import { Room } from "./components/Room"
import { AppBar } from "./components/Appbar"
import { Footer } from "./components/Footer"
import { Room } from "./components/MeetingRoom/Room"
import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil"
import { ThemeProvider } from "./components/theme-provider"


function App() {


  return (
   <ThemeProvider defaultTheme="system" storageKey="meetwise-ui-theme">
   <div className="bg-background">

    <BrowserRouter>
      <RecoilRoot>
        <div className="flex flex-col min-h-screen">
        <AppBar/>
        <ToastContainer/>
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/room" element={<Room/>}/>
          </Routes>
        </div>
        <Footer/>
        </div>
      </RecoilRoot>
    </BrowserRouter>
   </div>
   </ThemeProvider>
  )
}

export default App
