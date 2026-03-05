import "./index.css"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from "./pages/login"
import Home from "./pages/Home/home"
import GerenciarDocentes from "./pages/GerenciarDocentes/gerenciarDocentes"
import AdicionarDocente from "./pages/adicionarDocente/adicionarDocente"


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/gerenciarDocentes" element={<GerenciarDocentes/>}/>
          <Route path="/adicionarDocente" element={<AdicionarDocente/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
