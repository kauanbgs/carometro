import "./index.css"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from "./pages/login"
import Home from "./pages/Home/home"


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
