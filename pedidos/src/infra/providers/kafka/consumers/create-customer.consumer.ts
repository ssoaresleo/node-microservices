import { db } from "../../../db/prisma";
import { kafkaConsumer } from "../kafka.consumer";

type CustomerConsumer = {
  email: string;
  id: string;
};

export async function createCustomerConsumer() {
  console.log("CUSTOMER CONSUMER:");
  const consumer = await kafkaConsumer("CUSTOMER_CREATED");

  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageToString = message.value!.toString();
      const customer = JSON.parse(messageToString) as CustomerConsumer;
      // console.log(messageToString);

      await db.customer.create({
        data: {
          externalId: customer.id,
          email: customer.email,
        },
      });
    },
  });
}

createCustomerConsumer();
