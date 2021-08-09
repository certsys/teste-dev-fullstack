import { AppError } from "@shared/errors/AppError";
import { FakePropertiesRepository } from "../../repositories/fakes/FakesPropertiesRepository";
import { ShowPropertyByIdUseCase } from "./showPropertyByIdUseCase";

let fakePropertiesRepository: FakePropertiesRepository;
let showPropertyByIdUseCase: ShowPropertyByIdUseCase;

describe('Show Property By Id', () => {
  beforeEach(() => {
    fakePropertiesRepository = new FakePropertiesRepository();
    showPropertyByIdUseCase = new ShowPropertyByIdUseCase(fakePropertiesRepository);
  });

  it('should be able to show property by id', async () => {
    const propertyCreated = await fakePropertiesRepository.create({
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

    const property = await showPropertyByIdUseCase.execute(propertyCreated.id);

    expect(property).toEqual(propertyCreated);
  });
});