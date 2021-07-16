import { MongoHelper } from '../helpers/mongo-helper';
import { PropertyMongoRepository } from './property-mongo-repository';
import { Collection } from 'mongodb';
import { AddPropertyModel } from '../../../../domain/usecases/add-property';

let propertyCollection: Collection;

const makePropertyData = (): AddPropertyModel => ({
  publication_date: 'any_publication_date',
  title: 'any_title',
  description: 'any_description',
  value: 0,
  area: 'any_area',
  address: 'any_address',
  public_place: 'any_public_place',
  number: 'any_number',
  adjunct: 'any_adjunct',
  neighborhood: 'any_neighborhood',
  zip_code: 'any_zip_code',
  city: 'any_city',
  state: 'any_state',
});

describe('Property Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    propertyCollection = await MongoHelper.getCollection('propertys');
    await propertyCollection.deleteMany({});
  });

  const makeSut = (): PropertyMongoRepository => {
    return new PropertyMongoRepository();
  };

  test('Should add a property on success', async () => {
    const sut = makeSut();
    const propertyData = makePropertyData();
    await sut.add(propertyData);
    const property = await propertyCollection.findOne({ title: 'any_title' });
    expect(property).toBeTruthy();
  });
});
