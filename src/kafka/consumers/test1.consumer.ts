import { Controller, Logger } from "@nestjs/common";
import { Ctx, EventPattern, KafkaContext, Payload } from "@nestjs/microservices";
import { test1Message } from "../consumer-types/test1-message.type";

@Controller()
export class Test1Consumer {

    private readonly logger = new Logger(Test1Consumer.name);

    @EventPattern('consumer-test1-topic-1')
    handle(
        @Payload() message: test1Message, @Ctx() context: KafkaContext 
    ): void {
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
        this.logger.log(`Value:`, value.toJSON());
        
    }
}