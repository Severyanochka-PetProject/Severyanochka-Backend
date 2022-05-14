import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthJwtGuard } from '../auth/auth-jwt.guard';
import { GetUserDto } from './dto/get-user.dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateUserDto })
  @UseGuards(AuthJwtGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'token',
  })
  @ApiOperation({ summary: 'Получение списка пользователей' })
  @ApiResponse({ status: HttpStatus.OK, type: [CreateUserDto] })
  @UseGuards(AuthJwtGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'token',
  })
  @ApiResponse({ status: HttpStatus.OK, type: [GetUserDto] })
  @ApiOperation({ summary: 'Получение пользователя по его номеру телефона' })
  @Get('/getByPhoneNumber')
  @HttpCode(HttpStatus.OK)
  async getById(@Body() body): Promise<GetUserDto> {
    const user = await this.userService.getUserByPhoneNumber(body.phone_number);

    return {
      id_user: user.id_user,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      avatar_url: user.avatar_url,
    };
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'token',
  })
  @ApiOperation({
    summary: 'Получение информации при авторизации (ПОТОМ БУДЕТ ПО ТОКЕНУ)',
  })
  @ApiResponse({ status: HttpStatus.OK, type: [GetUserDto] })
  @UseGuards(AuthJwtGuard)
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  async getMe(@Req() request): Promise<GetUserDto> {
    const { phone_number } = request.payload;

    // console.log(phone_number);

    const user = await this.userService.getUserByPhoneNumber(phone_number);

    return {
      id_user: user.id_user,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      avatar_url: user.avatar_url,
    };
  }
}
