import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDto) {
    try {
      return await this.userRepository.save(dto);
    } catch (e) {
      throw new HttpException(
        { status: false, error: 'Не удалось создать пользователя' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async getUserByPhoneNumber(phone): Promise<CreateUserDto> {
    try {
      console.log(await this.userRepository.findOne({ phone_number: phone }));
      return await this.userRepository.findOne({ phone_number: phone });
    } catch (e) {
      throw new HttpException(
        {
          status: false,
          error: 'Пользователь с таким телефоном не найден!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUserByToken() {}
}
