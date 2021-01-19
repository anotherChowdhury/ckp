import { NextFunction, Router, Response, Request } from 'express'
import CategoryDTO from '../data transfer objects(dto)/category.dto'
import HttpException from '../exceptions/HttpException'
import Controller from '../interfaces/controller.interface'
import { RequestWithUser } from '../interfaces/token.interface'
import authMiddleware from '../middlewares/auth.middleware'
import validationMiddleware from '../middlewares/validation.middleware'
import CategoryService from '../services/category.service'

class CategoryController implements Controller {
  public path = '/category'
  public router = Router()
  private categoryService = new CategoryService()

  constructor() {
    this.inializeRoutes()
  }

  private inializeRoutes() {
    this.router
      .get(`${this.path}/:id`, this.get)
      .all(`${this.path}/*`, authMiddleware)
      .post(this.path, validationMiddleware(CategoryDTO), this.create)
      .put(`${this.path}/:id`, validationMiddleware(CategoryDTO, true), this.edit)
      .delete(`${this.path}/:id`, this.delete)
  }

  private create = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const categoryData: CategoryDTO = request.body
      const newCategory = await this.categoryService.add(categoryData)
      response.status(201).json(newCategory)
    } catch (err) {
      next(err)
    }
  }

  private delete = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params
      await this.categoryService.delete(id)
      response.status(200).json({ message: 'Successfully deleted' })
    } catch (err) {
      next(err)
    }
  }

  private edit = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params
      const categoryData: CategoryDTO = request.body
      await this.categoryService.edit(id, categoryData)
      response.status(200).json({ message: 'Successfully Updated' })
    } catch (err) {
      next(err)
    }
  }

  private get = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params
      const category = await this.categoryService.getOne({ id })
      if (!category) throw new HttpException(404, 'Category not found')
      response.status(200).json(category)
    } catch (err) {
      next(err)
    }
  }
}

export default CategoryController
