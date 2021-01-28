import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'
import { Food } from './food.entity'
import Order from './order.entity'

@Entity()
class OrderDetails {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne((type) => Order, (order: Order) => order.id, { onDelete: 'CASCADE' })
  order: Order

  @ManyToOne((type) => Food, (food: Food) => food.orders, { onDelete: 'CASCADE' })
  food: Food

  @Column()
  quantity: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date
}

export default OrderDetails
