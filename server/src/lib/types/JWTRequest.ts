interface CustomHeaders extends Headers {
  authorization?: string
}

export default interface JWTRequest extends Request {
  headers: CustomHeaders
  user: any
}
