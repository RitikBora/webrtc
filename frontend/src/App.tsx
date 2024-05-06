import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Sender } from "./components/Sender"
import { Reciever } from "./components/Reciever"

function App() {


  return (
   <div>
    <BrowserRouter>
      <Routes>
        <Route path="/sender" element= {<Sender/>}/>
        <Route path="/reciever" element= {<Reciever/>}/>
      </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
