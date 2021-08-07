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
      public_place,
      house_number,
      complement,
      district,
      cep,
      city,
      uf } = request.body;

    const createPropertyUseCase = container.resolve(CreatePropertyUseCase);

    const property = await createPropertyUseCase.execute({ 
      title,
      description,
      value,
      area,
      address,
      public_place,
      house_number,
      complement,
      district,
      cep,
      city,
      uf
    });

    return response.status(201).json(property);
  }
}

export { CreatePropertyController }