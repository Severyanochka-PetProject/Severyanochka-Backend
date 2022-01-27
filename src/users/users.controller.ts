import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthJwtGuard } from '../auth/auth-jwt.guard';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateUserDto })
  @UseGuards(AuthJwtGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение списка пользователей' })
  @ApiResponse({ status: HttpStatus.OK, type: [CreateUserDto] })
  @UseGuards(AuthJwtGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.userService.getAllUsers();
  }
}
