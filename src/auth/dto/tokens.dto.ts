import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty({
    required: false,
  })
  refresh_token?: string;
}
