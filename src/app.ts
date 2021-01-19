import express, { Request, Response, json, NextFunction, Application } from 'express'
import Controller from './interfaces/controller.interface'
import errorMiddleware from './middlewares/errorHandler.middleware'

class App {
  public app: Application
  public port: number

  constructor(controllers: Controller[], port: number) {
    this.app = express()
    this.port = port
    this.initializeMiddlewares()
    this.initializeControllers(controllers)
    this.initilizeErrorHandling()
  }

  private initializeMiddlewares() {
    this.app.use(json())
    // this.app.use(this.addCORS)
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
  }

  private addCORS(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Authorization, Content-Type')
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT')
      next()
    })
  }

  private initilizeErrorHandling() {
    this.app.use(errorMiddleware)
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`)
    })
  }
}

export default App
