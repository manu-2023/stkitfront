import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './Login/Login.jsx'
import Routing from './Routing.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Firstpage from './firstpage/firstpage.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'react-slideshow-image/dist/styles.css'



createRoot(document.getElementById('root')).render(
      <Routing />
  
)
