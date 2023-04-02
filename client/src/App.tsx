import { Routes, Route } from "react-router-dom"

// Routes
import Application from "./components/routes/protected/application/Application"
import Dev from "./components/routes/dev/Dev"
import LandingPage from "./components/routes/landing-page/LandingPage"
import PageNotFound from "./components/routes/page-not-found/PageNotFound"
import Login from "./components/routes/login/Login"
import Register from "./components/routes/register/Register"
import Profile from "./components/routes/profile/Profile"
import ForgotPassword from "./components/routes/forgot-password/ForgotPassword"
import ChangePassword from "./components/routes/forgot-password/ResetPassword"

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
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ChangePassword />} />
          <Route path="/dev" element={<Dev />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/app" element={<Application />} />
            <Route path="/profile" element={<Profile />} />
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
