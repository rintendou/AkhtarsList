import { Request } from "express"

export default interface JWTRequest extends Request {
  user: { _idFromToken: string }
}
