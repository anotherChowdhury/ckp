import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'
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

  @ManyToOne((type) => Category, (category: Category) => category.id, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn()
  parent: Category

  @OneToMany((type) => Food, (food: Food) => food.category)
  foods: Food[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date
}
