import { Routes, Route } from "react-router-dom"

// Routes
import Application from "./components/routes/protected/application/Application"
import Dev from "./components/routes/dev/Dev"
import LandingPage from "./components/routes/landing-page/LandingPage"
import PageNotFound from "./components/routes/page-not-found/PageNotFound"
import Login from "./components/routes/login/Login"
import Register from "./components/routes/register/Register"

// Components
import Body from "./components/layout/body/Body"
import Footer from "./components/layout/footer/Footer"
import Header from "./components/layout/header/Header"
import RequireAuth from "./components/routes/protected/RequireAuth"

function App() {
  return (
    <div className="bg-primary text-secondary">
      <Header />
      <Body>
        <Routes>
          {/*  Unprotected Routes */}
          <Route path="/home" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dev" element={<Dev />} />

          {/* Protected Routes */}

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Application />} />
          </Route>

          {/* Catch-All Route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Body>
      <Footer />
    </div>
  )
}

export default App
