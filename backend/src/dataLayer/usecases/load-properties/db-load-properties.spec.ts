import { PropertyModel } from '../../../domain/models/property';
import { LoadPropertiesRepository } from '../../protocols/db/property/load-properties-repository';
import { DbLoadProperties } from './db-load-properties';

const makeFakeProperties = (): PropertyModel[] => {
  return [
    {
      id: 'any_id',
      publication_date: new Date(),
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
    },
    {
      id: 'other_id',
      publication_date: new Date(),
      title: 'other_title',
      description: 'other_description',
      value: 0,
      area: 'other_area',
      address: 'other_address',
      public_place: 'other_public_place',
      number: 'other_number',
      adjunct: 'other_adjunct',
      neighborhood: 'other_neighborhood',
      zip_code: 'other_zip_code',
      city: 'other_city',
      state: 'other_state',
    },
  ];
};

describe('DbLoadProperties', () => {
  test('Should call LoadPropertiesRepository', async () => {
    class LoadPropertiesRepositoryStub implements LoadPropertiesRepository {
      async loadAll(): Promise<PropertyModel[]> {
        return new Promise(resolve => resolve(makeFakeProperties()));
      }
    }
    const loadPropertiesRepositoryStub = new LoadPropertiesRepositoryStub();
    const loadAllSpy = jest.spyOn(loadPropertiesRepositoryStub, 'loadAll');
    const sut = new DbLoadProperties(loadPropertiesRepositoryStub);
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });
});
