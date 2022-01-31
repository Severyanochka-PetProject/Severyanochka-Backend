import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { TokensDto } from './dto/tokens.dto';

@ApiTags('Авторизация / Регистрация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @ApiResponse({ type: TokensDto })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() userDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens: TokensDto = await this.authService.login(userDto);

    response.cookie('access', tokens.access_token, { httpOnly: true });

    return tokens.refresh_token;
  }

  @ApiResponse({ type: TokensDto })
  @Post('/registration')
  @HttpCode(HttpStatus.CREATED)
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
