import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: '12',
    description: 'ID пользователя',
    required: false,
  })
  id_user?: number;

  @ApiProperty({
    example: 'Иван',
    description: 'Имя пользователя',
  })
  first_name: string;

  @ApiProperty({
    example: 'Молчанов',
    description: 'Фамилия пользователя',
    required: false,
  })
  last_name?: string;

  @ApiProperty({
    example: '79162265523',
    description:
      'Пароль от аккаунта (При входе через соц. сети пароль отсутсвует)',
  })
  password?: string;

  @ApiProperty({
    example: '79162265523',
    description: 'Номер  телефона',
  })
  phone_number: string;

  @ApiProperty({
    example: 'nikolay.png',
    description: 'Url аватарки пользователя (может быть пустым!)',
    required: false,
  })
  avatar_url?: string;

  @ApiProperty({
    description: 'При авторизации через VK',
    required: false,
  })
  vk_user_id?: number;
}
