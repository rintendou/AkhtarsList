import { NextFunction, Response } from "express"
import jwt from "jsonwebtoken"

import DecodedJWT from "../lib/types/DecodedJWT"
import JWTRequest from "../lib/types/JWTRequest"

const verifyToken = async (
  req: JWTRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Missing token", ok: false })
  }

  try {
    const JWT_KEY = process.env.JWT_KEY
    const decoded = jwt.verify(token, JWT_KEY!) as DecodedJWT

    req.user = decoded
    next()
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err, data: null, ok: false })
  }
}

export default verifyToken
