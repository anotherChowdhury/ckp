import path from 'path'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgres://db_user:password@localhost/ckp_demo',
  // host: 'localhost',
  // port: 5432,
  // username: 'db_user',
  // password: 'password',
  // database: 'ckp_demo',
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, '/entity/*.{ts,js}')]
}

export { typeOrmConfig }
