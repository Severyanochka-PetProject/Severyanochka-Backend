import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

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

    response.cookie('refresh', tokens.refresh_token, {
      // sameSite: 'none',
      // secure: true,
      httpOnly: true,
    });

    return tokens.access_token;
  }

  @ApiResponse({ type: TokensDto })
  @Post('/registration')
  @HttpCode(HttpStatus.CREATED)
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @ApiResponse({ type: TokensDto })
  @Get('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refresh } = request.cookies;
    const tokens: TokensDto = await this.authService.refresh(refresh);

    response.cookie('refresh', tokens.refresh_token, { httpOnly: true });

    console.log(tokens);

    return tokens.access_token;
  }
}
