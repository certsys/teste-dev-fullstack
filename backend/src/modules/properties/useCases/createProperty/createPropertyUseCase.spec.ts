import { FakeCEPProvider } from "@shared/container/CEPProvider/fakes/FakeCEPProvider";
import { AppError } from "@shared/errors/AppError";
import { FakePropertiesRepository } from "../../repositories/fakes/FakesPropertiesRepository";
import { CreatePropertyUseCase } from "./createPropertyUseCase";

let fakePropertiesRepository: FakePropertiesRepository;
let fakeCEPProvider: FakeCEPProvider;
let createPropertyUseCase: CreatePropertyUseCase;

describe('Create Property', () => {
  beforeEach(() => {
    fakePropertiesRepository = new FakePropertiesRepository();
    fakeCEPProvider = new FakeCEPProvider();
    createPropertyUseCase = new CreatePropertyUseCase(
      fakePropertiesRepository, 
      fakeCEPProvider
    );
  });

  it('should be able to create new user', async () => {
    const property = await createPropertyUseCase.execute({
      title: 'Fazenda Martins',
      description: 'Fazenda Martins da zona leste',
      value: 1200,
      area: 600,
      address: 'Rua Fazenda Martins',
      house_number: 9463,
      cep: 84313630,
    });

    expect(property).toHaveProperty('id');
  });

  it('should not be able to create new user, because email already exists', async () => {
    await fakePropertiesRepository.create({
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

    await expect(createPropertyUseCase.execute({
      title: 'Fazenda Martins',
      description: 'Fazenda Martins da zona leste',
      value: 1200,
      area: 600,
      address: 'Rua Fazenda Martins',
      house_number: 9463,
      cep: 84313630
    })).rejects.toEqual(new AppError('Property already exist!'));
  });
});