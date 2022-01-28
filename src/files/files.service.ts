import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  getFile(fileName: string) {
    try {
      return fs.readFileSync(`./images/${fileName}`);
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
