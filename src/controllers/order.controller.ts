import { NextFunction, Router, Request, Response } from 'express'
import OrderDTO from '../data transfer objects(dto)/order.dto'
import { Food } from '../entity/food.entity'
import HttpException from '../exceptions/HttpException'
import Controller from '../interfaces/controller.interface'
import { responseStructure, allOrderServiceStructure, item } from '../interfaces/order.types'
import { RequestWithUser } from '../interfaces/token.interface'
import authMiddleware from '../middlewares/auth.middleware'
import validationMiddleware from '../middlewares/validation.middleware'
import FoodService from '../services/food.service'
import OrderService from '../services/order.service'

class OrderController implements Controller {
  public path = '/order'
  public router = Router()
  public foodService = new FoodService()
  public orderService = new OrderService()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .post(`${this.path}/`, validationMiddleware(OrderDTO), this.create)
      .get(`/:storeId${this.path}s/`, authMiddleware, this.getAll)
      .all(`${this.path}/*`, authMiddleware)
      .get(`${this.path}/:id`, this.getOne)
      .put(`${this.path}/:id`, validationMiddleware(OrderDTO, false), this.edit)
      .delete(`${this.path}/:id`, this.delete)
  }

  private create = async (request: Request, respone: Response, next: NextFunction) => {
    try {
      const orderData: OrderDTO = request.body
      console.log(orderData)
      const { details } = orderData

      for (const item of details) {
        const food: Food | undefined = await this.foodService.getOne({ id: item.foodId })
        if (!food) details.filter((detail) => detail.foodId !== item.foodId)
        else item.food = food
      }
      const order = await this.orderService.add({ ...orderData, details: details })
      const restructure: { food: string; price: number; quantity: number; itemId: number }[] = []
      let total = 0
      order.details.forEach((item) => {
        restructure.push({ food: item.food.name, price: item.food.price, quantity: item.quantity, itemId: item.id })
        total += item.food.price * item.quantity
      })
      console.log(restructure)

      respone.status(201).json({ ...order, details: restructure, total })
    } catch (err) {
      console.log(err)
    }
  }

  private getOne = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params
      const order = await this.orderService.getOne({ id })
      console.log(order)
      response.status(200).send(order)
    } catch (err) {
      next(err)
    }
  }

  private getAll = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const { storeId } = request.params
      const orders = await this.orderService.getAll(Number(storeId))
      if (!orders.length) throw new HttpException(404, 'No Orders Found')
      console.log(orders)

      const order: responseStructure[] = []
      const {
        orderid: orderId,
        customername: customerName,
        customeraddress: customerAddress,
        customerphone: customerPhone
      } = orders[0]
      let details: responseStructure = { orderId, customerName, customerAddress, customerPhone, items: [], total: 0 }
      orders.forEach((element: allOrderServiceStructure) => {
        if (details.orderId !== element.orderid) {
          order.push(details)
          const {
            orderid: orderId,
            customername: customerName,
            customeraddress: customerAddress,
            customerphone: customerPhone
          } = element
          details = { orderId, customerName, customerAddress, customerPhone, items: [], total: 0 }
        }
        const { foodname: foodName, price, quantity, total, itemid: itemId } = element
        const item: item = { foodName, price, quantity, itemId }
        details.items.push(item)
        details.total += total
      })
      console.log(details)
      order.push(details)
      response.status(200).send(order)
    } catch (err) {
      next(err)
    }
  }

  private edit = async (request: RequestWithUser, respone: Response, next: NextFunction) => {
    try {
      const data = request.body
      const { id } = request.params
      const updated = await this.orderService.edit(id, data)
      if (!updated.affected) throw new HttpException(404, 'Order Not Found')
      respone.status(200).send()
    } catch (err) {
      next(err)
    }
  }

  private delete = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params
      const res = await this.orderService.delete(id)
      if (!res) throw new HttpException(404, 'NOT FOUND')
      response.status(200).send()
    } catch (err) {
      next(err)
    }
  }
}

export default OrderController
