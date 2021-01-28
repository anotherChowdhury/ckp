import { getRepository } from 'typeorm'
import OrderDetailsDTO from '../data transfer objects(dto)/orderDetails.dto'
import OrderDetails from '../entity/orderDetails.entity'
import HttpException from '../exceptions/HttpException'

class OrderDetailsService {
  private orderDetailsRepository = getRepository(OrderDetails)

  public async add(item: OrderDetailsDTO) {
    console.log('hell0 2')
    console.log(item)

    const added = await this.orderDetailsRepository.save(item)
    return added
  }

  public async getOne(conditions: { [key: string]: any }) {
    return this.orderDetailsRepository.findOne(conditions, {
      relations: ['food']
    })
  }

  public async edit(id: number | string, data: { quantity: number }) {
    return await this.orderDetailsRepository.update(id, data)
  }

  public async delete(id: number | string) {
    const item = await this.orderDetailsRepository.findOne(id, { relations: ['order', 'food'] })
    return await this.orderDetailsRepository.softRemove(item!)
  }
}

export default OrderDetailsService
