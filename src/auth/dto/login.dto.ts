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
    description: 'Token доступа к API VK',
  })
  access_token: string;

  @ApiProperty({
    required: false,
    description: 'E-mail от VK',
  })
  email: string | null;

  @ApiProperty({
    required: true,
    example: 1234,
    description: 'id пользователя VK',
  })
  user_id: number;
}
