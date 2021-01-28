import { createConnection } from 'typeorm'
import App from './app'
import AuthenticationController from './controllers/authentication.controller'
import CategoryController from './controllers/category.controller'
import FoodController from './controllers/food.controller'
import OrderController from './controllers/order.controller'
import OrderDetailsController from './controllers/orderDetails.controller'
import StoreController from './controllers/store.controller'
import { typeOrmConfig } from './ormconfig'
;(async () => {
  try {
    await createConnection(typeOrmConfig)
    console.log('Database Conntected')
  } catch (err) {
    console.log(err)
    return err
  }

  const app = new App(
    [
      new AuthenticationController(),
      new StoreController(),
      new CategoryController(),
      new FoodController(),
      new OrderController(),
      new OrderDetailsController()
    ],
    5000
  )
  app.listen()
})()
