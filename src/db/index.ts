import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../users/entity/user.entity';

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'tank',
  password: 'Qwerty',
  database: 'severyanochka',
  entities: [UserEntity],
  synchronize: true,
};

export default dbConfig;
