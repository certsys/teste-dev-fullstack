import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListPropertiesUseCase } from './listPropertiesUseCase';

class ListPropertyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, limit } = request.query;
    const listPropertiesUseCase = container.resolve(ListPropertiesUseCase);

    const { 
      "0": properties, 
      "1": totalCount 
    } = await listPropertiesUseCase.execute({
      page: Number(page),
      limit: Number(limit)
    });   

    response.setHeader('x-total-count', totalCount);
    return response.status(200).json({
      properties: properties
    });
  }
}

export { ListPropertyController }