import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  async saveFile(file: Express.Multer.File) {
    console.log(file);
  }
}
