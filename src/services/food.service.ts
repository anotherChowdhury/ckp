import { getRepository } from 'typeorm'
import FoodDTO from '../data transfer objects(dto)/food.dto'
import { Category } from '../entity/category.entity'
import { Food } from '../entity/food.entity'
import HttpException from '../exceptions/HttpException'

class FoodService {
  private categoryRepository = getRepository(Category)
  private foodRepository = getRepository(Food)

  public async add(foodData: FoodDTO) {
    const category: Category | undefined = await this.categoryRepository.findOne({ id: Number(foodData.category) })
    if (!category) throw new HttpException(404, 'Category not found')

    const food = this.foodRepository.create({ ...foodData, category: category })
    await this.foodRepository.save(food)
    return food
  }

  // public async getStorebyUser(user: User) {
  //   return await this.storeRepository.findOne({ owner: user })
  // }

  public async getOne(conditions: { [key: string]: any }) {
    return this.foodRepository.findOne(conditions, {
      relations: ['category']
    })
  }

  public async getAll(conditions: { [key: string]: any }) {
    return this.foodRepository.findOne(conditions, {
      relations: ['category']
    })
  }

  public async edit(id: number | string, foodData: { [key: string]: any }) {
    return await this.foodRepository.update(id, foodData)
  }

  public async delete(id: number | string) {
    const deleteResponse = await this.foodRepository.delete(id)
    console.log(deleteResponse)
    if (!deleteResponse.affected) throw new HttpException(400, 'Category Not Found')
  }
}

export default FoodService
