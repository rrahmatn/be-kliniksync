import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from "cors"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(cors())
  const config = new DocumentBuilder()
    .setTitle('Clinic')
    .setDescription('The clinic API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('clinic')
    .addTag('superadmin')
    .addTag('receptionist')
    .addTag('doctor')
    .addTag('pharmacy')
    .addTag('cashier')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3333);
}
bootstrap();
