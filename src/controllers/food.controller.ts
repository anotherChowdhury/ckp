import { NextFunction, Router, Response, Request } from 'express'
import FoodDTO from '../data transfer objects(dto)/food.dto'
import HttpException from '../exceptions/HttpException'
import Controller from '../interfaces/controller.interface'
import authMiddleware from '../middlewares/auth.middleware'
import validationMiddleware from '../middlewares/validation.middleware'
import FoodService from '../services/food.service'

class FoodController implements Controller {
  public path = '/food'
  public router = Router()
  private foodService = new FoodService()

  constructor() {
    this.inializeRoutes()
  }

  private inializeRoutes() {
    this.router
      .get(`${this.path}/:id`, this.get)
      .all(`${this.path}/*`, authMiddleware)
      .post(this.path, validationMiddleware(FoodDTO), this.create)
      .put(`${this.path}/:id`, validationMiddleware(FoodDTO, true), this.edit)
      .delete(`${this.path}/:id`, this.delete)
  }

  private create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const foodData: FoodDTO = request.body
      const newFood = await this.foodService.add(foodData)
      response.status(201).json(newFood)
    } catch (err) {
      next(err)
    }
  }

  private delete = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params
      await this.foodService.delete(id)
      response.status(200).json({ message: 'Successfully deleted' })
    } catch (err) {
      next(err)
    }
  }

  private edit = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params
      const foodData: FoodDTO = request.body
      await this.foodService.edit(id, foodData)
      response.status(200).json({ message: 'Successfully Updated' })
    } catch (err) {
      next(err)
    }
  }

  private get = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params
      const food = await this.foodService.getOne({ id })
      if (!food) throw new HttpException(404, 'Category not found')
      response.status(200).json(food)
    } catch (err) {
      next(err)
    }
  }
}

export default FoodController
