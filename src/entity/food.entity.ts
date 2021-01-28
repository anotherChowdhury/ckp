import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'
import { Category } from './category.entity'
import OrderDetails from './orderDetails.entity'

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @Column('text')
  description: string

  @Column({ nullable: false })
  price: number

  @ManyToOne((type) => Category, (category: Category) => category.foods, { onDelete: 'CASCADE' })
  category: Category

  @Column('boolean', { default: true })
  isActive: boolean

  @OneToMany((type) => OrderDetails, (order: OrderDetails) => order.food, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  orders: OrderDetails[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date
}
