import { db } from "../../infra/db/prisma";
import { KafkaSendMenssage } from "../../infra/providers/kafka/producer";

type CreateProductRequest = {
  name: string;
  code: string;
  quantity: number;
  price: number;
};

export class CreateProductUseCase {
  constructor() {}

  async execute(data: CreateProductRequest) {
    const productAlreadyExists = await db.product.findFirst({
      where: {
        code: data.code,
      },
    });

    if (productAlreadyExists) {
      throw new Error("Product already exists");
    }

    const newProduct = await db.product.create({
      data: {
        ...data,
      },
    });

    const kafkaMessage = new KafkaSendMenssage();

    await kafkaMessage.execute("CREATED_PRODUCT", {
      id: newProduct.id,
      code: newProduct.code,
    });

    return newProduct;
  }
}
