import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'
import OrderDetails from './orderDetails.entity'

@Entity()
class Order {
  @PrimaryGeneratedColumn()
  id: number

  // @Column('date', { default: () => new Date() })
  // date: Date

  @Column()
  name: string

  @Column()
  phone: string

  @Column()
  address: string

  @OneToMany((type) => OrderDetails, (details: OrderDetails) => details.order, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn()
  details: OrderDetails[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}

export default Order
