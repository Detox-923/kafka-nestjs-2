import { ProducerEvent } from "../interfaces/producer.event";
import { ProducerMessage } from "../interfaces/producer.message";

export class Test1Event implements ProducerEvent {
    topic: string = "producer-topic-test1";
    message: Test1Message;

    constructor(message: Test1Message) {
        this.message = message;
    }
}

export class Test1Message implements ProducerMessage {
    date: string;
    value: string;
}