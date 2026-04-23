import "./index.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/login"
import Home from "./pages/Home/home"
import GerenciarDocentes from "./pages/GerenciarDocentes/gerenciarDocentes"
import AdicionarDocente from "./pages/adicionarDocente/adicionarDocente"
import RemoverDocente from "./pages/removerDocente/removerDocente"
import Page404 from "./pages/404/page404"
import EditarTurma from "./pages/editarTurma/editarTurma"
import VerTurma from "./pages/verTurma/verTurma"
import CadastroTemp from "./pages/cadastrotemp/cadastroTemp"
import Aluno from "./pages/aluno/aluno"
import Suporte from "./pages/suporte/suporte"
import Conexoes from "./pages/gerenciarConexoes/conexoes"


function App() {
  const token = localStorage.getItem("token");
  return (
    <div>
      <BrowserRouter>
        {token ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/gerenciarDocentes" element={<GerenciarDocentes />} />
          <Route path="/adicionarDocente" element={<AdicionarDocente />} />
          <Route path="/removerDocente" element={<RemoverDocente />} />
          <Route path="/editarTurma" element={<EditarTurma />} />
          <Route path="/verTurma/:id_class" element={<VerTurma />} />
          <Route path="/aluno/:id_student" element={<Aluno />} />
          <Route path="/suporte" element={<Suporte />} />
          <Route path="/conexoes" element={<Conexoes />} />
          <Route path="*" element={<Page404 />} />

        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastrotemp" element={<CadastroTemp />} />
          <Route path="/suporte" element={<Suporte />} />
          <Route path="*" element={<Login />} />
        </Routes>
      )}
      </BrowserRouter>
    </div>
  )
}

export default App
