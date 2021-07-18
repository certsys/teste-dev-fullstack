import { AddPropertyRepository } from '../../../../dataLayer/protocols/db/property/add-property-repository';
import { LoadPropertiesRepository } from '../../../../dataLayer/protocols/db/property/load-properties-repository';
import { PropertyModel } from '../../../../domain/models/property';
import { AddPropertyModel } from '../../../../domain/usecases/add-property';
import { MongoHelper } from '../helpers/mongo-helper';

export class PropertyMongoRepository
  implements AddPropertyRepository, LoadPropertiesRepository
{
  async add(propertyData: AddPropertyModel): Promise<void> {
    const propertyCollection = await MongoHelper.getCollection('properties');
    await propertyCollection.insertOne(propertyData);
  }

  async loadAll(query?: any): Promise<PropertyModel[]> {
    const propertyCollection = await MongoHelper.getCollection('properties');
    const properties = propertyCollection.find().toArray();
    return properties;
  }
}
