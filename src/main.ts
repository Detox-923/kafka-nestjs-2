import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';
import { kafkaOptions } from './kafka/configuration/kafka.options';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(kafkaOptions);
  await app.startAllMicroservices();

  await app.listen(config.get('configuration.server.port'));
  
  logger.log(`Application listening on port ${config.get<string>('configuration.server.port')}`);
}
bootstrap();
