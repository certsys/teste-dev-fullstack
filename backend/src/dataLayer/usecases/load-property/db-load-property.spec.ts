import { PropertyModel } from '../../../domain/models/property';
import { LoadPropertyRepository } from '../../protocols/db/property/load-property-repository';
import { DbLoadProperty } from './db-load-property';

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
  sut: DbLoadProperty;
  loadPropertyRepositoryStub: LoadPropertyRepository;
}
const makeLoadPropertyRepository = (): LoadPropertyRepository => {
  class LoadPropertyRepositoryStub implements LoadPropertyRepository {
    async loadOne(query?: any): Promise<PropertyModel> {
      return new Promise(resolve => resolve(makeFakeProperty()));
    }
  }
  return new LoadPropertyRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadPropertyRepositoryStub = makeLoadPropertyRepository();
  const sut = new DbLoadProperty(loadPropertyRepositoryStub);
  return {
    sut,
    loadPropertyRepositoryStub,
  };
};

describe('DbLoadProperty', () => {
  test('Should call LoadPropertyRepository', async () => {
    const { sut, loadPropertyRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadPropertyRepositoryStub, 'loadOne');

    await sut.load('any_id');
    expect(loadAllSpy).toHaveBeenCalled();
  });
});
