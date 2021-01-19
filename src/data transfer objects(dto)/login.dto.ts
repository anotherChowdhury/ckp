import { IsString, IsEmail } from 'class-validator'

class LoginDTO {
  @IsEmail()
  email: string

  @IsString()
  password: string
}

export default LoginDTO
