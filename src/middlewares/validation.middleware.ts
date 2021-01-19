import { plainToClass } from 'class-transformer'
import { validateOrReject, ValidationError } from 'class-validator'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import HttpException from '../exceptions/HttpException'

function validationMiddleware<T>(type: any, skipMissingProperties: boolean = false): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validateOrReject(plainToClass(type, req.body), { skipMissingProperties })
      next()
    } catch (errors) {
      console.log(errors)
      const message = errors.map((error: ValidationError | any) => Object.values(error.constraints)).join(', ')
      next(new HttpException(400, message))
    }
  }
}

export default validationMiddleware
