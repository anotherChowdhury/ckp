import { IsDefined, IsInt, IsOptional, ValidateIf } from 'class-validator'
import { Food } from '../entity/food.entity'
import Order from '../entity/order.entity'

class OrderDetailsDTO {
  @IsOptional()
  @IsDefined()
  order: Order

  @IsOptional()
  @IsInt()
  orderId: number

  @IsOptional()
  @IsDefined()
  food: Food

  @IsInt()
  foodId: number

  @IsInt()
  quantity: number
}

export default OrderDetailsDTO
