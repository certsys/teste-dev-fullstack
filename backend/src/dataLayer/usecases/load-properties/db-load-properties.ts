import { PropertyModel } from '../../../domain/models/property';
import { LoadProperties } from '../../../domain/usecases/load-properties';
import { LoadPropertiesRepository } from '../../protocols/db/property/load-properties-repository';

export class DbLoadProperties implements LoadProperties {
  constructor(
    private readonly loadPropertiesRepository: LoadPropertiesRepository,
  ) {}
  async load(query?: any): Promise<PropertyModel[]> {
    const propeties = await this.loadPropertiesRepository.loadAll(query);
    return propeties;
  }
}
