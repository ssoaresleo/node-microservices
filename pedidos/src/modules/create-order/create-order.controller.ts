import { CreateOrderUseCase } from "./create-order.usecase";
import { Request, Response } from "express";

export class CreateOrderController {
  constructor() {}

  async handle(request: Request, response: Response) {
    const useCase = new CreateOrderUseCase();

    try {
      const result = await useCase.execute(request.body);

      return response.status(201).json(result);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}
