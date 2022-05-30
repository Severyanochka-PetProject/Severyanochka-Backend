import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import 'reflect-metadata';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://tankistpro-food.ru', 'http://www.tankistpro-food.ru'],
    credentials: true,
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Severyanochka API')
    .setDescription('Документация по Severyanochka REST API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document, {
    // swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  await app.listen(5500);
}

bootstrap();
