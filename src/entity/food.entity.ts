import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Category } from './category.entity'

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, nullable: false })
  name: string

  @Column('text')
  description: string

  @Column({ nullable: false })
  price: number

  @ManyToOne((type) => Category, (category: Category) => category.foods)
  category: Category

  @Column('boolean', { default: true })
  isActive: boolean
}
