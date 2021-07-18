import { ObjectId } from 'mongodb';
import {
  PropertyModel,
  UpdatePropertyModel,
} from '../../../domain/models/property';
import { UpdateProperty } from '../../../domain/usecases/update-property';
import { UpdatePropertyRepository } from '../../protocols/db/property/update-property-repository';

export class DbUpdateProperty implements UpdateProperty {
  constructor(
    private readonly loadPropertyRepository: UpdatePropertyRepository,
  ) {}
  async update(updateData: UpdatePropertyModel): Promise<PropertyModel | null> {
    const propeties = await this.loadPropertyRepository.update(updateData);
    return propeties;
  }
}
