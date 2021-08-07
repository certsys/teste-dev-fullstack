import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListPropertiesUseCase } from './listPropertiesUseCase';

class ListPropertyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listPropertiesUseCase = container.resolve(ListPropertiesUseCase);

    const properties = await listPropertiesUseCase.execute();

    return response.status(200).json(properties);
  }
}

export { ListPropertyController }