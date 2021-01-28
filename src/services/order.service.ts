import { getConnection, getRepository } from 'typeorm'
import OrderDTO from '../data transfer objects(dto)/order.dto'
import Order from '../entity/order.entity'
import OrderDetails from '../entity/orderDetails.entity'
import HttpException from '../exceptions/HttpException'
import { allOrderServiceStructure } from '../interfaces/order.types'

class OrderService {
  private orderRepository = getRepository(Order)
  private orderDetailsRepository = getRepository(OrderDetails)

  public async add(orderData: OrderDTO) {
    const { name, phone, details, address } = orderData
    const order = await this.orderRepository.save({ name, phone, address })
    details.forEach((item) => (item.order = order))

    const items = await this.orderDetailsRepository.save(details)
    order.details = items

    return order
  }

  public async getOne(conditions: { [key: string]: any }) {
    return this.orderRepository.findOne(conditions, {
      relations: ['details', 'details.food']
    })
  }

  public async getAll(id: number): Promise<allOrderServiceStructure[] | []> {
    const query = getConnection()
      .getRepository(Order)
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.details', 'orderDetails')
      .leftJoinAndSelect('orderDetails.food', 'food')
      .leftJoinAndSelect('food.category', 'category')
      .leftJoinAndSelect('category.store', 'store')
      .select([
        'order.id AS orderId',
        'order.name AS customerName',
        'order.phone AS customerPhone',
        'order.address AS customerAddress',
        'orderDetails.id as itemId',
        'food.name AS foodName',
        'food.price AS price',
        'orderDetails.quantity AS quantity',
        'price * quantity AS total'
      ])
      .where('store.id = :id', { id: id })
      .where('orderDetails.deletedAt IS NULL')
    console.log(query)

    return await query.execute()
  }

  public async edit(id: number | string, orderData: { name?: string; address?: string }) {
    return await this.orderRepository.update(id, orderData)
  }

  public async delete(id: number | string) {
    const order = await this.orderRepository.findOne({ id: Number(id) }, { relations: ['details'] })
    if (!order) throw new HttpException(404, 'Order Not Found')
    return await this.orderRepository.softRemove(order!)
  }
}

export default OrderService
