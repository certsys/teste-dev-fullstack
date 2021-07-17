import { LoadPropertiesController } from './load-properties-controller';
import {
  LoadProperties,
  PropertyModel,
} from './load-properties-controller-protocols';

import MockDate from 'mockdate';

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

describe('LoadProperties Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadProperties', async () => {
    class LoadPropertiesStub implements LoadProperties {
      async load(): Promise<PropertyModel[]> {
        return new Promise(resolve => resolve(makeFakeProperties()));
      }
    }
    const loadPropertiesStub = new LoadPropertiesStub();
    const loadSpy = jest.spyOn(loadPropertiesStub, 'load');
    const sut = new LoadPropertiesController(loadPropertiesStub);
    sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });
});
