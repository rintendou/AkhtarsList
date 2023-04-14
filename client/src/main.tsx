import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { BrowserRouter as Router } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Global State
import AuthContextProvider from "./lib/store/AuthContext"
import ProfileContextProvider from "./lib/store/ProfileContext"
import TimelineContextProvider from "./lib/store/TimelineContext"

// Query Library
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <TimelineContextProvider>
        <AuthContextProvider>
          <ProfileContextProvider>
            <App />
          </ProfileContextProvider>
        </AuthContextProvider>
      </TimelineContextProvider>
    </QueryClientProvider>
  </Router>
)
