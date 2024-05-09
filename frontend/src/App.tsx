import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Sender } from "./components/Sender"
import { Receiver } from "./components/Receiver"

function App() {


  return (
   <div>
    <BrowserRouter basename="/zoom" >
      <Routes>
        <Route path="/sender" element= {<Sender/>}/>
        <Route path="/receiver" element= {<Receiver/>}/>
      </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
