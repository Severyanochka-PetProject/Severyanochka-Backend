import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    required: true,
    example: '79163472537',
    description: 'Номер телофона пользователя',
  })
  phone_number: string;
}
