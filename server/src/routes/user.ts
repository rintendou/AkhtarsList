import express from "express"

// auth controller
import {
  getUser,
  depositFunds,
  withdrawFunds,
} from "../controllers/userController"

// middlewares
import verifyToken from "../middlewares/verifyToken"

const UserRoute = express.Router()

// GET USER
UserRoute.get("/:userId", verifyToken, getUser)

// DEPOSIT FUNDS
UserRoute.post("/deposit", depositFunds)

// WITHDRAW FUNDS
UserRoute.post("/withdraw", withdrawFunds)

export default UserRoute
