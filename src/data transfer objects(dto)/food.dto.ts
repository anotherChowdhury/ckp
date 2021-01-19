import { IsBoolean, IsDecimal, IsInt, IsNumber, IsOptional, IsString, Validate, ValidateNested } from 'class-validator'
import { Category } from '../entity/category.entity'

class FoodDTO {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsNumber()
  price: number

  @IsInt()
  category: number

  @IsOptional()
  @IsBoolean()
  isActive: boolean
}

export default FoodDTO
