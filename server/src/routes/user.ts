import express from "express"

// auth controller
import { getUser } from "../controllers/userController"

const UserRoute = express.Router()

// GET USER
UserRoute.get("/:userId", getUser)

export default UserRoute
