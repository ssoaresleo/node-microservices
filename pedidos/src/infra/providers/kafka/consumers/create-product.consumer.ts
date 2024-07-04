import { db } from "../../../db/prisma";
import { kafkaConsumer } from "../kafka.consumer";

type CreateProductConsumer = {
  code: string;
  id: string;
};

export async function createProductConsumer() {
  const product = await kafkaConsumer("CREATED_PRODUCT");
  console.log("PRODUCT CONSUMER:");
  await product.run({
    eachMessage: async ({ message }) => {
      const messageToString = message.value!.toString();
      const product = JSON.parse(messageToString) as CreateProductConsumer;
        console.log("Criando produto")
      await db.product.create({
        data: {
          code: product.code,
          externalId: product.id,
        },
      });

      console.log("produto criado")
    },
  });
}

createProductConsumer();
