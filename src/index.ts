import 'reflect-metadata'
import { Connection, createConnection } from 'typeorm'
import { typeOrmConfig } from '../ormconfig'
import { Category } from './entity/Category'
import { Food } from './entity/Food'
import { Store } from './entity/Store'
import { User } from './entity/User'

const seed = async (conn: Connection) => {
  const user = new User()
  user.name = 'Umar'
  user.email = 'umar@email.com'
  user.password = '1234567'

  const store = new Store()
  store.owner = user
  store.name = "Umar's Store"
  store.address = 'Test Address'
  store.description = 'Test Description'

  const mainCat = new Category()
  mainCat.name = 'Main Category'
  mainCat.store = store

  const subCat = new Category()
  subCat.name = 'Sub Category'
  subCat.store = store
  subCat.parent = mainCat

  const food = new Food()
  food.name = 'test food'
  food.description = 'test food description'
  food.category = subCat
  food.price = 133.0

  try {
    await conn.manager.save(user)
  } catch (err) {
    console.log('Error occured in user creation')
    //  console.log(err)
    console.log('-----------------------------------')
  }

  try {
    await conn.manager.save(store)
  } catch (err) {
    console.log('Error occured in store creation')
    //  console.log(err)
    console.log('-----------------------------------')
  }

  try {
    await conn.manager.save(mainCat)
  } catch (err) {
    console.log('Error occured in main category creation')
    //  console.log(err)
    console.log('-----------------------------------')
  }
  try {
    await conn.manager.save(subCat)
  } catch (err) {
    console.log('Error occured in sub category creation')
    //  console.log(err)
    console.log('-----------------------------------')
  }
  try {
    await conn.manager.save(food)
  } catch (err) {
    console.log('Error occured in food creation')
    //  console.log(err)
    console.log('-----------------------------------')
  }
}

const getData = async (conn: Connection) => {
  const store = await conn.manager.findOne(Store, { id: 1 }, { relations: ['categories'] })

  console.log(store)

  const cat = await conn.manager.findOne(Category, { id: 2 }, { relations: ['parent', 'foods'] })

  console.log(cat)

  const food = await conn.manager.findOne(Food, { id: 1 }, { relations: ['category'] })
  console.log(food)
}

const dropAll = async (conn: Connection) => {
  await conn.dropDatabase()
  console.log('dropped')
}

;(async () => {
  try {
    const conn = await createConnection({ ...typeOrmConfig, entities: [User, Store, Category, Food] })
    console.log('Conntected')

    // await seed(conn)
    await getData(conn)
    await conn.close()

    console.log('Conection closed')
  } catch (err) {
    console.log(err)
  }
})()
