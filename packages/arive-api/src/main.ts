/* Nestjs Dependencies */
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import * as compression from 'compression';
import { Logger } from 'nestjs-pino';
import { useContainer } from 'class-validator';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('config.port', 3000);
  app.enableCors();
  app.use(bodyParser.json({limit: '1mb'}));
  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessages = errors.map((error) =>
          Object.values(error.constraints).join(', '),
        );

        const errorMessagesParsed = errorMessages
          .map((error) => error.charAt(0).toUpperCase() + error.slice(1))
          .join(', ');

        return new BadRequestException(String(errorMessagesParsed));
      },
      forbidUnknownValues: false,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useLogger(app.get(Logger));

  const config = new DocumentBuilder()
    .setTitle('Arive Api')
    .setDescription('Documentation for arive backend challenge')
    .setVersion('1.0')
    .addTag('arive')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservicesAsync();

  await app.listen(port);

  console.log(
    `http server listening at ${port} port | ${configService.get<string>(
      'config.environment',
    )}`,
    'main.ts',
    true,
  );
}
bootstrap();
