import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Food } from './Food'
import { Store } from './Store'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne((type) => Store, (store: Store) => store.id)
  store: Store

  @OneToOne((type) => Category, (category: Category) => category.id)
  parent: Category | null

  @ManyToOne((type) => Food, (food: Food) => food.id)
  foods: Food[]
}
