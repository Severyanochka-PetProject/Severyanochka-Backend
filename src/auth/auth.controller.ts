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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto, LoginVkDto } from './dto/login.dto';
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
      httpOnly: true,
      sameSite: 'none',
      secure: true
    });

    return tokens.access_token;
  }

  @Post('/login-vk')
  @HttpCode(HttpStatus.OK)
  async LoginVk(
    @Body() userVkDto: LoginVkDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const status: TokensDto = await this.authService.loginVk(userVkDto);

    if (status.access_token) {
      response.cookie('refresh', status.refresh_token, {
        httpOnly: true,
	sameSite: 'none',
	secure: true
      });
    }

    return status.access_token;
  }

  @ApiResponse({
    status: 200,
    description: 'Return object { status: true, msg: "..." }',
  })
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
    console.log(request.cookies);
    const tokens: TokensDto = await this.authService.refresh(refresh);

    response.cookie('refresh', tokens.refresh_token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    });

    return tokens.access_token;
  }

  @ApiOperation({
    summary: 'Выход из личного кабинета',
  })
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refresh } = request.cookies;

    this.authService.logout(refresh);

    response.clearCookie('refresh', {
    	sameSite: 'none',
	secure: true
    });

    return {
      status: true,
    };
  }
}
