import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Weather from './Componenets/Weather.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Weather />
  </StrictMode>,
)
