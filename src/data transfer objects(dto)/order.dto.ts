import { Type } from 'class-transformer'
import { IsArray, IsString, ValidateNested } from 'class-validator'
import OrderDetailsDTO from './orderDetails.dto'

class OrderDTO {
  @IsString()
  name: string

  @IsString()
  phone: string

  @IsString()
  address: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type((type) => OrderDetailsDTO)
  details: OrderDetailsDTO[]
}

export default OrderDTO
