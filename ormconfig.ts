import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'db_user',
  password: 'password',
  database: 'ckp_demo',
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts']
}

export { typeOrmConfig }
