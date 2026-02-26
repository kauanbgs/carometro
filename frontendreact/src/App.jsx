import "./index.css"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from "./pages/login"


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
