import { getRepository } from 'typeorm'
import CreateStoreDTO from '../data transfer objects(dto)/store.dto'
import { Store } from '../entity/store.entity'
import { User } from '../entity/user.entity'
import HttpException from '../exceptions/HttpException'

class StoreService {
  private storeRepository = getRepository(Store)

  public async add(storeData: CreateStoreDTO, user: User) {
    const newStore = this.storeRepository.create({ ...storeData, owner: user })
    await this.storeRepository.save(newStore)
    newStore.owner.password = 'undefined'
    return newStore
  }

  // public async getStorebyUser(user: User) {
  //   return await this.storeRepository.findOne({ owner: user })
  // }

  public async getStore(conditions: { [key: string]: any }) {
    return this.storeRepository.findOne(conditions, {
      relations: ['categories', 'categories.parent', 'categories.foods']
    })
  }

  public async edit(id: number | string, storeData: CreateStoreDTO) {
    return await this.storeRepository.update(id, storeData)
  }

  public async delete(id: number | string) {
    const deleteResponse = await this.storeRepository.delete(id)
    console.log(deleteResponse)
    if (!deleteResponse.affected) throw new HttpException(400, 'Store Not Found')
  }
}

export default StoreService
