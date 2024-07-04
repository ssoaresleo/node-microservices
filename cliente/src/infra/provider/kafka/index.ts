import { Kafka, logLevel } from "kafkajs";

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKERS || "default_broker"],
  ssl: true,
  sasl: {
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME || "",
    password: process.env.KAFKA_PASSWORD || "",
  },
  logLevel: logLevel.ERROR,
});

export { kafka };
