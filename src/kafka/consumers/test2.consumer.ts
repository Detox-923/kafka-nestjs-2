import { Controller, Logger } from "@nestjs/common";
import { Ctx, EventPattern, KafkaContext, Payload } from "@nestjs/microservices";
import { test2Message } from "../consumer-types/test2-message.type";

@Controller()
export class Test2Consumer {
    private readonly logger = new Logger(Test2Consumer.name);

    @EventPattern('consumer-topic-test2')
    handle(
        @Payload() message: test2Message, @Ctx() context: KafkaContext 
    ) {
        this.logger.log(`Received message: `, message);
        
        const topic = context.getTopic();
        const partition = context.getPartition();
        const {
            value,
            offset,
            headers,
            key
        } = context.getMessage();
        
        this.logger.log(`Topic: ${topic}`);
        this.logger.log(`Partition: ${partition}`);
        this.logger.log(`Offset: ${offset}`);
        this.logger.log(`Headers: `, headers);
        this.logger.log(`Key: ${key}`);
        this.logger.log(`Value:`, value);
    }
}