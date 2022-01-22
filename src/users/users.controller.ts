import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() body: CreateUserDto) {
    const user: CreateUserDto = {
      first_name: body.first_name,
      last_name: body.last_name,
      phone_number: body.phone_number,
      avatar_url: body.avatar_url,
    };

    return this.userService.createUser(user);
  }
}
