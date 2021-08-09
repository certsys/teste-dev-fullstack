import { FakePropertiesRepository } from "../../repositories/fakes/FakesPropertiesRepository";
import { ListPropertiesUseCase } from "./listPropertiesUseCase";

let fakePropertiesRepository: FakePropertiesRepository;
let listPropertiesUseCase: ListPropertiesUseCase;

describe('List Properties', () => {
  beforeEach(() => {
    fakePropertiesRepository = new FakePropertiesRepository();
    listPropertiesUseCase = new ListPropertiesUseCase(fakePropertiesRepository);
  });

  it('should be able to list properties', async () => {
    const property = await fakePropertiesRepository.create({
      title: 'Fazenda Martins',
      description: 'Fazenda Martins da zona leste',
      value: 1200,
      area: 600,
      address: 'Rua Fazenda Martins',
      public_place: 'Rua Martins Fazenda',
      house_number: 9463,
      complement: 'Fazenda',
      district: 'Zona Leste',
      cep: 84313630,
      city: 'Fazenda City',
      uf: 'FM',
    });

    const properties = await listPropertiesUseCase.execute({ page: 1, limit: 8 });
    
    expect(properties).toEqual([[property], 1]);
  });
});