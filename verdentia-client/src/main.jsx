import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './UserContext.jsx'
import TreeGrid from './pages/treeGrid.jsx'
import Background from './components/background.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <>
        <Background />
        <App />
      </>
    </UserProvider>
  </React.StrictMode>,
)
