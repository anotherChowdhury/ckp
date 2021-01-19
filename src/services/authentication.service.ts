import bcrypt from 'bcrypt'
import { Http2ServerResponse } from 'http2'
import jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import LoginDTO from '../data transfer objects(dto)/login.dto'
import CreateUserDto from '../data transfer objects(dto)/user.dto'
import { User } from '../entity/user.entity'
import HttpException from '../exceptions/HttpException'
import { DataStoredInToken, TokenData } from '../interfaces/token.interface'

class AuthenticationService {
  private userRepository = getRepository(User)
  public async register(userData: CreateUserDto) {
    if (await this.userRepository.findOne({ email: userData.email })) throw new HttpException(400, 'Email Exists')
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const user = this.userRepository.create({ ...userData, password: hashedPassword })
    await this.userRepository.save(user)
    return user
  }

  public async login(loginData: LoginDTO): Promise<TokenData | HttpException> {
    const user = await this.userRepository.findOne({ email: loginData.email })
    if (!user) throw new HttpException(404, 'Wrong Credentials')

    const isPasswordMatching = await bcrypt.compare(loginData.password, user.password)

    if (!isPasswordMatching) throw new HttpException(404, 'Wrong Credentials')

    return this.createToken(user)
  }

  private createToken(user: User): TokenData {
    const expiresIn = 60 * 60 * 24 * 30 // a month
    const secret = process.env.JWT_SECRET || 'topSecret'
    const payload: DataStoredInToken = { id: user.id }
    return {
      expiresIn,
      token: jwt.sign(payload, secret, { expiresIn })
    }
  }
}

export default AuthenticationService
