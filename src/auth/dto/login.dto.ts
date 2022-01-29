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
