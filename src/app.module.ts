import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import dbConfig from './db';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    FilesModule,
    TypeOrmModule.forRoot(dbConfig),
  ],
})
export class AppModule {}
