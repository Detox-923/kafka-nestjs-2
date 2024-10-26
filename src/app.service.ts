import { Injectable } from '@nestjs/common';
import { ProducerService } from './kafka/services/producer.service';
import { Test1Event } from './kafka/producer-events/test1.event';

@Injectable()
export class AppService {

  constructor(
    private readonly producerService: ProducerService
  ) {}

  getHello(): string {

    this.producerService.sendMessage(new Test1Event({
      date: new Date().toISOString(),
      value: 'Hello kafka!'
    }));

    return 'Hello World!';
  }
}
