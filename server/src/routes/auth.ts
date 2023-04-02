import express from "express"

// auth controller
import { registerUser, loginUser } from "../controllers/authController"

const AuthRoute = express.Router()

// REGISTRATION
AuthRoute.post("/register", registerUser)

// LOGIN
AuthRoute.post("/login", loginUser)

export default AuthRoute
