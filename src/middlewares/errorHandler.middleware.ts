import { Request, Response, NextFunction } from 'express'
import HttpException from '../exceptions/HttpException'

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const status: number = error.status || 500
  const message: string = error.message || 'Something went wrong'
  response.status(status).send({ message })
  console.log(error)
}

export default errorMiddleware
