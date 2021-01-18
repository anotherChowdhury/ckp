import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Category } from './Category'
import { User } from './User'

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne((type) => User, (user: User) => user.stores)
  owner: User

  @Column({ unique: true })
  name: string

  @Column('text')
  description: string

  @Column('text', { nullable: true })
  address: string

  @OneToMany((type) => Category, (category: Category) => category.store)
  categories: Category[]
}
