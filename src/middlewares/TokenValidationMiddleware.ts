import 'dotenv/config'
import { Request, Response, NextFunction } from 'express'

export default class TokenValidation {
  static async validation(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    if (request.headers.token !== process.env.ACCESS_TOKEN) {
      return response.status(401).json({
        message: 'Invalid Token.',
      })
    }

    return next()
  }
}
