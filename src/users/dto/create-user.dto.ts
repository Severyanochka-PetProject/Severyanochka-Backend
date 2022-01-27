import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
    description: 'Номер  телефона',
  })
  phone_number: string;

  @ApiProperty({
    example: 'nikolay.png',
    description: 'Url аватарки пользователя (может быть пустым!)',
    required: false,
  })
  avatar_url?: string;
}
