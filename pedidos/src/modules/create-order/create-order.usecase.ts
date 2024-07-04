import { db } from "../../infra/db/prisma";

type CreateOrderRequest = {
  customerId: string;
  items: [{ productId: string; quantity: number }];
};

export class CreateOrderUseCase {
  constructor() {}

  async execute(data: CreateOrderRequest) {
    // console.log(data);
    const newOrder = await db.order.create({
      data: {
        customerId: data.customerId,
        OrderItems: {
          createMany: {
            data: data.items,
          },
        },
        status: "AGUARDANDO_PAGAMENTO",
      },
    });

    return newOrder;
  }
}
