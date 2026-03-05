import "./index.css"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from "./pages/login"
import Home from "./pages/Home/home"
import GerenciarDocentes from "./pages/GerenciarDocentes/gerenciarDocentes"


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/gerenciarDocentes" element={<GerenciarDocentes/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
