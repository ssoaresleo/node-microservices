import { db } from "../../infra/db/prisma";
import { KafkaSendMenssage } from "../../infra/providers/kafka/producer";

type UpdateOrderRequest = {
  id: string;
  status: string;
};

export class UpdateOrderUseCase {
  constructor() {}

  async execute(data: UpdateOrderRequest) {
    const updateOrder = await db.order.update({
      where: { id: data.id },
      data: {
        status: data.status,
      },
    });

    const kafkaSendMensage = new KafkaSendMenssage();

    await kafkaSendMensage.execute("ORDER_STATUS", {
      customerId: updateOrder.customerId,
      status: updateOrder.status,
    });

    return updateOrder;
  }
}
