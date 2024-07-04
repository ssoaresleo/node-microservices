import { kafkaConsumer } from "../kafka.consumer";

type NotificationConsumer = {
  customerId: string;
  status: string;
};

export async function notification() {
  console.log("CUSTOMER CONSUMER:");
  const consumer = await kafkaConsumer("ORDER_STATUS");

  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageToString = message.value!.toString();
      const statusConsumer = JSON.parse(messageToString) as NotificationConsumer;

      console.log(
        `ATUALIZAÇÃO DE STATUS - Client: ${statusConsumer.customerId} status: ${statusConsumer.status}`
      );
    },
  });
}

notification();
