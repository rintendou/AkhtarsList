import express, { NextFunction, Request, Response } from "express"

// Auth Controller Functions
import {
  getUser,
  getUsers,
  depositFunds,
  withdrawFunds,
  applyForAdmin,
} from "../controllers/userController"

// Types
import JWTRequest from "../lib/types/JWTRequest"
import verifyToken from "../middlewares/verifyToken"

// Router
const UserRoute = express.Router()

// GET USER
UserRoute.get(
  "/:userId",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => getUser(req as JWTRequest, res)
)

// GET USER
UserRoute.get(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => getUsers(req as JWTRequest, res)
)

// DEPOSIT FUNDS
UserRoute.post(
  "/deposit",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => depositFunds(req as JWTRequest, res)
)

// WITHDRAW FUNDS
UserRoute.post(
  "/withdraw",
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req as JWTRequest, res, next),
  (req: Request, res: Response) => withdrawFunds(req as JWTRequest, res)
)

// APPLY FOR ADMIN
UserRoute.post("/apply", applyForAdmin)

export default UserRoute
