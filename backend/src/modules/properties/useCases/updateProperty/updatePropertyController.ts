import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdatePropertyUseCase } from './updatePropertyUseCase';

class UpdatePropertyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
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

    const updatePropertyUseCase = container.resolve(UpdatePropertyUseCase);

    const property = await updatePropertyUseCase.execute({ 
      id,
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

    return response.status(200).json(property);
  }
}

export { UpdatePropertyController }