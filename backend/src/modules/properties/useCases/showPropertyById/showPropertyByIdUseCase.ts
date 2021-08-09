import { inject, injectable } from 'tsyringe';
import { Property } from '@modules/properties/infra/typeorm/entities/Property';
import { IPropertiesRepository } from '@modules/properties/repositories/IPropertiesRepository';

@injectable()
class ShowPropertyByIdUseCase {
  constructor(
    @inject('PropertiesRepository')
    private propertiesRepository: IPropertiesRepository,
  ) { }

  async execute(id: string): Promise<Property> {
    const property = await this.propertiesRepository.findById(id);

    return property;
  }
}

export { ShowPropertyByIdUseCase }