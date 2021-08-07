import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeletePropertyByIdUseCase } from './deletePropertyByIdUseCase';

class DeletePropertyByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePropertyByIdUseCase = container.resolve(DeletePropertyByIdUseCase);

    const propertyDeleted = await deletePropertyByIdUseCase.execute(id);

    return response.status(200).json(propertyDeleted);
  }
}

export { DeletePropertyByIdController }