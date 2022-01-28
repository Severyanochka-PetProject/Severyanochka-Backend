import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { diskStorage } from 'multer';
import e from 'express';
import { CreateImageDto } from './dto/create-image.dto';
import * as fs from 'fs';

@ApiTags('Изображения')
@Controller('images')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @ApiOperation({ summary: 'Загрузка изображения на сервер' })
  @ApiResponse({ type: CreateImageDto })
  @Post('/upload')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './images/',
        filename(
          req: e.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          const name = file.originalname.split('.')[0];
          const fileExt = file.originalname.split('.')[1];
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${name}-${randomName}.${fileExt}`);
        },
      }),
    }),
  )
  saveFile(@UploadedFile() file: Express.Multer.File): CreateImageDto {
    return {
      filename: file.filename,
      mimetype: file.mimetype,
      encoding: file.encoding,
      size: file.size,
    };
  }

  @ApiOperation({ summary: 'Получение Buffer изображения' })
  @Get('/get/:fileName')
  @HttpCode(HttpStatus.OK)
  async getImage(@Param('fileName') fileName: string) {
    try {
      return await fs.readFileSync(`./images/${fileName}`);
    } catch (e) {
      throw new HttpException(
        {
          status: false,
          error: 'Не удалось прочитать файл',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
