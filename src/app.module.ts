import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import dbConfig from './db';
import { UsersModule } from './users/users.module';
// import { UserEntity } from './users/entity/user.entity.';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(dbConfig)],
})
export class AppModule {}
