import { AddPropertyRepository } from '../../../../data/protocols/db/property/add-property-repository';
import { AddPropertyModel } from '../../../../domain/usecases/add-property';
import { MongoHelper } from '../helpers/mongo-helper';

export class PropertyMongoRepository implements AddPropertyRepository {
  async add(propertyData: AddPropertyModel): Promise<void> {
    const propertyCollection = await MongoHelper.getCollection('properties');
    await propertyCollection.insertOne(propertyData);
  }
}
