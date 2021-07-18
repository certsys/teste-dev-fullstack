import {
  LoadProperty,
  PropertyModel,
} from './load-property-controller-protocols';

import MockDate from 'mockdate';
import { noContent, ok, serverError } from '../../../helpers/http-helper';
import { LoadPropertyController } from './load-property-controller';

const makeFakeProperty = (): PropertyModel => {
  return {
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
  };
};

interface SutTypes {
  sut: LoadPropertyController;
  loadPropertyStub: LoadProperty;
}

const makeLoadProperty = (): LoadProperty => {
  class LoadPropertyStub implements LoadProperty {
    async load(id: string): Promise<PropertyModel> {
      return new Promise(resolve => resolve(makeFakeProperty()));
    }
  }
  return new LoadPropertyStub();
};

const makeSut = (): SutTypes => {
  const loadPropertyStub = makeLoadProperty();
  const sut = new LoadPropertyController(loadPropertyStub);
  return {
    sut,
    loadPropertyStub,
  };
};

describe('LoadProperty Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should return 200 on success', async () => {
    const { sut, loadPropertyStub } = makeSut();
    const loadSpy = jest.spyOn(loadPropertyStub, 'load');
    const httpRequest = {
      params: 'any_id',
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(ok(makeFakeProperty()));
  });
});
