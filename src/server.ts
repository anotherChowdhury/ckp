import { createConnection } from 'typeorm'
import App from './app'
import AuthenticationController from './controllers/authentication.controller'
import CategoryController from './controllers/category.controller'
import FoodController from './controllers/food.controller'
import StoreController from './controllers/store.controller'
import { typeOrmConfig } from './ormconfig'
;(async () => {
  try {
    await createConnection(typeOrmConfig)
  } catch (err) {
    console.log(err)
    return err
  }

  const app = new App(
    [new AuthenticationController(), new StoreController(), new CategoryController(), new FoodController()],
    5000
  )
  app.listen()
})()
