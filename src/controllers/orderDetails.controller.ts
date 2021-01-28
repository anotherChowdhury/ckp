import { Router, Response, NextFunction } from 'express'
import OrderDetailsDTO from '../data transfer objects(dto)/orderDetails.dto'
import HttpException from '../exceptions/HttpException'
import Controller from '../interfaces/controller.interface'
import { RequestWithUser } from '../interfaces/token.interface'
import authMiddleware from '../middlewares/auth.middleware'
import validationMiddleware from '../middlewares/validation.middleware'
import FoodService from '../services/food.service'
import OrderService from '../services/order.service'
import OrderDetailsService from '../services/orderDetail.service'

class OrderDetailsController implements Controller {
  public path = '/item'
  public router = Router()
  private itemService = new OrderDetailsService()
  private orderService = new OrderService()
  private foodService = new FoodService()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .all(`${this.path}/*`, authMiddleware)
      .get(`${this.path}/:id`, this.getOne)
      .put(`${this.path}/:id`, validationMiddleware(OrderDetailsDTO, true), this.edit)
      .delete(`${this.path}/:id`, this.delete)

    this.router.post(this.path, authMiddleware, validationMiddleware(OrderDetailsDTO), this.create)
  }

  private create = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    console.log('hello')

    try {
      const data: OrderDetailsDTO = request.body
      const order = await this.orderService.getOne({ id: data.orderId })
      if (!order) throw new HttpException(404, 'Order NOT FOUND')
      const food = await this.foodService.getOne({ id: data.foodId })
      if (!food) throw new HttpException(404, 'Food NOT FOUND')
      data.order = order
      data.food = food
      const item = await this.itemService.add(data)
      response.status(201).send(item)
    } catch (err) {
      next(err)
    }
  }

  private getOne = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const detail = await this.itemService.getOne({ id: request.params.id })
      if (!detail) throw new HttpException(404, 'Not Found')
      response.status(200).send(detail)
    } catch (err) {
      next(err)
    }
  }

  private edit = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params
      const { quantity } = request.body
      const updated = await this.itemService.edit(id, { quantity })
      if (!updated.affected) throw new HttpException(404, 'Item Not found')
      response.status(200).send()
    } catch (err) {
      next(err)
    }
  }

  private delete = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params
      const deleted = await this.itemService.delete(id)
      if (!deleted) throw new HttpException(404, 'Item Not found')
      console.log(deleted)

      response.status(200).send()
    } catch (err) {
      next(err)
    }
  }
}

export default OrderDetailsController
