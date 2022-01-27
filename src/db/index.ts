import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../users/entity/user.entity';

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'Qwerty',
  database: 'Severyanochka',
  entities: [UserEntity],
  synchronize: true,
};

export default dbConfig;
