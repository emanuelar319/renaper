import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

// Winston - LOG
import { WinstonModule } from 'nest-winston';
import * as  winston from 'winston';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    
    // Logger con winstone
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.File({
          maxsize: 512000,
          maxFiles: 5,
          filename: `${__dirname}/../logs/log-api.log`,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.align(),
            winston.format.simple(),
            winston.format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`),        
          )
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.simple(),
            winston.format.colorize({ all: true }),
            winston.format.align(),
            winston.format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`),
            // nestWinstonModuleUtilities.format.nestLike('Equinoccio', { prettyPrint: true })
          )
        })
      ]
    })
  });
  
  // Configuracion de CORS
  app.enableCors();

  // PIPES para validacion
  app.useGlobalPipes(new ValidationPipe());

  // Inicio de servidor
  await app.listen(3000);

}

bootstrap();
