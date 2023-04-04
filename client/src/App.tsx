import { Routes, Route } from "react-router-dom"

// Routes
import Application from "./components/routes/application/Application"
import Dev from "./components/routes/dev/Dev"
import LandingPage from "./components/routes/landing-page/LandingPage"
import PageNotFound from "./components/routes/page-not-found/PageNotFound"
import Login from "./components/routes/login/Login"
import Register from "./components/routes/register/Register"
import Profile from "./components/routes/protected/profile/Profile"
import ForgotPassword from "./components/routes/forgot-password/ForgotPassword"
import Deposit from "./components/routes/protected/profile/deposit/Deposit"
import Withdraw from "./components/routes/protected/profile/withdraw/Withdraw"
import ChangePassword from "./components/routes/forgot-password/ResetPassword"
import Category from "./components/routes/categories/Category"
import Sell from "./components/routes/protected/profile/sell/Sell"

// Components
import Body from "./components/layout/body/Body"
import Footer from "./components/layout/footer/Footer"
import Header from "./components/layout/header/Header"

// Navguard
import RequireAuth from "./components/routes/protected/RequireAuth"

// Layouts
import ProfileLayout from "./components/routes/protected/ProfileLayout"

function App() {
  return (
    <div className="bg-primary text-black">
      <Header />
      <Body>
        <Routes>
          {/*  Unprotected Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ChangePassword />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/dev" element={<Dev />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/app" element={<Application />} />

            <Route element={<ProfileLayout />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/sell" element={<Sell />} />
            </Route>
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
