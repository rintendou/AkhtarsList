import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { BrowserRouter as Router } from "react-router-dom"

// Global State
import AuthContextProvider from "./lib/store/AuthContext"
import ProfileContextProvider from "./lib/store/ProfileContext"
import TimelineContextProvider from "./lib/store/TimelineContext"
import ListingDetailContextProvider from "./lib/store/ListingDetailContext"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <TimelineContextProvider>
        <AuthContextProvider>
          <ProfileContextProvider>
            <ListingDetailContextProvider>
              <App />
            </ListingDetailContextProvider>
          </ProfileContextProvider>
        </AuthContextProvider>
      </TimelineContextProvider>
    </Router>
  </React.StrictMode>
)
