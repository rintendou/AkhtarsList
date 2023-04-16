import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

interface RequestWithToken extends Request {
  user: any
}

const verifyToken = async (
  req: RequestWithToken,
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
    const decoded = jwt.verify(token, JWT_KEY!)

    req.user = decoded
    next()
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err, data: null, ok: false })
  }
}

export default verifyToken
