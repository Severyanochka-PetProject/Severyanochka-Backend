import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { GetUserDto } from './dto/get-user.dto';
import { firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly httpService: HttpService,
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

  async getUserByVkId(user_id: number): Promise<CreateUserDto> {
    try {
      return await this.userRepository.findOne({ vk_user_id: user_id });
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

  getUserDataFromVk(user_id: number, token: string): Promise<CreateUserDto> {
    try {
      return firstValueFrom(
        this.httpService
          .get(
            `https://api.vk.com/method/users.get?user_ids=${user_id}&fields=photo_400,home_town,contacts&access_token=${token}&v=5.89`,
          )
          .pipe(
            map((res) => {
	      console.log(res);
              const user = res.data.response[0];

              return {
                avatar_url: user.photo_400,
                first_name: user.first_name,
                last_name: user.last_name,
                phone_number: null,
              };
            }),
          ),
      );
    } catch (e) {
      return e;
    }
  }

  async getUserByToken() {}
}
