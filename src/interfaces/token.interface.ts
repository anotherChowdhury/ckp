import { Request } from 'express'
import { User } from '../entity/user.entity'

export interface TokenData {
  token: string
  expiresIn: number
}

export interface DataStoredInToken {
  id: string | number
}

export interface RequestWithUser extends Request {
  user?: User
}
