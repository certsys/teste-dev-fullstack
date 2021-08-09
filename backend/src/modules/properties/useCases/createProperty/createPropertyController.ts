import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreatePropertyUseCase } from './createPropertyUseCase';

class CreatePropertyController {
  async handle(request: Request, response: Response): Promise<Response> {   
    const { title,
      description,
      value,
      area,
      address,
      house_number,
      cep } = request.body;

    const createPropertyUseCase = container.resolve(CreatePropertyUseCase);
      
    const property = await createPropertyUseCase.execute({ 
      title,
      description,
      value,
      area,
      address,
      house_number,
      cep,
    });

    return response.status(201).json(property);
  }
}

export { CreatePropertyController }