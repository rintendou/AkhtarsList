import express from "express"

// auth controller
import {
  registerUser,
  loginUser,
  forgotPassword,
} from "../controllers/authController"

const AuthRoute = express.Router()

// REGISTRATION
AuthRoute.post("/register", registerUser)

// LOGIN
AuthRoute.post("/login", loginUser)

// FORGOT PASSWORD
AuthRoute.post("/forgot-password", forgotPassword)

export default AuthRoute
