import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const theme = localStorage.getItem('theme');
if (theme) {
  document.documentElement.classList.add(theme);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>
)
