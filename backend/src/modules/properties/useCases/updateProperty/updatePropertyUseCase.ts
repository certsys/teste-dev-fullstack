import { inject, injectable } from 'tsyringe';
import { ICreatePropertyDTO } from '@modules/properties/dtos/ICreatePropertyDTO';
import { Property } from '@modules/properties/infra/typeorm/entities/Property';
import { IPropertiesRepository } from '@modules/properties/repositories/IPropertiesRepository';
import { AppError } from '@errors/AppError';

@injectable()
class UpdatePropertyUseCase {
  constructor(
    @inject('PropertiesRepository')
    private propertiesRepository: IPropertiesRepository,
  ) { }

  async execute({
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
    uf,
  }: ICreatePropertyDTO): Promise<Property> {
    const propertyExists = await this.propertiesRepository.findById(id);

    if (!propertyExists) {
      throw new AppError('Property not exist!', 404);
    }

    const property = await this.propertiesRepository.update({
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
      uf,
      created_at: propertyExists.created_at,
    });

    return property;
  }
}

export { UpdatePropertyUseCase }