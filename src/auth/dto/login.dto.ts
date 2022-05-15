import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    required: true,
    example: '79163472537',
    description: 'Номер телофона пользователя',
  })
  phone_number: string;

  @ApiProperty({
    required: true,
    example: 'Test1234',
    description: 'Пароль от аккаунта',
  })
  password: string;
}

export class LoginVkDto {
  @ApiProperty({
    required: true,
    example: 12342,
    description: 'id пользователя VK',
  })
  vk_user_id: number;
  phone_number: string | undefined;
  email?: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
}
