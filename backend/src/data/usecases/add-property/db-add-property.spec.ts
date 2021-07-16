import { DbAddProperty } from './db-add-property';
import {
  AddPropertyModel,
  AddPropertyRepository,
} from './db-add-property-protocols';

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

describe('DbAddProperty UseCase', () => {
  test('Should call AddPropertyRepository with correct values', async () => {
    class AddPropertyRepositoryStub implements AddPropertyRepository {
      async add(data: AddPropertyModel): Promise<void> {
        return new Promise(resolve => resolve());
      }
    }
    const addPropertyRepositoryStub = new AddPropertyRepositoryStub();
    const addSpy = jest.spyOn(addPropertyRepositoryStub, 'add');
    const sut = new DbAddProperty(addPropertyRepositoryStub);
    const propertyData = makePropertyData();
    await sut.add(propertyData);
    expect(addSpy).toHaveBeenCalledWith(propertyData);
  });
});
