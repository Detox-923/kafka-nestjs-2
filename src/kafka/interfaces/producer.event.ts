import { ProducerMessage } from "./producer.message";

export interface ProducerEvent {
    topic: string;
    message: ProducerMessage;
}