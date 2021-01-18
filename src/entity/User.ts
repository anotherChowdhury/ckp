import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm'
import { Store } from './Store'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 100 })
  name: string

  @Column({ length: 100, unique: true })
  email: string

  @Column('varchar', { length: 255 })
  password: string

  @Column('boolean', { default: true })
  isActive: boolean

  @OneToMany((type) => Store, (store: Store) => store.id)
  stores: Store[]
}
