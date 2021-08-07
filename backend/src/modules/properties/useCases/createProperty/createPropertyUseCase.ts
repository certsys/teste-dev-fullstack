import { inject, injectable } from 'tsyringe';
import { ICreatePropertyDTO } from '@modules/properties/dtos/ICreatePropertyDTO';
import { Property } from '@modules/properties/infra/typeorm/entities/Property';
import { IPropertiesRepository } from '@modules/properties/repositories/IPropertiesRepository';
import { AppError } from '@errors/AppError';

@injectable()
class CreatePropertyUseCase {
  constructor(
    @inject('PropertiesRepository')
    private propertiesRepository: IPropertiesRepository,
  ) { }

  async execute({
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
    const propertyAlreadyExist = await this.propertiesRepository.findByTitle(title);

    if (propertyAlreadyExist) {
      throw new AppError('Property already exist!');
    }

    const property = await this.propertiesRepository.create({
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
    });

    return property;
  }
}

export { CreatePropertyUseCase }