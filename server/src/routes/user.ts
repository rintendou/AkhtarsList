import express from "express"

// auth controller
import { getUser } from "../controllers/userController"

const UserRoute = express.Router()

// REGISTRATION
UserRoute.get("/:userId", getUser)

export default UserRoute
