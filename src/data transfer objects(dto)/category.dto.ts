import { IsArray, IsDefined, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { Store } from '../entity/store.entity'
import { Category } from '../entity/category.entity'
import { Food } from '../entity/food.entity'

class CategoryDTO {
  @IsString()
  name: string

  @IsInt()
  store: number

  @IsOptional()
  @IsInt()
  parent?: number

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Food || Number)
  foods?: Food[] | number[]
}

export default CategoryDTO
