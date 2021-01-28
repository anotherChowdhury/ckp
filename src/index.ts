import 'reflect-metadata'
import { Connection, createConnection, getRepository } from 'typeorm'
import { typeOrmConfig } from './ormconfig'
import { Category } from './entity/category.entity'
import { Food } from './entity/food.entity'
import { Store } from './entity/store.entity'
import { User } from './entity/user.entity'
import Order from './entity/order.entity'
import OrderDetails from './entity/orderDetails.entity'

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

  const subCat1 = new Category()
  subCat1.name = 'Sub Category 1'
  subCat1.store = store
  subCat1.parent = mainCat

  const subCat2 = new Category()
  subCat2.name = 'Sub Category 2'
  subCat2.store = store
  subCat2.parent = mainCat

  const food = new Food()
  food.name = 'test food 1'
  food.description = 'test food description'
  food.category = subCat1
  food.price = 133.0

  const food2 = new Food()
  food2.name = 'test food 2'
  food2.description = 'test food 2 description'
  food2.category = subCat2
  food2.price = 150

  const order = new Order()
  order.name = 'Test User'
  order.phone = 'Test Phone Number'
  order.address = 'Test Address'

  const orderedfood1 = new OrderDetails()
  orderedfood1.quantity = 2
  orderedfood1.order = order
  orderedfood1.food = food

  const orderedfood2 = new OrderDetails()
  orderedfood2.quantity = 1
  orderedfood2.order = order
  orderedfood2.food = food2

  try {
    const response = await conn.manager.save(user)
    console.log(response)
  } catch (err) {
    console.log('Error occured in user creation')
    //  console.log(err)
    console.log('-----------------------------------')
  }

  try {
    const response = await conn.manager.save(store)
    console.log(response)
  } catch (err) {
    console.log('Error occured in store creation')
    //  console.log(err)
    console.log('-----------------------------------')
  }

  try {
    const response = await conn.manager.save(mainCat)
    console.log(response)
  } catch (err) {
    console.log('Error occured in main category creation')
    //  console.log(err)
    console.log('-----------------------------------')
  }
  try {
    const response = await conn.manager.save(subCat1)
    console.log(response)
  } catch (err) {
    console.log('Error occured in sub category creation')
    //  console.log(err)
    console.log('-----------------------------------')
  }

  try {
    const response = await conn.manager.save(subCat2)
    console.log(response)
  } catch (err) {
    console.log('Error occured in sub category 2 creation')
    console.log(err)
    console.log('-----------------------------------')
  }
  try {
    const response = await conn.manager.save(food)
    console.log(response)
    console.log('hello')
  } catch (err) {
    console.log('Error occured in food creation')
    //  console.log(err)
    console.log('-----------------------------------')
  }

  try {
    const response = await conn.manager.save(food2)
    console.log(response)
  } catch (err) {
    console.log('Error occured in food2 creation')
    console.log(err)
    console.log('-----------------------------------')
  }

  try {
    const orderResponse = await conn.manager.save(order)
    console.log(orderResponse)
  } catch (err) {
    console.log('Error occured in order creation')
    console.log(err)
    console.log('-----------------------------------')
  }

  try {
    const orderResponse = await conn.manager.save(orderedfood1)
    console.log(orderResponse)
  } catch (err) {
    console.log('Error occured in order details creation')
    console.log(err)
    console.log('-----------------------------------')
  }
  try {
    const orderResponse = await conn.manager.save(orderedfood2)
    console.log(orderResponse)
  } catch (err) {
    console.log('Error occured in order details creation')
    console.log(err)
    console.log('-----------------------------------')
  }
}

const getData = async (conn: Connection) => {
  // const store = await conn.manager.findOne(Store, { id: 1 }, { relations: ['categories'] })

  // console.log(store)

  // const cat = await conn.manager.findOne(Category, { id: 2 }, { relations: ['parent', 'foods'] })

  // console.log(cat)

  // const food = await conn.manager.findOne(Food, { id: 1 }, { relations: ['category'] })
  // console.log(food)

  const order = await conn.manager.update(Order, { id: 13 }, { name: 'Umar' })
  console.log(order)

  // type item = {
  //   food: string
  //   price: number
  //   quantity: number
  // }

  // type orderStructure = {
  //   id: number
  //   name: string
  //   phone: string
  //   address: string
  //   items: item[]
  //   total: number
  // }

  // const allOrdersOfAStore = await conn
  //   .getRepository(Order)
  //   .createQueryBuilder('order')
  //   .leftJoinAndSelect('order.details', 'orderDetails')
  //   .leftJoinAndSelect('orderDetails.food', 'food')
  //   .leftJoinAndSelect('food.category', 'category')
  //   .leftJoinAndSelect('category.store', 'store')
  //   .select([
  //     'order.id AS id',
  //     'order.name AS name',
  //     'order.phone AS phone',
  //     'order.address AS address',
  //     'food.name AS food',
  //     'food.price AS price',
  //     'orderDetails.quantity AS quantity',
  //     'price * quantity AS total'
  //   ])
  //   .where('store.id = :id', { id: 1 })
  //   .execute()

  // const order: orderStructure[] = []
  // const { id, name, address, phone } = allOrdersOfAStore[0]
  // let details: orderStructure = { id: id, name: name, phone: phone, address: address, items: [], total: 0 }
  // allOrdersOfAStore.forEach((element: { [key: string]: any }) => {
  //   if (details.id !== element.id) {
  //     order.push(details)
  //     const { id, name, address, phone } = element
  //     details = { id, name, address, phone, items: [], total: 0 }
  //   }
  //   const { food, price, quantity, total } = element
  //   const item: item = { food, price, quantity }
  //   details.items.push(item)
  //   details.total += total
  // })

  // order.push(details)

  // console.log(order)

  // const allOrdersOfAStoreUsingRepository = await getRepository(Order).find({
  //   relations: ['details', 'details.food', 'details.food.category', 'details.food.category.store'],
  //   where: { details: { food: { category: { store: { id: 1 } } } } }
  // })
  // console.log(allOrdersOfAStoreUsingRepository[0].details[0])
}

const dropAll = async (conn: Connection) => {
  await conn.dropDatabase()
  console.log('dropped')
}

;(async () => {
  try {
    const conn = await createConnection({
      ...typeOrmConfig,
      entities: [User, Store, Category, Food, Order, OrderDetails]
    })
    console.log('Conntected')

    // await dropAll(conn)

    // await seed(conn)
    await getData(conn)
    await conn.close()

    console.log('Conection closed')
  } catch (err) {
    console.log(err)
  }
})()
