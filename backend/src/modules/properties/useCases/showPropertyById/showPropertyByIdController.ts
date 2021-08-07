import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ShowPropertyByIdUseCase } from './showPropertyByIdUseCase';

class ShowPropertyByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showPropertyByIdUseCase = container.resolve(ShowPropertyByIdUseCase);

    const property = await showPropertyByIdUseCase.execute(id);

    return response.status(200).json(property);
  }
}

export { ShowPropertyByIdController }