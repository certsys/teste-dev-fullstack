import { ObjectId } from 'mongodb';
import { AddPropertyRepository } from '../../../../dataLayer/protocols/db/property/add-property-repository';
import { LoadPropertiesRepository } from '../../../../dataLayer/protocols/db/property/load-properties-repository';
import { LoadPropertyRepository } from '../../../../dataLayer/protocols/db/property/load-property-repository';
import { PropertyModel } from '../../../../domain/models/property';
import { AddPropertyModel } from '../../../../domain/usecases/add-property';
import { MongoHelper } from '../helpers/mongo-helper';

export class PropertyMongoRepository
  implements
    AddPropertyRepository,
    LoadPropertiesRepository,
    LoadPropertyRepository
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

  async loadOne(id: string): Promise<PropertyModel> {
    const propertyCollection = await MongoHelper.getCollection('properties');
    const newId = new ObjectId(id);
    const property = await propertyCollection.findOne({
      _id: newId,
    });
    return property;
  }
}
