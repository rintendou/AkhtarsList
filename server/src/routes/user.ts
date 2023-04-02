import express from "express"

// auth controller
import {
  getUser,
  depositFunds,
  withdrawFunds,
} from "../controllers/userController"

const UserRoute = express.Router()

// REGISTRATION
UserRoute.get("/:userId", getUser)

// DEPOSIT FUNDS
UserRoute.post("/deposit", depositFunds)

// WITHDRAW FUNDS
UserRoute.post("/withdraw", withdrawFunds)

export default UserRoute
