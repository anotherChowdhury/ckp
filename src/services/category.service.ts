import { getRepository } from 'typeorm'
import CategoryDTO from '../data transfer objects(dto)/category.dto'
import CreateStoreDTO from '../data transfer objects(dto)/store.dto'
import { Category } from '../entity/category.entity'
import { Store } from '../entity/store.entity'
import HttpException from '../exceptions/HttpException'

class CategoryService {
  private categoryRepository = getRepository(Category)
  private storeRepository = getRepository(Store)

  public async add(categoryData: { [key: string]: any }) {
    const store = await this.storeRepository.findOne({ id: Number(categoryData.store) })
    if (!store) throw new HttpException(404, 'Store not found')
    if (categoryData.parent) {
      const parent = await this.categoryRepository.findOne({ id: categoryData.parent })
      console.log(parent)
      if (!parent) throw new HttpException(404, 'parent category not found')
      categoryData.parent = parent
    }

    const category = this.categoryRepository.create({ ...categoryData, store: store })
    await this.categoryRepository.save(category)
    console.log(category)

    return category
  }

  // public async getStorebyUser(user: User) {
  //   return await this.storeRepository.findOne({ owner: user })
  // }

  public async getOne(conditions: { [key: string]: any }) {
    return this.categoryRepository.findOne(conditions, {
      relations: ['store', 'parent', 'foods']
    })
  }

  public async getAll(conditions: { [key: string]: any }) {
    return this.categoryRepository.findOne(conditions, {
      relations: ['store', 'parent', 'foods']
    })
  }

  public async edit(id: number | string, categoryData: { [key: string]: any }) {
    return await this.categoryRepository.update(id, categoryData)
  }

  public async delete(id: number | string) {
    const deleteResponse = await this.categoryRepository.delete(id)
    console.log(deleteResponse)
    if (!deleteResponse.affected) throw new HttpException(400, 'Category Not Found')
  }
}

export default CategoryService
