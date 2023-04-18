export default interface JWTRequest extends Request {
  user: { username: string; id: string }
}
