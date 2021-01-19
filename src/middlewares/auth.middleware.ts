import { NextFunction, Request, Response } from 'express'
import HttpException from '../exceptions/HttpException'
import jwt from 'jsonwebtoken'
import { DataStoredInToken, RequestWithUser } from '../interfaces/token.interface'
import { getRepository } from 'typeorm'
import { User } from '../entity/user.entity'
async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const token = request.headers.authorization
  if (!token) next(new HttpException(400, 'Token Required'))

  try {
    const secret = process.env.JWT_SECRET || 'topSecret'
    let { id } = jwt.verify(token!, secret) as DataStoredInToken
    id = Number(id)
    const user = await getRepository(User).findOne({ id: id, isActive: true }, { relations: ['stores'] })
    if (!user) next(new HttpException(400, 'Invalid Token'))
    request.user = user!
    next()
  } catch (err) {
    console.log(err)
    next(new HttpException(400, 'Invalid Token'))
  }
}

export default authMiddleware
