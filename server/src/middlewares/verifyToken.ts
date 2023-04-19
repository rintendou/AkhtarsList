import { NextFunction, Response } from "express"
import jwt from "jsonwebtoken"

import DecodedJWT from "../lib/types/DecodedJWT"
import JWTRequest from "../lib/types/JWTRequest"

const verifyToken = async (
  req: JWTRequest,
  res: Response,
  next: NextFunction
) => {
  // Verify token attached by the client that is placed on the request headers

  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Missing token", ok: false })
  }

  try {
    const JWT_KEY = process.env.JWT_KEY

    // Verify token using the key
    const decoded = jwt.verify(token, JWT_KEY!) as DecodedJWT

    // Attach token to the request to be sent to other middleware
    req.user = decoded

    // Pass control to the next middleware
    next()
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err, data: null, ok: false })
  }
}

export default verifyToken
