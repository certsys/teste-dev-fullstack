import { PropertyModel } from '../../../domain/models/property';
import { LoadProperty } from '../../../domain/usecases/load-property';
import { LoadPropertyRepository } from '../../protocols/db/property/load-property-repository';

export class DbLoadProperty implements LoadProperty {
  constructor(
    private readonly loadPropertyRepository: LoadPropertyRepository,
  ) {}
  async load(id: string): Promise<PropertyModel> {
    const propeties = await this.loadPropertyRepository.loadOne(id);
    return propeties;
  }
}
