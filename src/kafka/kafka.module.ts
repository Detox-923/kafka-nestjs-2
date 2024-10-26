import { Global, Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { kafkaClientOptions } from "./configuration/kafka.options";
import { ProducerService } from "./services/producer.service";
import { consumers } from "./consumers";

@Global()
@Module({
    imports: [
        ClientsModule.register([
            kafkaClientOptions
        ])
    ],
    providers: [
        ProducerService,
    ],
    controllers: [
        ...consumers
    ],
    exports: [
        ProducerService
    ]
})
export class KafkaModule {

}