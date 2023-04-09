import express from "express"

// auth controller
import {
  registerUser,
  loginUser,
  getSecurityQuestion,
  verifySecurityQA,
  resetPassword,
  changeUserDetails,
  changePassword,
  changeSecurityQA,
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

// RESET PASSWORD
AuthRoute.post("/reset-password", resetPassword)

// CHANGE USER DETAILS
AuthRoute.post("/change/user-details", changeUserDetails)

// CHANGE PASSWORD
AuthRoute.post("/change/password", resetPassword)

// CHANGE SECURITY QA
AuthRoute.post("/change/security-qa", resetPassword)

export default AuthRoute
