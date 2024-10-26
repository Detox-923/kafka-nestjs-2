import { ClientProviderOptions, Transport, MicroserviceOptions } from "@nestjs/microservices";
import * as config from 'config';
import { Partitioners } from "kafkajs";

export const KAFKA_CLIENT = 'KAFKA_CLIENT';

export const kafkaOptions: MicroserviceOptions = {
    transport: Transport.KAFKA,
    options: {
        client: {
            clientId: config.get<string>(`configuration.kafka.clientId`),
            brokers: [
                ...config.get<string[]>(`configuration.kafka.brokers`)
            ],
            retry: {
                initialRetryTime: 100,
                retries: 10
            },
            connectionTimeout: 10000,
        },
        consumer: {
            groupId: config.get<string>(`configuration.kafka.consumer.groupId`),
            allowAutoTopicCreation: true,
            retry: {
                initialRetryTime: 100,
                retries: 10
            },
        },
        producer: {
            allowAutoTopicCreation: true,
            retry: {
                initialRetryTime: 100,
                retries: 10
            },
            createPartitioner: Partitioners.DefaultPartitioner
        },
        subscribe: {
            fromBeginning: false,
        }
    }
}

export const kafkaClientOptions: ClientProviderOptions = {
    name: KAFKA_CLIENT,
    ...kafkaOptions
}

