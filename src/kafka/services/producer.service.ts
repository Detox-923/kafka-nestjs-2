import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { ProducerEvent } from "../interfaces/producer.event";
import { lastValueFrom } from 'rxjs';
import { KAFKA_CLIENT } from "../configuration/kafka.options";

@Injectable()
export class ProducerService {

    private readonly logger = new Logger(ProducerService.name);

    constructor(
        @Inject(KAFKA_CLIENT) private readonly kafkaClient: ClientKafka
    ) { }

    sendMessage(event: ProducerEvent): void {
        lastValueFrom(
            this.kafkaClient.emit(event.topic, JSON.stringify(event.message))
        )
            .then((response) => {
                this.logger.log(`Message sent to topic: ${event.topic}`, response);
            }).catch((error) => {
                this.logger.error(`Error sending message to topic: ${event.topic}`, error);
            });
    }

}