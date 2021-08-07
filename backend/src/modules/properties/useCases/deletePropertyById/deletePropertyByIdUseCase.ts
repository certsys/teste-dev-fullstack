import { inject, injectable } from 'tsyringe';
import { IPropertiesRepository } from '@modules/properties/repositories/IPropertiesRepository';
import { AppError } from '@errors/AppError';

@injectable()
class DeletePropertyByIdUseCase {
  constructor(
    @inject('PropertiesRepository')
    private propertiesRepository: IPropertiesRepository,
  ) { }

  async execute(id: string): Promise<boolean> {
    const propertyExists = await this.propertiesRepository.findById(id);

    if (!propertyExists) {
      throw new AppError('Property not exist!', 404);
    }

    const propertyDeleted = await this.propertiesRepository.delete(id);

    return propertyDeleted;
  }
}

export { DeletePropertyByIdUseCase }