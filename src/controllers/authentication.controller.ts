import bcrypt from 'bcrypt'
import { Router, Request, Response, NextFunction, response } from 'express'
import LoginDTO from '../data transfer objects(dto)/login.dto'
import CreateUserDto from '../data transfer objects(dto)/user.dto'
import Controller from '../interfaces/controller.interface'
import { TokenData } from '../interfaces/token.interface'
import authMiddleware from '../middlewares/auth.middleware'
import validationMiddleware from '../middlewares/validation.middleware'
import AuthenticationService from '../services/authentication.service'

class AuthenticationController implements Controller {
  public path = '/auth'
  public router = Router()
  private authenticationService = new AuthenticationService()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registration)
      .post(`${this.path}/login`, validationMiddleware(LoginDTO), this.login)
  }

  private registration = async (request: Request, response: Response, next: NextFunction) => {
    const userData: CreateUserDto = request.body
    try {
      const user = await this.authenticationService.register(userData)
      response.status(201).json({ message: 'Successfully Registered' })
    } catch (error) {
      next(error)
    }
  }

  private login = async (request: Request, response: Response, next: NextFunction) => {
    const loginData: LoginDTO = request.body
    try {
      const token = await this.authenticationService.login(loginData)
      response.status(200).json({ token })
    } catch (error) {
      next(error)
    }
  }
}

export default AuthenticationController
