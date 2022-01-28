import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty({
    example: '1-521f.jpg',
    description: 'Имя файла на сервере',
  })
  filename: string;

  @ApiProperty({
    example: 'image/jpeg',
  })
  mimetype: string;

  @ApiProperty({
    example: '7bit',
  })
  encoding: string;

  @ApiProperty({
    example: '46916',
  })
  size: number;
}
