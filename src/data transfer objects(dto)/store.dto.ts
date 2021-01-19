import { IsString } from 'class-validator'

class CreateStoreDTO {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsString()
  address: string
}

export default CreateStoreDTO
