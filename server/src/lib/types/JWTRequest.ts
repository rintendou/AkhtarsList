import { Request } from "express"

export default interface JWTRequest extends Request {
  user: { username: string; _id: string }
}
