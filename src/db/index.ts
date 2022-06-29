import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../users/entity/user.entity';

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_DATABASE,
  entities: [UserEntity],
  synchronize: true,
};

export default dbConfig;
