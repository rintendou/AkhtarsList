import express from "express"

// auth controller
import {
  registerUser,
  loginUser,
  getSecurityQuestion,
  verifySecurityQA,
  resetPassword,
} from "../controllers/authController"

const AuthRoute = express.Router()

// REGISTRATION
AuthRoute.post("/register", registerUser)

// LOGIN
AuthRoute.post("/login", loginUser)

// GET SECURITY QUESTION
AuthRoute.post("/get-security-question", getSecurityQuestion)

// VERIFY SECURITY QA
AuthRoute.post("/verify-security-qa", verifySecurityQA)

// CHANGE PASSWORD
AuthRoute.post("/reset-password", resetPassword)

export default AuthRoute
