import { PrimaryGeneratedColumn, Column, Entity, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Store } from './store.entity'

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

  @OneToMany((type) => Store, (store: Store) => store.owner)
  stores: Store[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
