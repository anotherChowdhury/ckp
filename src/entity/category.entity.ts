import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { Food } from './food.entity'
import { Store } from './store.entity'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne((type) => Store, (store: Store) => store.categories)
  store: Store

  @OneToOne((type) => Category, (category: Category) => category.id)
  @JoinColumn()
  parent: Category

  @OneToMany((type) => Food, (food: Food) => food.category)
  foods: Food[]
}