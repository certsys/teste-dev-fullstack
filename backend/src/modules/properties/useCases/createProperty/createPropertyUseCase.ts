import { inject, injectable } from 'tsyringe';
import { IRequestPropertyDTO } from '@modules/properties/dtos/IRequestPropertyDTO';
import { ICreatePropertyDTO } from '@modules/properties/dtos/ICreatePropertyDTO';
import { Property } from '@modules/properties/infra/typeorm/entities/Property';
import { IPropertiesRepository } from '@modules/properties/repositories/IPropertiesRepository';
import { AppError } from '@errors/AppError';
import { ICEPProvider } from '@shared/container/CEPProvider/models/ICEPProvider';

@injectable()
class CreatePropertyUseCase {
  constructor(
    @inject('PropertiesRepository')
    private propertiesRepository: IPropertiesRepository,

    @inject('CEPProvider')
    private cepRepository: ICEPProvider,
  ) { }

  async execute({
    title,
    description,
    value,
    area,
    address,
    house_number,
    cep,
  }: IRequestPropertyDTO): Promise<Property> {
    const propertyAlreadyExist = await this.propertiesRepository.findByTitle(title);

    if (propertyAlreadyExist) {
      throw new AppError('Property already exist!');
    }

    const {
      public_place,
      district,
      complement,
      city,
      uf
    } = await this.cepRepository.recoverAddress(cep);

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