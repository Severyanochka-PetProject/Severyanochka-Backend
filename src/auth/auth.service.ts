import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { TokensDto } from './dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: LoginDto) {
    const user = await this.userService.getUserByPhoneNumber(
      userDto.phone_number,
    );

    if (!user) {
      throw new HttpException(
        {
          status: false,
          error: 'Пользователь не существует',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.password !== userDto.password) {
      throw new HttpException(
        {
          status: false,
          error: 'Неверный номер телефона или пароль',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const access_token = await this.generateAccessToken(user);
    const refresh_token = await this.generateRefreshToken(user);

    return {
      access_token,
      refresh_token,
    };
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByPhoneNumber(
      userDto.phone_number,
    );

    if (candidate) {
      throw new HttpException(
        {
          status: false,
          error: 'Пользователь уже существует',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try { 
      const user = await this.userService.createUser(userDto);

      return {
        status: true,
        msg: 'Вы успешно зарегистрировались'
      };
    } catch (error) {
      return error;
    }
  }

  generateAccessToken(user: CreateUserDto): Promise<string> {
    const payload = { phone_number: user.phone_number };

    return this.jwtService.signAsync(payload, {
      secret: 'service-testqwe232',
      expiresIn: '1h',
    });
  }

  generateRefreshToken(user: CreateUserDto): Promise<string> {
    const payload = { phone_number: user.phone_number };

    return this.jwtService.signAsync(payload, {
      secret: 'tansdt*(12d/23_**&72332',
      expiresIn: '1d',
    });
  }

  async getPhoneFromRefreshToken(token) {
    try {
      return this.jwtService.verify(token, {
        secret: 'tansdt*(12d/23_**&72332',
      });
    } catch (e) {
      return null;
    }
  }

  async refresh(token): Promise<TokensDto> {
    if (!token) {
      throw new HttpException(
        {
          status: false,
          error: 'Token empty',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const tokenData = await this.getPhoneFromRefreshToken(token);
    const user: CreateUserDto = await this.userService.getUserByPhoneNumber(
      tokenData?.phone_number,
    );

    if (!tokenData || !user) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }

    const access_token = await this.generateAccessToken(user);
    const refresh_token = await this.generateRefreshToken(user);

    return {
      access_token,
      refresh_token,
    };
  }

  logout(refreshToken: string): boolean {
    if (!refreshToken) {
      throw new HttpException(
        {
          status: false,
          error: 'Token empty',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return true;
  }
}
