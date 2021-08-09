import { inject, injectable } from 'tsyringe';
import { Property } from '@modules/properties/infra/typeorm/entities/Property';
import { IPropertiesRepository } from '@modules/properties/repositories/IPropertiesRepository';
import { IFindParamsDTO } from '@modules/properties/dtos/IFindParamsDTO';

@injectable()
class ListPropertiesUseCase {
  constructor(
    @inject('PropertiesRepository')
    private propertiesRepository: IPropertiesRepository,
  ) { }

  async execute(
    { page, limit }: IFindParamsDTO
  ): Promise<[properties: Property[], totalCount: number ]> {
    const properties = await this.propertiesRepository.find({ page, limit });

    return properties;
  }
}

export { ListPropertiesUseCase }