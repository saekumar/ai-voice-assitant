import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContext from './context/UserContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <UserContext>
        <App />
      </UserContext>
    </Router>
  </StrictMode>
)
