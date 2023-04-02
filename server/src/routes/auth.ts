import express from "express"

// auth controller
import {
  registerUser,
  loginUser,
  getSecurityQuestion,
} from "../controllers/authController"

const AuthRoute = express.Router()

// REGISTRATION
AuthRoute.post("/register", registerUser)

// LOGIN
AuthRoute.post("/login", loginUser)

// FORGOT PASSWORD
AuthRoute.post("/get-security-question", getSecurityQuestion)

export default AuthRoute
