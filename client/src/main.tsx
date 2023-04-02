import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { BrowserRouter as Router } from "react-router-dom"

// Global State
import AuthContextProvider from "./lib/store/AuthContext"
import ProfileContextProvider from "./lib/store/ProfileContext"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <ProfileContextProvider>
          <App />
        </ProfileContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
)
