import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
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

    return this.generateToken(userDto);
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

    const user = await this.userService.createUser(userDto);
    return this.generateToken(user);
  }

  async generateToken(user: CreateUserDto) {
    const payload = { phone_number: user.phone_number };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
