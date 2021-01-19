import { NextFunction, Response, Router } from 'express'
import CreateStoreDTO from '../data transfer objects(dto)/store.dto'
import HttpException from '../exceptions/HttpException'
import Controller from '../interfaces/controller.interface'
import { RequestWithUser } from '../interfaces/token.interface'
import authMiddleware from '../middlewares/auth.middleware'
import validationMiddleware from '../middlewares/validation.middleware'
import StoreService from '../services/store.service'

class StoreController implements Controller {
  public path = '/store'
  public router = Router()
  private storeService = new StoreService()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .get(`${this.path}/:id`, this.getStore)
      .all(`${this.path}/*`, authMiddleware)
      .put(`${this.path}/:id`, validationMiddleware(CreateStoreDTO, true), this.edit)
      .delete(`${this.path}/:id`, this.delete)
      .post(`${this.path}`, authMiddleware, validationMiddleware(CreateStoreDTO), this.create)
  }

  private create = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    console.log('Hello from create in Store Controller')

    const storeData: CreateStoreDTO = request.body
    try {
      const store = await this.storeService.add(storeData, request.user!)
      response.status(201).json({ store })
    } catch (error) {
      next(error)
    }
  }

  private edit = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params
      const editedStoreData: CreateStoreDTO = request.body
      const allowed = request.user!.stores.find((store) => store.id === Number(id))
      if (!allowed) throw new HttpException(403, 'Not Allowed')
      await this.storeService.edit(id, editedStoreData)
      const updatedPost = await this.storeService.getStore({ id: id })
      if (!updatedPost) throw new HttpException(404, 'Not Found')
    } catch (error) {
      next(error)
    }
  }

  private delete = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params
      const allowed = request.user!.stores.find((store) => store.id === Number(id))
      if (!allowed) throw new HttpException(403, 'Not Allowed')
      await this.storeService.delete(id)
    } catch (error) {
      next(error)
    }
  }

  private getStore = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const store = await this.storeService.getStore({ id: request.params.id })
      if (!store) throw new HttpException(404, 'Store not found')
      response.status(200).send(store)
    } catch (error) {
      next(error)
    }
  }
}

export default StoreController
