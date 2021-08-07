import { inject, injectable } from 'tsyringe';
import { Property } from '@modules/properties/infra/typeorm/entities/Property';
import { IPropertiesRepository } from '@modules/properties/repositories/IPropertiesRepository';

@injectable()
class ListPropertiesUseCase {
  constructor(
    @inject('PropertiesRepository')
    private propertiesRepository: IPropertiesRepository,
  ) { }

  async execute(): Promise<Property[]> {
    const properties = await this.propertiesRepository.find();

    return properties;
  }
}

export { ListPropertiesUseCase }