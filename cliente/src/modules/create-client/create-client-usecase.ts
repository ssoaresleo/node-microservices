import { db } from "../../infra/db/prisma";
import { KafkaSendMenssage } from "../../infra/provider/kafka/producer";

type CreateClientRequest = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

export class CreateClientUseCase {
  constructor() {}

  async execute(data: CreateClientRequest) {
    const customerAlreadyExists = await db.client.findFirst({
      where: {
        email: data.email,
      },
    });

    if (customerAlreadyExists) {
      throw new Error("Customer already exists");
    }

    const newCustomer = await db.client.create({
      data: {
        ...data,
      },
    });

    const kafkaProducer = new KafkaSendMenssage();
    await kafkaProducer.execute("CUSTOMER_CREATED", {
      id: newCustomer.id,
      email: newCustomer.email,
    });

    return newCustomer;
  }
}
